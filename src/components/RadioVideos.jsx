import "./Book.css";
import Article from "./Article";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import RadioVideo from "./RadioVideo";
import book8 from "../assets/book/book8.mp3";
import song from "../assets/mp3/song.mp3";
import ChieuHomAy from "../assets/mp3/ChieuHomAy.mp3";
import ConMuaNgangQua from "../assets/mp3/ConMuaNgangQua.mp3";
import LacTroi from "../assets/mp3/LacTroi.mp3";
import Thang4 from "../assets/mp3/Thang4LaLoiNoiDoiCuaEm.mp3";
import music1 from "../assets/mp3/music/jersey.mp3";
import music2 from "../assets/mp3/music/xinloiviloihua.mp3";
import music3 from "../assets/mp3/music/khong_thuoc_ve_nhau.mp3";
import music4 from "../assets/mp3/music/dom_dom.mp3";
import music5 from "../assets/mp3/music/9MM_goes_bang.mp3";
import music6 from "../assets/mp3/music/drive_forever.mp3";
import music7 from "../assets/mp3/music/dap_vo_cay_dan.mp3";
import music8 from "../assets/mp3/music/going_home.mp3";
import music9 from "../assets/mp3/music/thien_ly_oi.mp3";
import music10 from "../assets/mp3/music/thien_ly_oi.mp3";
import music11 from "../assets/mp3/music/thien_ly_oi.mp3";
import music12 from "../assets/mp3/music/3107.mp3";
import image1 from "../assets/images/i_RVideos/1.jpg";

const RadioVideos = () => {
    const navigate = useNavigate();
    const [activeAudioRef, setActiveAudioRef] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const recognitionRef = useRef(null);

    const articles = [
        {
            name: "Chill Beat",
            auther: "Chill Music",
            date: "16/07/2021",
            audioUrl: music1,
            image: image1
        },
        {
            name: "3107",
            auther: "DuongG x NÂU x W/N",
            date: "05/12/2023",
            audioUrl: music2,
            image: image1
        },
        {
            name: "Đom Đóm",
            auther: "J97",
            date: "18/02/2021",
            audioUrl: music3,
            image: image1
        },
        {
            name: "Thiên Lý Ơi",
            auther: "Jack",
            date: "25/01/2020",
            audioUrl: music4,
            image: image1,
        },
        {
            name: "Drive Forever",
            auther: "Nightshift TV",
            date: "07/04/2022",
            audioUrl: music5,
            image: image1
        },
        {
            name: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
            auther: "Ái Phương",
            date: "16/02/2016",
            audioUrl: music6,
            image: image1
        },
        {
            name: "Nhắm Mắt Thấy Mùa Hè",
            auther: "Nguyên Hà",
            date: "24/05/2019",
            audioUrl: music7,
            image: image1
        },
        {
            name: "Trở Về",
            auther: "Wxrdie",
            date: "12/11/2024",
            audioUrl: music8,
            image: image1
        },
        {
            name: "Nếu Lúc Đó",
            auther: "Tlinh",
            date: "02/05/2023",
            audioUrl: music9,
            image: image1
        },
        {
            name: "Không Thể Say",
            auther: "HIEUTHUHAI",
            date: "22/03/2024",
            audioUrl: music10,
            image: image1
        },
        {
            name: "Mình Anh Thôi",
            auther: "Negav",
            date: "05/12/2023",
            audioUrl: music11,
            image: image1
        },
        {
            name: "Home Sweet Home",
            auther: "G-DRAGON",
            date: "27/11/2024",
            audioUrl: music12,
            image: image1
        },
    ];

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Trình duyệt không hỗ trợ Speech Recognition.");
            return;
        }

        const createRecognition = () => {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.lang = "vi-VN";
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
                console.log("Voice Command:", command);

                if (command.includes("play") || command.includes("bắt đầu")) {
                    if (activeAudioRef?.current) {
                        activeAudioRef.current.play();
                    }
                } else if (command.includes("tạm dừng") || command.includes("dừng")) {
                    if (activeAudioRef?.current) {
                        activeAudioRef.current.pause();
                    }
                } else if (command.includes("tiếp")) {
                    handleNextSong();
                } else if (command.includes("bài trước")) {
                    handlePreviousSong();
                } else if (command.includes("trang chủ")) {
                    navigate("/home-page");
                }
            };

            recognition.start();
            recognitionRef.current = recognition;
        };

        createRecognition();

        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                if (recognitionRef.current) {
                    recognitionRef.current.stop();
                }
                createRecognition();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate, activeAudioRef]);

    const handleNextSong = () => {
        if (activeAudioRef?.current) {
            activeAudioRef.current.pause();
            setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
        }
    };

    const handlePreviousSong = () => {
        if (activeAudioRef?.current) {
            activeAudioRef.current.pause();
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? articles.length - 1 : prevIndex - 1
            );
        }
    };

    return (
        <div>
            <div className="flex flex-wrap justify-around space-4">
                {articles.map((article, index) => (
                    <RadioVideo
                        key={index}
                        video={article}
                        setActiveAudioRef={setActiveAudioRef}
                        isCurrentTrack={index === currentIndex}
                    />
                ))}
            </div>
        </div>
    );
};

export default RadioVideos;