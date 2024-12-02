import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";

function UserSelect() {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("id, full_name, face_image_url");
      if (error) {
        console.error("Error fetching users:", error);
        setErrorMessage("Failed to load user data.");
        return;
      }
      if (data.length > 0) {
        setAccounts(data);
        setSelected(data[0]); // Set the first user as the default selected
      }
    };

    fetchUsers();
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN"; // Set to Vietnamese
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Voice recognition started");
      speak("Tên bạn là gì");
    };

    recognition.onresult = (event) => {
      const name = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Recognized name:", name);
      const matchedUser = accounts.find(user => user.full_name.toLowerCase() === name.toLowerCase());
      if (matchedUser) {
        setSelected(matchedUser);
        recognition.stop(); // Stop recognition after a successful match
        speak(`Tên bạn là, ${matchedUser.full_name}`, () => {
          navigate("/login", { state: { account: matchedUser } });
        });
      } else {
        setErrorMessage("Không tìm thấy người dùng phù hợp.");
        speak("Tôi không tìm thấy tên của bạn", () => {
          speak("Tên bạn là gì");
        });
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setErrorMessage("Lỗi nhận diện giọng nói.");
    };

    setRecognition(recognition);
  }, [accounts, navigate]);

  // Start speech recognition when component mounts
  useEffect(() => {
    if (recognition) {
      recognition.start();
    }
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  const speak = (text, callback) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.onend = callback;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 w-full max-w-[720px] mx-auto">
      <h1 className="text-2xl font-semibold">Bạn là ai?</h1>

      <div className="w-full p-4 text-right">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-4">
              {accounts.map((user) => (
                <RadioGroup.Option key={user.id} value={user}>
                  {({ checked }) => (
                    <div
                      className={`flex items-center gap-4 p-3 rounded-lg border ${
                        checked ? "border-blue-500" : "border-gray-300"
                      }`}
                    >
                      <img
                        src={user.face_image_url}
                        alt={user.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                      />
                      <span className="font-medium">{user.full_name}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          {errorMessage && (
            <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSelect;