import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoginPage from "../assets/mp3/EnterTologin.mp3";
import Welcome from "../assets/mp3/Welcome.mp3";
import image1 from "../assets/images/firstroute/image1.jpg";
import image2 from "../assets/images/firstroute/image2.jpg";
import image3 from "../assets/images/firstroute/image3.jpg";
import image4 from "../assets/images/firstroute/image4.jpg";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime/runtime";

function Home() {
  const welcomeAudio = useRef(new Audio(Welcome));
  const loginAudio = useRef(new Audio(LoginPage));
  const [audioPlayed, setAudioPlayed] = useState(false);

  const navigate = useNavigate();

  // Phát âm thanh chào mừng chỉ một lần
  useEffect(() => {
    const playAudioOnce = () => {
      if (!audioPlayed) {
        const audio = welcomeAudio.current;
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0; // Đặt lại thời gian phát nếu âm thanh đang chạy
        }
        audio.play();
        setAudioPlayed(true);
      }
    };

    document.addEventListener("click", playAudioOnce);

    return () => {
      document.removeEventListener("click", playAudioOnce);
    };
  }, [audioPlayed]);

  // Nhận diện giọng nói và xử lý điều hướng
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech Recognition not supported by this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice Command:", command);
      if (command.includes("tôi muốn đăng nhập")) {
        navigate("/user-select");
      }
      if (command.includes("tôi muốn đăng ký")) {
        navigate("/signup");
      }
    };

    recognition.start();

    return () => recognition.stop(); // Dừng nhận diện giọng nói khi component bị hủy
  }, [navigate]);

  const handleLoginVoice = () => {
    loginAudio.current.play();
  };

  const images = [
    { src: image1, title: "Tin tức" },
    { src: image2, title: "Âm nhạc" },
    { src: image3, title: "Giáo dục" },
    { src: image4, title: "Kết nối cộng đồng" }
  ];

  return (
    <div>
      <div className="bg-white py-3">
        <div className="flex items-center gap-x-5 px-6">
          <img src={logo} alt="Logo" className="w-20 h-20 object-cover rounded-full" />
          <h1 className="text-6xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-yellow-700 to-yellow-700">
            TheEyes
          </h1>
        </div>
      </div>

      <div className="bg-gray-100 py-40 md:pt-20 md:pb-24">
        <div className="h-full mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h1 className="text-8xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-900">
              TheEyes
            </h1>
            <p className="mt-7 text-3xl text-black-600 max-w-3xl mx-auto">
              Giúp người khiếm thị và người suy giảm thị lực có thể nghe đọc báo, radio, học kiến thức mới, kết nối trò chuyện cộng đồng và chia sẻ trải nghiệm.
            </p>
            <Link
              to={"/user-select"}
              className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-900"
              // onFocus={handleLoginVoice}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span className="text-white text-3xl">Đăng nhập</span>
            </Link>

            <div className="mt-12 flex justify-center gap-6">
              {images.map((image, index) => (
                <div key={index} className="flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-white w-[250px]">
                  <img src={image.src} alt={`Image ${index + 1}`} className="rounded-lg object-cover" style={{ width: '250px', height: '250px' }} />
                  <h2 className="text-xl font-bold text-black-800 mt-4">{image.title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
