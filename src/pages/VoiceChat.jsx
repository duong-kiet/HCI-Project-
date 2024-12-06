import { MUINavBar } from "../components/MUINavBar";
import Button from "@mui/material/Button";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { NewsContextProvider } from "../NewsContext";
import Newspaper from "../components/Newspaper";
import Container from "@mui/material/Container";
import SpeechReg from "../components/SpeechReg";
import Call from "../assets/mp3/Call.mp3";
import EnterToJoin from "../assets/mp3/EnterToJoin.mp3";
import EnterToOut from "../assets/mp3/EnterToOut.mp3";
// import { JoinChat } from "../components/JoinChat";
// import JoinChat from "../components/JoinChat";
import { Mic, PhoneOff } from 'lucide-react';
import AgoraRTC from "agora-rtc-sdk-ng";
import WaveformVisualizer from "../components/WaveformVisualizer";


const APP_ID = "c8cbee22dffb4dca8e770a51bd2c6b60"; // Điền App ID của bạn
const CHANNEL = "123"; // Điền tên channel
const TOKEN = "007eJxTYDDVeByx8LKzWwBrtrLDZeZT3EevFJ+43Lqbe94Z+aXbVbcpMCRbJCelphoZpaSlJZmkJCdapJqbGySaGialGCWbJZkZhCYHpTcEMjJsM2RmZWSAQBCfmcHQyJiBAQANrh3O"

function VoiceChat() {
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

    const handleAudio = () => {
        const audio = new Audio(Call);
        audio.play();
    };
    const handleJoinAudio = () => {
        const audio = new Audio(EnterToJoin);
        audio.play();
    };
    const handleOutAudio = () => {
        const audio = new Audio(EnterToOut);
        audio.play();
    };

    useEffect(() => {
        handleAudio();
    }, []);

    const [joined, setJoined] = useState(false);

    return (
        <div className="Videocall" onClick={handleAudio}>
            <MUINavBar />
            <SpeechReg />
            {/*  mt-[-64px] */}
            <div className="bg-slate-900 flex flex-col items-center justify-center pt-[30px] pb-[200px]">
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
                                onClick={() => setJoined(true)}
                                onFocus={joinChannel}
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
                                {/* <JoinChat /> */}
                                <WaveformVisualizer />
                                <button
                                    className="group relative"
                                    onClick={() => setJoined(false)}
                                    onFocus={leaveChannel}
                                >
                                    <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div> <div className="relative bg-slate-800 p-4 rounded-full border border-red-400 hover:border-pink-400 transition">
                                        <PhoneOff className="w-8 h-8 text-red-400 group-hover:text-pink-400" />
                                    </div>
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-300">Leave</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-400">Users in Channel:
                            <span className="text-cyan-400 ml-2">
                                <ul>
                                    {/* {users.map((user) => (
                      <li key={user.uid}>User ID: {user.uid}</li>
                    ))} */}
                                </ul>
                            </span>
                            <p>{users.length}</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default VoiceChat;