import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import audioAskName from "../assets/mp3/ask_name.mp3";
import audioNotFound from "../assets/mp3/user_not_found.mp3";

function UserSelect() {
  const [accounts, setAccounts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Trạng thái dữ liệu đã tải
  const [userName, setUserName] = useState("");
  const [nameRecorded, setNameRecorded] = useState(false);
  const [isAskingName, setIsAskingName] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Hàm phát audio
  const playAudio = (audioSrc, onEndedCallback) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      if (onEndedCallback) {
        audioRef.current.onended = onEndedCallback;
      }
    }
  };

  // Bắt đầu nhận diện giọng nói
  const startSpeechRecognition = (onResultCallback) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => console.log("Voice recognition started");
    recognition.onresult = onResultCallback;
    recognition.onerror = (event) => console.error("Recognition Error:", event.error);

    recognition.start();

    return () => recognition.stop();
  };

  // Xử lý nhận diện tên
  const handleNameRecognition = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.trim();
    console.log("Voice Command (Name):", command);

    if (!nameRecorded) {
      const matchedUser = accounts.find(
        (user) => user.full_name.toLowerCase() === command.toLowerCase()
      );

      if (matchedUser) {
        setUserName(matchedUser.full_name);
        setNameRecorded(true);
        navigate("/login", { state: { account: matchedUser } });
      } else {
        setErrorMessage("Không tìm thấy người dùng phù hợp.");
        playAudio(audioNotFound, () => {
          navigate("/");
        });
      }
    }
  };

  // Khi âm thanh hỏi tên phát xong
  const handleAudioEnd = () => {
    setIsAskingName(false);
    startSpeechRecognition(handleNameRecognition);
  };

  // Lấy danh sách người dùng từ Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("id, full_name, face_image_url");
        if (error) {
          console.error("Error fetching users:", error);
          setErrorMessage("Failed to load user data.");
        } else {
          setAccounts(data);
          setIsDataLoaded(true); // Đánh dấu dữ liệu đã tải xong
        }
      } catch (err) {
        console.error("Error during fetching users:", err);
        setErrorMessage("Failed to load user data.");
      }
    };
    fetchUsers();
  }, []);

  // Phát âm thanh hỏi tên sau khi dữ liệu được tải
  useEffect(() => {
    if (isDataLoaded && isAskingName && !nameRecorded) {
      playAudio(audioAskName, handleAudioEnd); // Phát âm thanh hỏi tên, sau đó nhận diện giọng nói
    }
  }, [isDataLoaded, isAskingName, nameRecorded]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <audio ref={audioRef}></audio> {/* Ref cho audio */}
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Chọn người dùng
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
        )}
        {isDataLoaded ? (
          <div className="mt-8 space-y-6">
            {accounts.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-300"
              >
                <img
                  src={user.face_image_url}
                  alt={user.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
                <span className="font-medium">{user.full_name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-600">Đang tải dữ liệu...</p>
        )}
      </div>
    </div>
  );
}

export default UserSelect;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../supabase.js";
// import audioAskName from "../assets/mp3/ask_name.mp3";
// import audioNotFound from "../assets/mp3/user_not_found.mp3";

// function UserSelect() {
//   const [accounts, setAccounts] = useState([]);
//   const [isDataLoaded, setIsDataLoaded] = useState(false); // Trạng thái dữ liệu đã tải
//   const [userName, setUserName] = useState("");
//   const [nameRecorded, setNameRecorded] = useState(false);
//   const [isAskingName, setIsAskingName] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const audioRef = useRef(null);
//   const recognitionRef = useRef(null); // Dùng để giữ tham chiếu nhận diện giọng nói
//   const navigate = useNavigate();

//   // Hàm phát audio
//   const playAudio = (audioSrc, onEndedCallback) => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = audioSrc;
//       audioRef.current.play();
//       if (onEndedCallback) {
//         audioRef.current.onended = onEndedCallback;
//       }
//     }
//   };

//   // Bắt đầu nhận diện giọng nói
//   const startSpeechRecognition = (onResultCallback) => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = "vi-VN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => console.log("Voice recognition started");
//     recognition.onresult = onResultCallback;
//     recognition.onerror = (event) => {
//       console.error("Recognition Error:", event.error);
//       setErrorMessage("Lỗi nhận diện. Nhấn Enter để thử lại.");
//     };

//     recognition.start();
//     recognitionRef.current = recognition; // Lưu lại tham chiếu
//   };

//   // Xử lý nhận diện tên
//   const handleNameRecognition = (event) => {
//     const command = event.results[event.results.length - 1][0].transcript.trim();
//     console.log("Voice Command (Name):", command);

//     if (!nameRecorded) {
//       const matchedUser = accounts.find(
//         (user) => user.full_name.toLowerCase() === command.toLowerCase()
//       );

//       if (matchedUser) {
//         setUserName(matchedUser.full_name);
//         setNameRecorded(true);
//         navigate("/login", { state: { account: matchedUser } });
//       } else {
//         setErrorMessage("Không tìm thấy người dùng phù hợp. Nhấn Enter để thử lại.");
//         playAudio(audioNotFound, () => {
//           navigate("/");
//         });
//       }
//     }
//   };

//   // Khi âm thanh hỏi tên phát xong
//   const handleAudioEnd = () => {
//     setIsAskingName(false);
//     startSpeechRecognition(handleNameRecognition);
//   };

//   // Lấy danh sách người dùng từ Supabase
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data, error } = await supabase.from("users").select("id, full_name, face_image_url");
//         if (error) {
//           console.error("Error fetching users:", error);
//           setErrorMessage("Failed to load user data.");
//         } else {
//           setAccounts(data);
//           setIsDataLoaded(true); // Đánh dấu dữ liệu đã tải xong
//         }
//       } catch (err) {
//         console.error("Error during fetching users:", err);
//         setErrorMessage("Failed to load user data.");
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Phát âm thanh hỏi tên sau khi dữ liệu được tải
//   useEffect(() => {
//     if (isDataLoaded && isAskingName && !nameRecorded) {
//       playAudio(audioAskName, handleAudioEnd); // Phát âm thanh hỏi tên, sau đó nhận diện giọng nói
//     }
//   }, [isDataLoaded, isAskingName, nameRecorded]);

//   // Xử lý nhấn phím Enter để thử lại nhận diện
//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === "Enter" && !nameRecorded) {
//         setErrorMessage(null); // Xóa thông báo lỗi nếu có
//         startSpeechRecognition(handleNameRecognition); // Thử lại nhận diện giọng nói
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [nameRecorded]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <audio ref={audioRef}></audio> {/* Ref cho audio */}
//       <div className="max-w-md w-full space-y-8">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Chọn người dùng
//         </h2>
//         {errorMessage && (
//           <p className="text-red-500 text-center text-sm">{errorMessage}</p>
//         )}
//         {isDataLoaded ? (
//           <div className="mt-8 space-y-6">
//             {accounts.map((user) => (
//               <div
//                 key={user.id}
//                 className="flex items-center gap-4 p-3 rounded-lg border border-gray-300"
//               >
//                 <img
//                   src={user.face_image_url}
//                   alt={user.full_name}
//                   className="w-12 h-12 rounded-full object-cover"
//                   onError={(e) => (e.target.src = "/default-avatar.png")}
//                 />
//                 <span className="font-medium">{user.full_name}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-sm text-gray-600">Đang tải dữ liệu...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserSelect;
