import React, { useEffect, useState } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "c8cbee22dffb4dca8e770a51bd2c6b60"; // Điền App ID của bạn
const CHANNEL = "123"; // Điền tên channel
const TOKEN = "007eJxTYOCKVln6XnXmjz1HdzkLxwrvFJ09qev5H2nnebVvTvxZ5PlLgSHZIjkpNdXIKCUtLckkJTnRItXc3CDR1DApxSjZLMnMIOWzXXpDICMD/7RaJkYGCATxmRkMjYwZGADM8SDD"; // Điền Token của bạn (hoặc null nếu không cần)

export const VoiceChat = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [localAudioTrack, setLocalAudioTrack] = useState(null); // Local audio track
  const [rtcClient, setRtcClient] = useState(null); // RTC client

  // Hàm để join voice channel
  const joinChannel = async () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setRtcClient(client);

    // Khi có user mới join và publish
    client.on("user-published", async (user, mediaType) => {
      if (mediaType === "audio") {
        await client.subscribe(user, mediaType);
        console.log("Subscribed to user audio", user.uid);

        // Lưu user vào danh sách
        setUsers((prevUsers) => [...prevUsers, user]);

        // Phát audio của user
        user.audioTrack?.play();
      }
    });

    // Khi user unpublish (ngừng phát audio)
    client.on("user-unpublished", (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      console.log("User unpublished", user.uid);
    });

    // Khi user rời khỏi channel
    client.on("user-left", (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      console.log("User left", user.uid);
    });

    // Join channel
    await client.join(APP_ID, CHANNEL, TOKEN, null);

    // Tạo local audio track
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    setLocalAudioTrack(microphoneTrack);

    // Publish local audio track
    await client.publish([microphoneTrack]);
    console.log("Published local audio");
  };

  // Hàm để leave voice channel
  const leaveChannel = async () => {
    if (localAudioTrack) {
      localAudioTrack.close();
    }
    await rtcClient?.leave();
    setUsers([]);
    console.log("Left the channel");
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      leaveChannel();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Voice Chat</h1>
      <div>
        <button onClick={joinChannel} style={{ margin: '10px', padding: '10px' }}>
          Join
        </button>
        <button onClick={leaveChannel} style={{ margin: '10px', padding: '10px' }}>
          Leave
        </button>
      </div>
      <h2>Users in Channel:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>User ID: {user.uid}</li>
        ))}
      </ul>
    </div>
  );
};
