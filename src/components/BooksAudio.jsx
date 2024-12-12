import "./Book.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Book from '../assets/mp3/Book.mp3';
import BookAudio from './BookAudio'
import {supabase} from "../supabase.js";
import book1 from '../assets/book/1.mp3';
import book2 from '../assets/book/2.mp3';
import book3 from '../assets/book/3.mp3';
import book4 from '../assets/book/4.mp3';
import book5 from '../assets/book/5.mp3';
import book6 from '../assets/book/6.mp3';
import book7 from '../assets/book/7.mp3';
import book8 from '../assets/book/8.mp3';
import book9 from '../assets/book/9.mp3';
import book10 from '../assets/book/10.mp3';

const BooksAudio = () => {
  const books = [
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
    {
      title: "Hoa hồng xứ khác",
      description: "Sách nói Hoa hồng xứ khác lại là một tác phẩm về tuổi học trò của Nguyễn Nhật Ánh nhưng gần như là thể loại khác. Không buồn sướt mướt và có pha thêm khá nhiều hài hước trong này. Tình yêu tuổi học trò được diễn đạt khá là đặc sắc bằng giọng văn hài hước của ông.",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book8,
      audioImage: "https://www.nxbtre.com.vn/Images/Book/nxbtre_full_29332022_033347.jpg"
    },
    {
      title: "Ngôi trường mọi khi",
      description: "Những câu chuyện về nhóm bạn học sinh năm đầu cấp 3 với bao kỷ niệm vui buồn hờn giận, bao nhiêu trò tinh nghịch của tuổi mới lớn. Với những Hạt tiêu, Tóc ngắn, Hột mít, Bảnh trai, Răng chuột, Mặt mụn… đã tạo nên không khí của một lớp học thật dễ thương với bao nhiêu tình cảm yêu thương, cảm động và gần gũi",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book9,
      audioImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHDJryPlJ-9NCGwYk6E_7buPFvjGfkYODsw&s"
    },
    {
      title: "Mắt biếc",
      description: "Sách nói Mắt biếc là sách nói được độc giả “truy tìm” trên Voiz FM thời gian qua. Sau hơn 30 năm ra đời, Mắt biếc chính thức chiếm sóng màn ảnh và cả thị trường sách Việt. Mắt biếc nói về tình yêu tuổi thanh thiếu niên của những nhân vật được Nguyễn Nhật Ánh xây dựng trong truyện.",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book9,
      audioImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg"
    },
    {
      title: "Út Quyên Và Tôi",
      description: "Tập truyện ngắn với 12 câu chuyện là 12 niềm vui, 12 kỉ niệm dễ thương, 12 bài học giản dị mà sâu sắc… Gặp trong tập truyện này những hình ảnh rất dễ thương, những lời thoại rất học trò…",
      author: "Nguyễn Nhật Ánh",
      audioUrl: book10,
      audioImage: "https://www.nxbtre.com.vn/Images/Book/copy_21_NXBTreStoryFull_04112014_021101.jpg"
    }
  ];

  // const [books, setBooks] = useState([]);
  // useEffect(() => {
  //   supabase.from('books').select().order('id', {ascending: false}).then(({data,})=> {
  //     let temp = []
  //     data.forEach((book) => {
  //       temp.push({
  //         title: book.title,
  //         description: book.description,
  //         author: book.author,  
  //         audioUrl: "src/assets/book/" + book.id + ".mp3",
  //         audioImage: book.audioImage
  //       })
  //     })
  //     setBooks(temp)
  //   })
  // }, []);

  
  const [currentBook, setCurrentBook] = useState(null);
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

  // Chọn ngẫu nhiên bài Book
  const playRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    console.log(books[randomIndex]["audioUrl"])
    const randomBook = books[randomIndex]["audioUrl"];
    setCurrentBook(randomBook);
    playAudio(randomBook);
  };

  useEffect(() => {
    // Phát tệp âm thanh "Đây là trang Book" khi vào trang
    playAudio(Book);
    // audioRef.current.onended = playRandomBook; // Sau khi phát intro, phát bài ngẫu nhiên

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

        if (command.includes("đổi sách")) {
          playRandomBook();
        } else if (command.includes("trang chủ")) {
          navigate("/home-page");
        } else if (command.includes("tiếp tục")) {
          audioRef.current.play();
        } else if (command.includes("bắt đầu")) {
          playRandomBook();
        } else if (command.includes("tin tức") || command.includes("đi đến tin tức") || command.includes("mở tin tức")) {
          navigate("/news");
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

    // Lắng nghe phím Enter
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // Dừng audio hiện tại
        audioRef.current.pause();
        // audioRef.current.currentTime = 0;

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
      <div className="flex flex-wrap justify-around space-4 gap-[30px] p-[40px]">
        {books.map((book, index) => (
          <BookAudio key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksAudio;