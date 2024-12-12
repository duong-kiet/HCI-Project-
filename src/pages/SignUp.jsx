import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import audioAskName from "../assets/mp3/ask_name.mp3";
import audioTakePhoto from "../assets/mp3/take_photo.mp3";

function SignUp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState("");
  const [nameRecorded, setNameRecorded] = useState(false); // Trạng thái đã ghi tên
  const [isAskingName, setIsAskingName] = useState(true); // Kiểm tra xem đang hỏi tên hay không
  const [isReadyToCapture, setIsReadyToCapture] = useState(false); // Kiểm tra khi nào sẵn sàng để chụp ảnh
  const audioRef = useRef(null); // Ref để phát audio
  const navigate = useNavigate();

  // Hàm phát audio
  const playAudio = (audioSrc) => {
    if (audioRef.current) {
      // audioRef.current.pause(); // Dừng audio hiện tại (nếu có)
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  // Hàm bắt đầu nhận diện giọng nói
  const startSpeechRecognition = (onResultCallback) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = true; // Tiếp tục lắng nghe
    recognition.interimResults = false; // Chỉ trả kết quả cuối cùng

    recognition.onstart = () => console.log("Voice recognition started");
    recognition.onresult = onResultCallback;

    recognition.start();
    return () => recognition.stop();
  };

  // Speech Recognition để ghi nhận tên
  const handleNameRecognition = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.trim();
    console.log("Voice Command (Name):", command);

    if (!nameRecorded) {
      // Ghi nhận tên
      setUserName(command);
      setNameRecorded(true);
      setIsAskingName(false); // Đánh dấu đã ghi tên và ngừng hỏi tên
      playAudio(audioTakePhoto); // Phát audio yêu cầu chụp hình
    }
  };

  // Speech Recognition để ghi nhận lệnh "chụp"
  const handleCaptureRecognition = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.trim();
    console.log("Voice Command (Capture):", command);

    if (command.toLowerCase().includes("chụp")) {
      captureImage();
    }
  };

  // Hàm này được gọi sau khi âm thanh ask_name.mp3 phát xong
  const handleAudioEnd = () => {
    setIsAskingName(false); // Đánh dấu đã hỏi tên xong
    startSpeechRecognition(handleNameRecognition); // Bắt đầu nhận diện giọng nói để ghi nhận tên
  };

  useEffect(() => {
    // Phát âm thanh yêu cầu tên khi trang được tải
    if (isAskingName && !nameRecorded) {
      playAudio(audioAskName);
      // Khi âm thanh phát xong, bắt đầu nhận diện giọng nói
      audioRef.current.onended = handleAudioEnd;
    }
  }, [isAskingName, nameRecorded]);

  useEffect(() => {
    // Phát âm thanh yêu cầu chụp hình khi tên đã được ghi nhận
    if (nameRecorded && !isReadyToCapture) {
      setIsReadyToCapture(true); // Đánh dấu sẵn sàng để nhận lệnh chụp
      playAudio(audioTakePhoto);
      audioRef.current.onended = () => startSpeechRecognition(handleCaptureRecognition); // Bắt đầu nhận lệnh "chụp"
    }
  }, [nameRecorded]);

  // Lấy video từ camera
  useEffect(() => {
    async function getVideo() {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = videoStream;
        setStream(videoStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    getVideo();
  }, []);

  // Hàm chụp ảnh và upload
  const captureImage = async () => {
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Đặt kích thước canvas khớp với video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Chuyển canvas thành blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      const fileName = `face_${Date.now()}.png`;

      // Upload ảnh lên Supabase
      const { data, error } = await supabase.storage
        .from("faces")
        .upload(`public/${fileName}`, blob, {
          contentType: "image/png",
          cacheControl: "3600",
        });

      if (error) {
        throw error;
      }

      // Lấy URL công khai của ảnh
      const { data: { publicUrl } } = supabase.storage
        .from("faces")
        .getPublicUrl(`public/${fileName}`);

      // Lưu thông tin người dùng vào database
      const { error: dbError } = await supabase.from("users").insert({
        full_name: userName,
        face_image_url: publicUrl,
      });

      if (dbError) {
        throw dbError;
      }

      console.log("Image uploaded successfully");

      // Dừng video stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Điều hướng đến trang khác
      navigate("/user-select");
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <audio ref={audioRef}></audio> {/* Ref cho audio */}
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng ký bằng nhận diện hình ảnh
        </h2>
        <div className="mt-8 space-y-6">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg shadow-lg"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <p className="text-center text-sm text-gray-600">
            Nói "chụp hình" để chụp ảnh
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
