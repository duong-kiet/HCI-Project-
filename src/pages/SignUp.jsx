import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

function SignUp() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const navigate = useNavigate();

    // Initialize the voice recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "vi-VN"; // Set to Vietnamese
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = () => console.log("Voice recognition started");
        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.trim();
            console.log("Voice Command:", command);
            if (command.includes("Chụp hình")) {
                captureImage();
            }
        };

        recognition.start();
        return () => recognition.stop();
    }, []);

    // Open camera on component mount
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

    // Capture image
    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the image to a data URL
        const imageDataURL = canvas.toDataURL("image/png");
        console.log("Captured Image Data URL:", imageDataURL);

        // Save the image to local /public/temp-accounts/new_account
        const blob = dataURLToBlob(imageDataURL);
        saveAs(blob, "public/temp-accounts/new_account.png");

        // Create new account object
        const newAccount = {
            id: "new_account",
            fullName: "New User",
            picture: "/temp-accounts/new_account.png",
        };

        // Stop the video stream
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }

        // Redirect to login page
        navigate("/login", { state: { account: newAccount } });
    };

    // Convert data URL to Blob
    const dataURLToBlob = (dataURL) => {
        const byteString = atob(dataURL.split(",")[1]);
        const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="sign-up">
            <h2>Đăng ký bằng nhận diện hình ảnh</h2>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "640px" }} />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <p>Nói "chụp hình" để chụp ảnh</p>
        </div>
    );
}

export default SignUp;