import "./Book.css";
import Article from "./Article";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import SportsVideo from "./SportsVideo";
import Sport from '../assets/mp3/Sport.mp3';

import book1 from '../assets/book/bong_bong_len_troi.mp3';
import book2 from '../assets/book/chuc_mot_ngay_tot_lanh.mp3';
import book3 from '../assets/book/co_gai_den_tu_hom_qua.mp3';
import book4 from '../assets/book/co_tich_cho_nguoi_lon.mp3';
import book5 from '../assets/book/con_chut_gi_de_nho.mp3';
import book6 from '../assets/book/ha_do.mp3';
import book7 from '../assets/book/nhung_co_em_gai.mp3';
import Sports from "../pages/Sports";

//   // const [articles, setArticles] = useState([]);

//   // useEffect(() => {
//   //   const getArticles = async () => {
//   //   const articlesCol = collection(db, 'books');
//   //   const articleSnapshot = await getDocs(articlesCol);
//   //   const articles = articleSnapshot.docs.map(doc => doc.data());
//   //   setArticles(articles);
//   // };
//   //   getArticles();
//   // }, []);


  // const SportsVideos = () => {
  //   const articles = [
  //     {
  //       title: "Bong bóng lên trời",
  //       description: "“Vì hoàn cảnh, Thường phải giúp mẹ bằng nghề bán kẹo kéo ngoài giờ học và làm quen với cuộc sống trên đường phố. Ở đó cậu đánh bạn với những người nghèo và hiểu thêm nhiều điều không có trong sách và nhà trường. Cô bé bán bong bóng Tài Khôn hồn nhiên và nhiều ước mơ cũng thường giúp đỡ Thường thoát khỏi mặc cảm nhà nghèo và sống tự tin.",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book1,
  //       audioImage: "https://img.websosanh.vn/v2/users/root_product/images/bong-bong-len-troi-nguyen-nhat/EgQIsa-y91cl.jpg"
  //     },
  //     {
  //       title: "Chúc một ngày tốt lành",
  //       description: "Gô un un là Chào buổi sáng; Un gô gô là Chúc ngủ ngon, và nữa, Chiếp un un; Ăng gô gô; Chiếp chiếp gô. Nhân vật chính là hai con heo con, Lọ Nồi thông minh và Đeo Nơ xinh đẹp, cùng bạn chó Mõm Ngắn con chị Vện, mẹ Nái Sề, anh Đuôi Xoăn, Cánh Cụt và bọn gà chíp nhà chị Mái Hoa,… đã làm nên một câu chuyện vô cùng thú vị. Và thế giới trở nên thay đổi!",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book2,
  //       audioImage: "https://img.websosanh.vn/v2/users/root_product/images/chuc-mot-ngay-tot-lanh/ng2MUHfF2w9C.jpg?width=300"
  //     },
  //     {
  //       title: "Cô gái đến từ hôm qua",
  //       description: "Sách nói Cô gái đến từ hôm qua là một trong những sách nói của tác giả Nguyễn Nhật Ánh được độc giả vô cùng yêu thích trên ứng dụng sách nói Voiz FM. Sách nói Cô gái đến từ hôm qua của nhà văn Nguyễn Nhật Ánh với nội dung giản dị, dễ hiểu cùng với những tình tiết vui vẻ, dí dỏm cùng với một cái kết có hậu sẽ đem lại cảm giác vui vẻ và gần gũi cho các độc giả.",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book3,
  //       audioImage: "https://img.websosanh.vn/v2/users/root_product/images/co-gai-den-tu-hom-qua/Vo9Ehz8Wg24X.jpg?width=300",
  //     },
  //     {
  //       title: "Cổ tích cho người lớn",
  //       description: "Sách nói Chuyện Cổ Tích Dành Cho Người Lớn trên ứng dụng sách nói Voiz FM của Nguyễn Nhật Ánh là tác phẩm luôn được độc giả yêu thích. Sách nói Chuyện cổ tích dành cho người lớn là tập truyện ngắn của nhà văn Nguyễn Nhật Ánh. Tạm quên những lần hóa thân vào các nhân vật tuổi thơ, tác phẩm này dùng giọng văn của “người lớn” kể chuyện",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book4,
  //       audioImage: "https://www.nxbtre.com.vn/Images/Book/nxbtre_full_26402022_104049.jpg"
  //     },
  //     {
  //       title: "Còn chút gì để nhớ",
  //       description: "Đó là những kỷ niệm thời đi học của Chương, lúc mới bước chân vào Sài Gòn và làm quen với cuộc sống đô thị. Là những mối quan hệ bạn bè tưởng chừng hời hợt thoảng qua nhưng gắn bó suốt cuộc đời. Cuộc sống đầy biến động đã xô dạt mỗi người mỗi nơi, nhưng trải qua hàng mấy chục năm, những kỷ niệm ấy vẫn luôn níu kéo Chương về với một thời để nhớ.",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book5,
  //       audioImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPYNzMv48S8FJeJvvbC8e0tVdTf7X8CPobAA&s"
  //     },
  //     {
  //       title: "Hạ đỏ",
  //       description: "Mùa hè là khoảng thời gian mà học trò không còn lo lắng chuyện học hành và cũng là mùa để họ vui chơi giải trí. Mùa hè này, anh chàng Chương còm sẽ về quê ngoại để đổi gió và nghỉ ngơi sau chín tháng dài học hành căng thẳng với đầy nỗi âu lo",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book6,
  //       audioImage: "https://www.nxbtre.com.vn/Images/Book/nxbtre_full_11332023_113311.jpg"
  //     },
  //     {
  //       title: "Những cô em gái",
  //       description: "Khoa từ quê ra thành phố học, tấp tểnh làm thơ được đăng báo và bắt đầu nổi tiếng trong giới học sinh. Nhờ thế, Khoa được các bạn trai trong lớp hâm mộ, nhờ làm thơ tặng em gái mình, thực tế là dùng thơ ấy tặng bạn gái hoặc người yêu",
  //       author: "Nguyễn Nhật Ánh",
  //       audioUrl: book7,
  //       audioImage: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974177968.jpg"
  //     },
  //   ];

//     const [currentRadio, setCurrentRadio] = useState(null);
//     const audioRef = useRef(new Audio()); // Đối tượng audio
//     const navigate = useNavigate();

//     // Hàm phát âm thanh
//   const playAudio = (audioSrc) => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = audioSrc;
//       audioRef.current.play();
//     }
//   };

//   // Chọn ngẫu nhiên bài radio
//   const playRandomRadio = () => {
//     const randomIndex = Math.floor(Math.random() * articles.length);
//     const randomRadio = articles[randomIndex]["audioUrl"];
//     setCurrentRadio(randomRadio);
//     playAudio(randomRadio);
//   };
  
//   useEffect(() => {
//     // Phát tệp âm thanh "Đây là trang radio" khi vào trang
//     playAudio(Sport);
//     audioRef.current.onended = playRandomRadio; // Sau khi phát intro, phát bài ngẫu nhiên

//     // Speech recognition setup
//     if (!("webkitSpeechRecognition" in window)) {
//       console.error("Trình duyệt không hỗ trợ Speech Recognition.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
//     recognition.interimResults = false;

//     recognition.onresult = (event) => {
//       const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
//       console.log("Voice Command:", command);

//       if (command.includes("đổi bài")) {
//         playRandomRadio();
//       } else if (command.includes("trang chủ")) {
//         navigate("/home-page");
//       }
//     };

//     recognition.start();

//     // Cleanup function
//     return () => {
//       recognition.stop();
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = ""; // Dừng phát
//       }
//     };
//   }, [navigate]);


//     return (
//       <div>
//         <div className="flex flex-wrap justify-around space-4">
//           {articles.map((article, index) => (
//             <SportsVideo key={index} video={article} />
//           ))}
//         </div>
//       </div>
//     );
// };

// export default SportsVideos;

// Version 2 

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";


// const SportsVideos = () => {
//   const articles = [
//     { audioUrl: book1 },
//     { audioUrl: book2 },
//     { audioUrl: book3 },
//   ];
//   const [currentRadio, setCurrentRadio] = useState(null);
//   const audioRef = useRef(new Audio());
//   const audioContextRef = useRef(null); // Lưu trữ AudioContext duy nhất
//   const audioSourceRef = useRef(null); // Lưu trữ MediaElementSourceNode duy nhất
//   const navigate = useNavigate();

//   // Hàm phát âm thanh
//   const playAudio = (audioSrc) => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = audioSrc;
//       audioRef.current.play();
//     }
//   };

//   // Chọn ngẫu nhiên bài radio
//   const playRandomRadio = () => {
//     const randomIndex = Math.floor(Math.random() * articles.length);
//     const randomRadio = articles[randomIndex]["audioUrl"];
//     setCurrentRadio(randomRadio);
//     playAudio(randomRadio);
//   };

//   useEffect(() => {
//     // Khởi tạo AudioContext và MediaElementSourceNode
//     if (!audioContextRef.current) {
//       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//       audioSourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
//       audioSourceRef.current.connect(audioContextRef.current.destination); // Phát âm thanh qua loa
//     }

//     // Speech recognition setup
//     if (!("webkitSpeechRecognition" in window)) {
//       console.error("Trình duyệt không hỗ trợ Speech Recognition.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = "vi-VN"; // Ngôn ngữ tiếng Việt
//     recognition.interimResults = false;

//     recognition.onresult = (event) => {
//       const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
//       console.log("Voice Command:", command);

//       if (command.includes("đổi bài")) {
//         playRandomRadio();
//       } else if (command.includes("trang chủ")) {
//         navigate("/home-page");
//       }
//     };

//     recognition.onerror = (error) => {
//       console.error("Speech Recognition Error:", error);
//     };

//     // Phát âm thanh intro và khởi động nhận diện giọng nói
//     playAudio(Sport);
//     audioRef.current.onended = () => {
//       // Sau khi phát intro, bắt đầu nhận diện giọng nói
//       recognition.start();
//     };

//     // Cleanup khi component bị hủy
//     return () => {
//       recognition.stop();
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = ""; // Dừng phát
//       }
//       if (audioContextRef.current) {
//         audioContextRef.current.close(); // Đóng AudioContext
//       }
//     };
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Radio Sports</h1>
//       <button onClick={playRandomRadio}>Phát bài ngẫu nhiên</button>
//     </div>
//   );
// };

// export default SportsVideos;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sport from "../assets/mp3/Sport.mp3";
// import SportsVideo from "./SportsVideo";

const SportsVideos = () => {
  const articles = [
    {
      title: "Bong bóng lên trời",
      description: "“Vì hoàn cảnh, Thường phải giúp mẹ bằng nghề bán kẹo kéo ngoài giờ học và làm quen với cuộc sống trên đường phố. Ở đó cậu đánh bạn với những người nghèo và hiểu thêm nhiều điều không có trong sách và nhà trường. Cô bé bán bong bóng Tài Khôn hồn nhiên và nhiều ước mơ cũng thường giúp đỡ Thường thoát khỏi mặc cảm nhà nghèo và sống tự tin.",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book1,
      audioImage: "https://img.websosanh.vn/v2/users/root_product/images/bong-bong-len-troi-nguyen-nhat/EgQIsa-y91cl.jpg"
    },
    {
      title: "Chúc một ngày tốt lành",
      description: "Gô un un là Chào buổi sáng; Un gô gô là Chúc ngủ ngon, và nữa, Chiếp un un; Ăng gô gô; Chiếp chiếp gô. Nhân vật chính là hai con heo con, Lọ Nồi thông minh và Đeo Nơ xinh đẹp, cùng bạn chó Mõm Ngắn con chị Vện, mẹ Nái Sề, anh Đuôi Xoăn, Cánh Cụt và bọn gà chíp nhà chị Mái Hoa,… đã làm nên một câu chuyện vô cùng thú vị. Và thế giới trở nên thay đổi!",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book2,
      audioImage: "https://img.websosanh.vn/v2/users/root_product/images/chuc-mot-ngay-tot-lanh/ng2MUHfF2w9C.jpg?width=300"
    },
    {
      title: "Cô gái đến từ hôm qua",
      description: "Sách nói Cô gái đến từ hôm qua là một trong những sách nói của tác giả Nguyễn Nhật Ánh được độc giả vô cùng yêu thích trên ứng dụng sách nói Voiz FM. Sách nói Cô gái đến từ hôm qua của nhà văn Nguyễn Nhật Ánh với nội dung giản dị, dễ hiểu cùng với những tình tiết vui vẻ, dí dỏm cùng với một cái kết có hậu sẽ đem lại cảm giác vui vẻ và gần gũi cho các độc giả.",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book3,
      audioImage: "https://img.websosanh.vn/v2/users/root_product/images/co-gai-den-tu-hom-qua/Vo9Ehz8Wg24X.jpg?width=300",
    },
    {
      title: "Cổ tích cho người lớn",
      description: "Sách nói Chuyện Cổ Tích Dành Cho Người Lớn trên ứng dụng sách nói Voiz FM của Nguyễn Nhật Ánh là tác phẩm luôn được độc giả yêu thích. Sách nói Chuyện cổ tích dành cho người lớn là tập truyện ngắn của nhà văn Nguyễn Nhật Ánh. Tạm quên những lần hóa thân vào các nhân vật tuổi thơ, tác phẩm này dùng giọng văn của “người lớn” kể chuyện",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book4,
      audioImage: "https://www.nxbtre.com.vn/Images/Book/nxbtre_full_26402022_104049.jpg"
    },
    {
      title: "Còn chút gì để nhớ",
      description: "Đó là những kỷ niệm thời đi học của Chương, lúc mới bước chân vào Sài Gòn và làm quen với cuộc sống đô thị. Là những mối quan hệ bạn bè tưởng chừng hời hợt thoảng qua nhưng gắn bó suốt cuộc đời. Cuộc sống đầy biến động đã xô dạt mỗi người mỗi nơi, nhưng trải qua hàng mấy chục năm, những kỷ niệm ấy vẫn luôn níu kéo Chương về với một thời để nhớ.",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book5,
      audioImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPYNzMv48S8FJeJvvbC8e0tVdTf7X8CPobAA&s"
    },
    {
      title: "Hạ đỏ",
      description: "Mùa hè là khoảng thời gian mà học trò không còn lo lắng chuyện học hành và cũng là mùa để họ vui chơi giải trí. Mùa hè này, anh chàng Chương còm sẽ về quê ngoại để đổi gió và nghỉ ngơi sau chín tháng dài học hành căng thẳng với đầy nỗi âu lo",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book6,
      audioImage: "https://www.nxbtre.com.vn/Images/Book/nxbtre_full_11332023_113311.jpg"
    },
    {
      title: "Những cô em gái",
      description: "Khoa từ quê ra thành phố học, tấp tểnh làm thơ được đăng báo và bắt đầu nổi tiếng trong giới học sinh. Nhờ thế, Khoa được các bạn trai trong lớp hâm mộ, nhờ làm thơ tặng em gái mình, thực tế là dùng thơ ấy tặng bạn gái hoặc người yêu",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book7,
      audioImage: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974177968.jpg"
    },
  ];

  const [currentRadio, setCurrentRadio] = useState(null);
  const audioRef = useRef(new Audio());
  const navigate = useNavigate();
  const recognitionRef = useRef(null); // Tham chiếu đến recognition

  // Hàm phát audio
  const playAudio = (audioSrc) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  // Chọn ngẫu nhiên bài radio
  const playRandomRadio = () => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomRadio = articles[randomIndex]["audioUrl"];
    setCurrentRadio(randomRadio);
    playAudio(randomRadio);
  };

  useEffect(() => {
    // Phát tệp âm thanh "Đây là trang radio" khi vào trang
    playAudio(Sport);
    audioRef.current.onended = playRandomRadio; // Sau khi phát intro, phát bài ngẫu nhiên

    // Speech recognition setup
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

        if (command.includes("đổi bài")) {
          playRandomRadio();
        } else if (command.includes("trang chủ")) {
          navigate("/home-page");
        } else if (command.includes("tiếp tục")) {
          audioRef.current.play();
        }
      };

      recognition.start();
      recognitionRef.current = recognition; // Lưu vào tham chiếu để quản lý sau này
    };

    createRecognition();

    // Lắng nghe phím Enter
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // Dừng audio hiện tại
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Dừng phiên recognition hiện tại
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }

        // Tạo mới recognition
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
  }, [navigate]);

  return (
    <div>
      <div className="flex flex-wrap justify-around space-4">
        {articles.map((article, index) => (
          <SportsVideo key={index} video={article} />
        ))}
      </div>
    </div>
  );
};

export default SportsVideos;
