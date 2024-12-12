import React, { useEffect, useRef } from 'react';
import "regenerator-runtime/runtime";

const RadioVoiceControls = ({ onPlay, onPause, onNext, onPrevious, onReplay }) => {
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Trình duyệt không hỗ trợ Speech Recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "vi-VN";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Voice Command:", command);

            // Handle different voice commands
            if (command.includes("phát") || command.includes("bắt đầu")) {
                onPlay();
            } else if (command.includes("dừng") || command.includes("tạm dừng")) {
                onPause();
            } else if (command.includes("bài tiếp") || command.includes("bài kế")) {
                onNext();
            } else if (command.includes("bài trước")) {
                onPrevious();
            } else if (command.includes("phát lại")) {
                onReplay();
            }
        };

        recognition.start();
        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [onPlay, onPause, onNext, onPrevious, onReplay]);

    return null; // This is a non-visual component
};

export default RadioVoiceControls;