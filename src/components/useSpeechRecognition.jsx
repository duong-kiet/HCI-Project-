import { useEffect } from "react";

const useSpeechRecognition = (commands, lang = "vi-VN") => {
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Trình duyệt không hỗ trợ Speech Recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = lang;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice Command:", command);

      Object.keys(commands).forEach((key) => {
        if (command.includes(key.toLowerCase())) {
          commands[key]();
        }
      });
    };

    recognition.start();

    return () => recognition.stop();
  }, [commands, lang]);
};

export default useSpeechRecognition;
