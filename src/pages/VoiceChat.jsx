import { MUINavBar } from "../components/MUINavBar";
import Button from "@mui/material/Button";
import React, { createContext, useEffect, useState, useRef } from "react";
import SocialMedia from "../assets/mp3/SocialMedia.mp3";
import EnterToJoin from "../assets/mp3/EnterToJoin.mp3";
import EnterToOut from "../assets/mp3/EnterToOut.mp3";
import { Mic, PhoneOff } from 'lucide-react';
import AgoraRTC from "agora-rtc-sdk-ng";
import  WaveformVisualizer  from "../components/WaveformVisualizer";
import  { useNavigate } from "react-router-dom";
import { join } from "lodash";

const APP_ID = "c8cbee22dffb4dca8e770a51bd2c6b60"; // Điền App ID của bạn
const CHANNEL = "123"; // Điền tên channel
const TOKEN = "007eJxTYNCQ17xV7PmsI3DT5MBzsS9vRbNyqCS8/fk1sDGSZYrAhSQFhmSL5KTUVCOjlLS0JJOU5ESLVHNzg0RTw6QUo2SzJDMDC6eo9IZARoY1SfcZGKEQxGdmMDQyZmAAACqTHpY=";

function VoiceChat() {
  const [users, setUsers] = useState([]); 
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteAudioTracks, setRemoteAudioTracks] = useState([]); 
  const [rtcClient, setRtcClient] = useState(null);
  const [joined, setJoined] = useState(false);
  const audioRef = useRef(new Audio());
  const navigate = useNavigate();
  const recognitionRef = useRef(null); // Tham chiếu đến recognition

  // Hàm để join voice channel
  const joinChannel = async () => {

    if (joined) {
      console.log("Already joined the channel. Skipping join.");
      return;
    }

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setRtcClient(client);
 
    // Khi có user mới join và publish
    client.on("user-published", async (user, mediaType) => {
      if (mediaType === "audio") {
        await client.subscribe(user, mediaType);
        console.log("Subscribed to user audio", user.uid);
 
        // // Lưu user vào danh sách
        // setUsers((prevUsers) => [...prevUsers, user]);
        
        // // Lưu remote audio track
        // setRemoteAudioTracks(prev => [...prev, user.audioTrack]);
 
        // // Phát audio của user
        // user.audioTrack?.play();

        // setUsers((prevUsers) => [...prevUsers, user]);

        // Thêm user nếu chưa tồn tại
        setUsers((prevUsers) => {
          const userExists = prevUsers.some((u) => u.uid === user.uid);
          // return userExists ? prevUsers : [...prevUsers, user];
          if (!userExists) {
            return [...prevUsers, user]; // Thêm user mới nếu chưa tồn tại
          }
          return prevUsers;
        });

        // Chỉ thêm remote audio track
        const remoteAudioTrack = user.audioTrack;
        // if (remoteAudioTrack && remoteAudioTrack.getUserId() !== client.uid) {
        //   // setRemoteAudioTracks((prev) => [...prev, remoteAudioTrack]);
        //   setRemoteAudioTracks((prev) => {
        //     const trackExists = prev.some((track) => track.getUserId() === user.uid);
        //     return trackExists ? prev : [...prev, remoteAudioTrack];
        //   });
        //   remoteAudioTrack.play(); // Phát âm thanh từ remote user
        // }
        setRemoteAudioTracks((prevTracks) => {
          const trackExists = prevTracks.some(
            (track) => track.getUserId() === user.uid
          );
          if (!trackExists && remoteAudioTrack) {
            return [...prevTracks, remoteAudioTrack];
          }
          return prevTracks;
        });
  
        // Phát âm thanh
        remoteAudioTrack?.play();
      }
    });
 
    // Khi user unpublish (ngừng phát audio)
    client.on("user-published", async (user, mediaType) => {
      if (mediaType == "audio") {
        await client.subscribe(user, mediaType);
    
        setUsers((prevUsers) => {
          const userExists = prevUsers.some((u) => u.uid === user.uid);
          return userExists ? prevUsers : [...prevUsers, user];
        });
    
        const remoteAudioTrack = user.audioTrack;
        setRemoteAudioTracks((prevTracks) => {
          const trackExists = prevTracks.some(
            (track) => track.getUserId() === user.uid
          );
          return trackExists || !remoteAudioTrack
            ? prevTracks
            : [...prevTracks, remoteAudioTrack];
        });
    
        remoteAudioTrack?.play();
        console.log("User audio track playing", user.uid);
      }
    });
    
 
    // Khi user rời khỏi channel
    client.on("user-left", (user) => {
      console.log("User left", user.uid);
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      setRemoteAudioTracks(prev => prev.filter(track => track.getUserId() !== user.uid));
    });
 
    // Join channel
    await client.join(APP_ID, CHANNEL, TOKEN, null);
 
    // Tạo local audio track
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack({
      encoderConfig: "speech_standard",
      AEC: true, // Acoustic Echo Cancellation
      AGC: true, // Automatic Gain Control
      NS: true,  // Noise Suppression
    });
    setLocalAudioTrack(microphoneTrack);
 
    // Publish local audio track
    await client.publish([microphoneTrack]);
    setJoined(true);
    console.log("Published local audio");
  };
 
  const leaveChannel = async () => {
    if (localAudioTrack) {
      localAudioTrack.stop(); // Dừng microphone
      localAudioTrack.close(); // Đóng hoàn toàn
      setLocalAudioTrack(null);
    }
  
    remoteAudioTracks.forEach((track) => {
      track.stop(); // Dừng tất cả remote audio
      track.close(); // Đóng hoàn toàn
    });
  
    setRemoteAudioTracks([]);
    setUsers([]);
  
    if (rtcClient) {
      await rtcClient.leave();
      setRtcClient(null);
    }
  
    setJoined(false);
    console.log("Left the channel");
  };
  
  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      // Safely wrap async cleanup in an IIFE to handle promise
      (async () => {
        try {
          await leaveChannel();
        } catch (error) {
          console.error('Error during component unmount cleanup:', error);
        }
      })();
    };
  }, []);

  // Hàm phát audio
  const playAudio = (audioSrc) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  const createRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice Command:", command);

      if (command.includes("tôi muốn tham gia")) {
        if(joined == false) {
          joinChannel();
          setJoined(true);
        }
      } else if (command.includes("trang chủ")) {
        navigate("/home-page");
      }
    };
    if(joined == true) {
      recognition.stop();
    }
    recognition.start();
    recognitionRef.current = recognition; // Lưu vào tham chiếu để quản lý sau này
  };

  useEffect(() => {
    playAudio(SocialMedia);
    audioRef.current.onended = createRecognition(); 

    // Speech recognition setup
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Trình duyệt không hỗ trợ Speech Recognition.");
      return;
    }

    // // Lắng nghe phím Enter
    // const handleKeyDown = (event) => {
    //   if (event.key === "Enter") {
    //     // Dừng audio hiện tại
    //     audioRef.current.pause();
    //     audioRef.current.currentTime = 0;

    //     // Dừng phiên recognition hiện tại
    //     if (recognitionRef.current) {
    //       recognitionRef.current.stop();
    //     }
    //     // Tạo mới recognition
    //     setJoined(false);
    //     leaveChannel();
    //     createRecognition();
    //   }
    // };

    // window.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Dừng phát
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  // Lắng nghe phím Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Dừng audio hiện tại
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // Dừng phiên recognition hiện tại
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      // Tạo mới recognition
      setJoined(false);
      leaveChannel();
      createRecognition();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  
  return (
    <div className="Videocall">
      <MUINavBar />
      {/* <SpeechReg />   */}
      <div className="bg-slate-700 flex flex-col items-center justify-center pt-[30px] pb-[220px]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">WeTalk</h1>
          <p className="text-lg text-gray-300">Kết nối cộng đồng, bắt đầu trò chuyện ngay</p>
        </div>

        <div className="relative w-full max-w-3xl">
          <div className="flex items-center justify-center space-x-1 mb-8">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-b from-cyan-400 to-purple-500"
                style={{
                  height: `${Math.random() * 64 + 16}px`,
                  opacity: 0.8
                }}
              />
            ))}
          </div>

          {/* Control buttons */}
          <div className="flex justify-center space-x-8">
            {!joined && (
              <button 
                className="group relative"
                onClick={() => {
                  setJoined(true);
                  joinChannel();
                }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div>
                <div className="relative bg-slate-800 p-4 rounded-full border border-cyan-400 hover:border-blue-400 transition">
                  <Mic className="w-8 h-8 text-cyan-400 group-hover:text-blue-400" />
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-300">Join</span>
              </button>
            )}

            {joined && (
              <div className="flex flex-col items-center">
                <WaveformVisualizer 
                  localAudioTrack={localAudioTrack}
                  remoteAudioTracks={remoteAudioTracks}
                />
                <button
                  className="group relative"
                  onClick={() => {
                    setJoined(false);
                    leaveChannel();
                  }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div>
                  <div className="relative bg-slate-800 p-4 rounded-full border border-red-400 hover:border-pink-400 transition">
                    <PhoneOff className="w-8 h-8 text-red-400 group-hover:text-pink-400" onClick={leaveChannel} />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-300">Leave</span>
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400">Users in Channel: 
              <span className="text-cyan-400 ml-2">
                {users.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceChat;