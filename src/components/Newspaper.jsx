import "../pages/News.css";
import Article from "./Article";
import {useEffect, useRef, useState} from "react";
import {supabase} from "../supabase.js";
import NewsAudio from "../assets/mp3/News.mp3";
import {useNavigate} from "react-router-dom";
const Newspaper = () => {
  const [articles, setArticles] = useState([]);
  useEffect( () => {
    supabase.from('news').select().order('id', {ascending: false}).then(({data,})=> {
      let temp = []
      data.forEach((article) => {
        temp.push({
          title: article.title,
          description: article.description,
          date: new Date(article.date).toLocaleDateString("vi-VN"),
          audioUrl: "src/assets/mp3/news/" + article.id +".mp3",
          audioTitle: "",
          urlToImage: article.img
        })
      })
      setArticles(temp)
    })
  }, []);

  const playAudio = (audioSrc) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  }

  const playRandomRadio = () => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomRadio = articles[randomIndex]["audioUrl"];
    current_playing.current = randomRadio;
    playAudio(randomRadio);
  }
  function play(index) {
    if (current_playing.current === index) {
      if (audioRef.current.paused) audioRef.current.play()
      else audioRef.current.pause()
    }
    else {
      current_playing.current = index
      playAudio(articles[index]["audioUrl"])
    }
  }

  const current_playing = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (articles.length) {
      audioRef.current = new Audio(NewsAudio);
      // playAudio(audioRef.current)
      audioRef.current.play();
      // audioRef.current.onended = playRandomRadio;

      if (!("webkitSpeechRecognition" in window)) {
        console.error("Trình duyệt không hỗ trợ Speech Recognition.");
        return;
      }

      const createRecognition = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
          console.log("Voice Command:", command);

          if (command.includes("đổi tin")) {
            playRandomRadio();
          } else if (command.includes("trang chủ")) {
            navigate("/home-page");
          } else if (command.includes("tiếp tục")) {
            audioRef.current.play();
          }
          else if (command.includes("bắt đầu")) {
            playRandomRadio();
          } else if (command.includes("đọc sách") || command.includes("mở đọc sách") || command.includes("đi đến đọc sách")) {
            navigate("/books");
          } else if (command.includes("nghe nhạc") || command.includes("mở nghe nhạc") || command.includes("đi đến nghe nhạc")) {
            navigate("/music");
          } else if (command.includes("trò chuyện") || command.includes("mở trò chuyện") || command.includes("đi đến trò chuyện")) {
            navigate("/voice-chat");
          }
        };

        recognition.start();
        recognitionRef.current = recognition; // Lưu vào tham chiếu để quản lý sau này
      };

      createRecognition();

      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          audioRef.current.pause();
          // audioRef.current.currentTime = 0;
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
          createRecognition();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = ""; // Dừng phát
        }
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [articles]);
  const audioRef = useRef(new Audio())
  const recognitionRef = useRef(null)
  return (
    <div>
      <div className="all__news p-[40px]">
        {articles.map((article, index) => (
          <Article play={() => play(index)} key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Newspaper;
