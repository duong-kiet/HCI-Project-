import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MUINavBar } from "../components/MUINavBar";
import SpeechReg from "../components/SpeechReg";
import LoginSuccess from "../assets/mp3/LoginSuccess.mp3";
import EnterToLogout from "../assets/mp3/EnterToLogout.mp3";
import ReSayHomepage from "../assets/mp3/ReSayHomepage.mp3";
import { Mic, MicOff } from "lucide-react"; // Sử dụng icons từ lucide-react

function Protected() {
  const [account, setAccount] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleAudio = (audioFile) => { 
    const audio = new Audio(audioFile);
    audio.play();
  }

  useEffect(() => {
    handleAudio(LoginSuccess);

    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech Recognition not supported by this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "vi-VN"; // Adjust language as needed
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice Command:", command);
      if (command.includes("trang chủ")) {
        navigate("/home-page");
      }
      if (command.includes("đăng xuất")) {
        navigate("/logout");
      }
    };

    recognition.start();

    // Cleanup function to stop recognition on unmount
    return () => recognition.stop();
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
    }

    const { account } = JSON.parse(localStorage.getItem("faceAuth"));
    setAccount(account);
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  if (!account) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <MUINavBar />
      {/* <SpeechReg 
        onCommand={handleVoiceCommand}
        isListening={isListening}
        setIsListening={setIsListening}
      /> */}
      
      {/* Nút micro cố định */}
      <div 
        onClick={toggleListening} 
        className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-600 transition-colors"
      >
        {isListening ? (
          <Mic className="w-6 h-6 animate-pulse" />
        ) : (
          <MicOff className="w-6 h-6" />
        )}
      </div>

      <div 
        className="bg-white pt-40 md:pt-60"
        onClick={() => handleAudio(ReSayHomepage)}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
            Bạn đã đăng nhập thành công!
          </h2>

          <div className="text-center mb-24">
            <img
              className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
              src={
                account?.type === "CUSTOM"
                  ? account.picture
                  : `/temp-accounts/${account.picture}`
              }
              alt={account.fullName}
            />
            <h1
              className="block text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-black"
              style={{
                lineHeight: "1.5",
              }}
            >
              {account?.fullName}
            </h1>

            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => {
                  handleAudio(ReSayHomepage);
                  navigate("/home-page");
                }}
                className="text-white bg-blue-600 px-4 py-2 rounded-full"
              >
                Trang Chủ
              </button>
              <button 
                onClick={() => {
                  handleAudio(EnterToLogout);
                  localStorage.removeItem("faceAuth");
                  navigate("/login");
                }}
                className="text-white bg-red-600 px-4 py-2 rounded-full"
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protected;