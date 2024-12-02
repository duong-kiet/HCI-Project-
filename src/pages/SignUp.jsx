import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";

function SignUp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState("");
  const [nameRecorded, setNameRecorded] = useState(false); // State to track if name is recorded
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => console.log("Voice recognition started");
    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Voice Command:", command);
      
      if (!nameRecorded) {
        if (command.includes("Tên bạn là gì")) {
          speak("Tên bạn là gì");
        } else {
          setUserName(command); // Set the user's name
          setNameRecorded(true); // Update state to indicate name is recorded
          speak("Nói chụp hình để chụp"); // Ask to take a picture
        }
      } else {
        if (command.includes("Chụp")) {
          captureImage();
        }
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [nameRecorded]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak("Tên bạn là gì");
  }, []);

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

  const captureImage = async () => {
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const fileName = `face_${Date.now()}.png`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('faces')
        .upload(`public/${fileName}`, blob, {
          contentType: 'image/png',
          cacheControl: '3600'
        });

      if (error) {
        throw error;
      }

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('faces')
        .getPublicUrl(`public/${fileName}`);

      // Save user data to Supabase database
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          full_name: userName, // Use the recorded name
          face_image_url: publicUrl,
        });

      if (dbError) {
        throw dbError;
      }

      console.log("Image uploaded successfully");

      // Stop video stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Navigate to login
      navigate("/user-select");
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
            <canvas
              ref={canvasRef}
              className="hidden"
            />
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