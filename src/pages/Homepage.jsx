import { MUINavBar } from "../components/MUINavBar";
import "../App.css";
import { useEffect, useState } from "react";
import image2 from "../assets/images/homepage/asi.jpg";
import image1 from "../assets/images/homepage/connect.jpg";
import image4 from "../assets/images/homepage/music.jpg";
import image3 from "../assets/images/homepage/news.jpg";
import image5 from "../assets/images/homepage/physic.jpg";
import image6 from "../assets/images/homepage/social.jpg";

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import HomePage from "../assets/mp3/HomePage.mp3";
import { useNavigate } from "react-router-dom";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

const cardData = [
  {
    title: "Tương tác tiện lợi",
    description: "Website được thiết kế với giao diện thân thiện, dễ sử dụng, nhiều thao tác tương tác được tích hợp sẵn giúp tối ưu hóa trải nghiệm của người dùng suy giảm thị lực",
    image: image1,
    route: ""
  },
  {
    title: "VSpeak - Trợ lý ảo",
    description: "Trợ lý ảo VSpeak giúp người dùng có thể tương tác với website bằng giọng nói và nhận được phản hồi ngay lập tức",
    image: image2,
    route: ""
  },
  {
    title: "Tin Tức",
    description: "Audio tin tức giúp người dùng được nghe thông tin thời sự một cách dễ dàng và cập nhật mới nhất",
    image: image3,
    route: "/news"
  },
  {
    title: "Âm nhạc",
    description: "Audio âm nhạc được chọn lọc đa dạng thể loại giúp người dùng có thể thư giãn và giải trí",
    image: image4,
    route: ""
  },
  {
    title: "Thể dục",
    description: "Radio và video chuỗi bài tập thể dục, thể thao dành cho người khiếm thị",
    image: image5,
    route: "/sports"
  },
  {
    title: "Mạng xã hội - VConnect",
    description: "Kết nối cộng đồng người khiếm thị, chia sẻ và bắt chuyện cùng nhau",
    image: image6,
    route: ""
  }
];

function Homepage() {
  const navigate = useNavigate();
  const [isAudioPlayed, setIsAudioPlayed] = useState(false);

  useEffect(() => {
    // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    //   alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!");
    //   return;
    // }
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Trình duyệt không hỗ trợ Speech Recognition.");
      return;
    }

    // Phát âm thanh khi truy cập
    if (!isAudioPlayed) {
      const audio = new Audio(HomePage);
      audio.play().then(() => setIsAudioPlayed(true));
    }

    // Bắt đầu lắng nghe giọng nói
    // SpeechRecognition.startListening({ continuous: true, language: "vi-VN", interimResults: false });
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "vi-VN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice Command:", command);

      if (command.includes("tin tức") || command.includes("đi đến tin tức") || command.includes("mở tin tức")) {
        navigate("/news");
      } else if (command.includes("đọc sách") || command.includes("mở đọc sách") || command.includes("đi đến đọc sách")) {
        navigate("/books");
      } else if (command.includes("nghe nhạc") || command.includes("mở nghe nhạc") || command.includes("đi đến nghe nhạc")) {
        navigate("/music");
      } else if (command.includes("trò chuyện") || command.includes("mở trò chuyện") || command.includes("đi đến trò chuyện")) {
        navigate("/voice-chat");
      } else if (command.includes("trang chủ")) {
        navigate("/home-page");
      }
    };

    recognition.start();
    return () => {
      // SpeechRecognition.stopListening(); // Dừng lắng nghe khi rời khỏi trang
      recognition.stop(); 
    };
  }, [navigate]);

  return (
    <div className="bg-gray-100">
      <MUINavBar />
      <Container className="mt-16">
        <Grid container spacing={3} className="py-5">
          {cardData.map((card, index) => (
            <Grid item xs={6} key={index} className="flex justify-center">
              <div className="p-2 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl w-full max-w-lg">
                <Card
                  onClick={() => card.route && navigate(card.route)}
                  sx={{
                    width: '100%',
                    height: '100%', // Đảm bảo card có chiều cao đồng nhất
                    cursor: card.route ? 'pointer' : 'default',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      backgroundColor: "#ac7412",
                      color: 'white',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <div style={{ position: 'relative', paddingTop: '56.25%' /* Tỷ lệ 16:9 */ }}>
                    <CardMedia
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.75rem 0.75rem 0 0',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        objectFit: 'cover'
                      }}
                      image={card.image}
                      title={card.description}
                      component="img"
                    />
                  </div>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="font-bold"
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        transition: 'color 0.3s ease',
                        '.MuiCard-root:hover &': {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Homepage;