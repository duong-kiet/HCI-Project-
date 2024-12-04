import "./Book.css";
import Article from "./Article";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import RadioVideo from "./RadioVideo";
// import book8 from "../assets/book/book8.mp3";
// import song from "../assets/mp3/song.mp3";
// import ChieuHomAy from "../assets/mp3/ChieuHomAy.mp3";
// import ConMuaNgangQua from "../assets/mp3/ConMuaNgangQua.mp3";
// import LacTroi from "../assets/mp3/LacTroi.mp3";
// import Thang4 from "../assets/mp3/Thang4LaLoiNoiDoiCuaEm.mp3";
// import music1 from "../assets/mp3/music/jersey.mp3";
// import music2 from "../assets/mp3/music/xinloiviloihua.mp3";
// import music3 from "../assets/mp3/music/khong_thuoc_ve_nhau.mp3";
// import music4 from "../assets/mp3/music/dom_dom.mp3";
// import music5 from "../assets/mp3/music/9MM_goes_bang.mp3";
// import music6 from "../assets/mp3/music/drive_forever.mp3";
// import music7 from "../assets/mp3/music/dap_vo_cay_dan.mp3";
// import music8 from "../assets/mp3/music/going_home.mp3";
// import music9 from "../assets/mp3/music/thien_ly_oi.mp3";
// import music10 from "../assets/mp3/music/thien_ly_oi.mp3";
// import music11 from "../assets/mp3/music/thien_ly_oi.mp3";
// import music12 from "../assets/mp3/music/3107.mp3";


const RadioVideos = () => {
    const articles = [
        {
            name: " Tháng 4 Là Lời Nói Dối Của Em",
            auther: "Hà Anh Tuấn",
            date: "05/12/2023",
            // audioUrl: music1,
        },
        {
            name: "Chiều Hôm Ấy",
            auther: "JayKii",
            date: "05/12/2023",
            // audioUrl: music2,
        },
        {
            name: "Cơn Mưa Ngang Qua",
            auther: " Sơn Tùng M-TP",
            date: "05/12/2023",
            // audioUrl: music3,
        },
        {
            name: " Lạc Trôi ",
            auther: " Sơn Tùng M-TP",
            date: "05/12/2023",
            // audioUrl: music4,
        },
    ];

    return (
        <div>
            <div className="flex flex-wrap justify-around space-4">
                {articles.map((article, index) => (
                    <RadioVideo key={index} video={article} />
                ))}
            </div>
        </div>
    );
};

export default RadioVideos;