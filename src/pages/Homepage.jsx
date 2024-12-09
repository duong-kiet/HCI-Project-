// import { MUINavBar } from "../components/MUINavBar";

// import "../App.css";
// import React, { useState } from "react";
// import SpeechReg from "../components/SpeechReg";
// import { useEffect } from "react";
// import VolumeSetting from "../components/Volume";
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import HomePage from "../assets/mp3/HomePage.mp3";
// function Homepage() {
//   const handleAudio = () => {
//     const audio = new Audio(HomePage);
//     audio.play();
//   };

//   useEffect(() => {
//     handleAudio();
//   }, []);
//   return (
//     <div className="App">
//       <MUINavBar />
//       <SpeechReg />
//       <VolumeSetting />

//       {/* content of homepage */}
//       <Container>
//         <Grid>
//           <Box
//             style={{
//               position: "relative",
//               height: "85vh",
//               alignItems: "center",
//               display: "flex",
//               justifyContent: "center",
//               flexDirection: "column",
//               marginBottom: "100px",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundImage: "url(/src/assets/images/blind-man-cross.jpg)",
//                 backgroundPosition: "center",
//                 backgroundSize: "cover",
//                 backgroundRepeat: "no-repeat",
//                 opacity: 0.4,
//                 zIndex: -1,
//               }}
//             />
//             <div
//               style={{
//                 fontSize: "100px",
//                 fontWeight: "bolder",
//                 background: "-webkit-linear-gradient(#FE0101, #FED60C)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: "0px",
//               }}
//             >
//               VAssist
//             </div>
//             <div
//               style={{
//                 fontSize: "30px",
//                 fontWeight: "bolder",
//                 color: "green",
//                 marginBottom: "200px",
//               }}
//             >
//               Connect the Vision, Connect the World
//             </div>
//           </Box>
//         </Grid>
//         <Grid container spacing={3} className="py-5">
//           <Grid item xs={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://cdn.hailocvn.com/wp-content/uploads/2020/11/huong-dan-su-dung-man-hinh-tuong-tac-3.jpg"
//                 title="news"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Tương tác tiện lợi
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Website được thiết kế với giao diện thân thiện, dễ sử dụng,
//                   nhiều thao tác tương tác được tích hợp sẵn giúp tối ưu hóa
//                   trải nghiệm của người dùng suy giảm thị lực
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Tìm hiểu thêm</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://bizflyportal.mediacdn.vn/bizflyportal/1578/2428/2021/06/24/21/36/tuo16245237988998.jpg"
//                 title="news"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   VSpeak - Trợ lý ảo
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Trợ lý ảo VSpeak giúp người dùng có thể tương tác với website
//                   bằng giọng nói và nhận được phản hồi ngay lập tức. VSpeak có
//                   thể giúp người dùng tìm kiếm thông tin, điều hướng trang web,
//                   ...
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Tìm hiểu thêm</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://media.dolenglish.vn/PUBLIC/MEDIA/78023dfb-3555-443f-88a1-f723a00c469c.jpg"
//                 title="news"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Tin Tức
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Audio tin tức giúp người dùng được nghe thông tin thời sự một
//                   cách dễ dàng và cập nhật mới nhất
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Tìm hiểu thêm</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://i.ytimg.com/vi/_qzqYmNULRE/maxresdefault.jpg"
//                 title="news"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Âm nhạc
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Audio âm nhạc được chọn lọc đa dạng thể loại giúp người dùng
//                   có thể thư giãn và giải trí
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Tìm hiểu thêm</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://cdn.tuoitrethudo.com.vn/stores/news_dataimages/tuoitrethudocomvn/052020/09/18/video-radio-huong-dan-tap-luyen-the-thao-cho-nguoi-khiem-thi-30-.3359.jpg"
//                 title="news"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Thể dục
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Radio và video chuỗi bài tập thể dục, thể thao dành cho người
//                   khiếm thị hỗ trợ hội viên Hội Người mù nâng cao sức khỏe trong
//                   mùa dịch Covid-19.
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Tìm hiểu thêm</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://cdn.tgdd.vn/hoi-dap/845011/mxh-thao-phuong-800x385.jpg"
//                 title="news"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Mạng xã hội - VConnect
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Kết nối cộng đồng người khiếm thị, chia sẻ và bắt chuyện cùng
//                   nhau <br />
//                   <br /> <br />
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Tìm hiểu thêm</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default Homepage;

// import { MUINavBar } from "../components/MUINavBar";
// import "../App.css";
// // import SpeechReg from "../components/SpeechReg.jsx";
// import { useEffect } from "react";
// import VolumeSetting from "../components/Volume";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import HomePage from "../assets/mp3/HomePage.mp3";
// import { useNavigate } from "react-router-dom";
// function Homepage() {
//   const handleAudio = () => {
//     const audio = new Audio(HomePage);
//     audio.play().then();
//   };
//   const navigator = useNavigate()
//   useEffect(() => {
//     handleAudio();
//   }, []);
//   return (
//     <div style={{ backgroundColor: "#f3f4f6" }}>
//       <MUINavBar />
//       {/* <SpeechReg /> */}
//       {/* <VolumeSetting /> */}
//       <Container>
//         <Grid container spacing={3} className="py-5">
//           <Grid item xs={6}>
//             <Card sx={{
//               maxWidth: 500,
//               fontWeight: "bold",
//               '&:hover': {
//                 backgroundColor: "#ac7412",
//                 color: 'white'
//               }
//             }}
//               title="Website được thiết kế với giao diện thân thiện, dễ sử dụng, nhiều thao tác tương tác được tích hợp sẵn giúp tối ưu hóa trải nghiệm của người dùng suy giảm thị lực"
//             >
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://cdn.hailocvn.com/wp-content/uploads/2020/11/huong-dan-su-dung-man-hinh-tuong-tac-3.jpg"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Tương tác tiện lợi
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{
//               maxWidth: 500,
//               fontWeight: "bold",
//               '&:hover': {
//                 backgroundColor: "#ac7412",
//                 color: 'white'
//               }
//             }}
//               title="Trợ lý ảo VSpeak giúp người dùng có thể tương tác với website bằng giọng nói và nhận được phản hồi ngay lập tức. VSpeak có thể giúp người dùng tìm kiếm thông tin, điều hướng trang web,..."
//             >
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://bizflyportal.mediacdn.vn/bizflyportal/1578/2428/2021/06/24/21/36/tuo16245237988998.jpg"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   VSpeak - Trợ lý ảo
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{
//               maxWidth: 500,
//               fontWeight: "bold",
//               '&:hover': {
//                 backgroundColor: "#ac7412",
//                 color: 'white'
//               }
//             }}
//               title="Audio tin tức giúp người dùng được nghe thông tin thời sự một cách dễ dàng và cập nhật mới nhất."
//               onClick={() => {
//                 navigator("/news")
//               }}
//             >
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://media.dolenglish.vn/PUBLIC/MEDIA/78023dfb-3555-443f-88a1-f723a00c469c.jpg"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Tin Tức
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{
//               maxWidth: 500,
//               fontWeight: "bold",
//               '&:hover': {
//                 backgroundColor: "#ac7412",
//                 color: 'white'
//               }
//             }}
//               title="Audio âm nhạc được chọn lọc đa dạng thể loại giúp người dùng có thể thư giãn và giải trí."
//             >
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://i.ytimg.com/vi/_qzqYmNULRE/maxresdefault.jpg"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Âm nhạc
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{
//               maxWidth: 500,
//               fontWeight: "bold",
//               '&:hover': {
//                 backgroundColor: "#ac7412",
//                 color: 'white'
//               }
//             }}
//               title="Radio và video chuỗi bài tập thể dục, thể thao dành cho người khiếm thị hỗ trợ hội viên Hội Người mù nâng cao sức khỏe trong mùa dịch Covid-19."
//               onClick={() => {
//                 navigator("/sports")
//               }}
//             >
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://images2.thanhnien.vn/528068263637045248/2024/10/2/manh-va-ban-dong-hanh-dang-chay-17278567422612094589806.jpg"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Thể dục
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card sx={{
//               maxWidth: 500,
//               fontWeight: "bold",
//               '&:hover': {
//                 backgroundColor: "#ac7412",
//                 color: 'white'
//               }
//             }}>
//               <CardMedia
//                 sx={{ height: 250 }}
//                 image="https://cdn.tgdd.vn/hoi-dap/845011/mxh-thao-phuong-800x385.jpg"
//                 title="Kết nối cộng đồng người khiếm thị, chia sẻ và bắt chuyện cùng nhau."
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Mạng xã hội - VConnect
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default Homepage;

import { MUINavBar } from "../components/MUINavBar";
import "../App.css";
import { useEffect, useState } from "react";
import image2 from "../assets/images/homepage/asi.jpg";
import image1 from "../assets/images/homepage/connect.jpg";
import image4 from "../assets/images/homepage/music.jpg";
import image3 from "../assets/images/homepage/news.jpg";
import image5 from "../assets/images/homepage/physic.jpg";
import image6 from "../assets/images/homepage/social.jpg";
import VolumeSetting from "../components/Volume";
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
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

  const commands = [
    {
      command: ["tin tức", "đi đến tin tức", "mở tin tức"],
      callback: () => navigate("/news"),
    },
    {
      command: ["đọc sách", "mở đọc sách", "đi đến đọc sách"],
      callback: () => navigate("/books"),
    },
    {
      command: ["nghe nhạc", "mở nghe nhạc", "đi đến nghe nhạc"],
      callback: () => navigate("/music"),
    },
    {
      command: ["trò chuyện", "mở trò chuyện", "đi đến trò chuyện"],
      callback: () => navigate("/voice-chat"),
    },
  ];

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands,
  });

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!");
      return;
    }

    // Phát âm thanh khi truy cập
    if (!isAudioPlayed) {
      const audio = new Audio(HomePage);
      audio.play().then(() => setIsAudioPlayed(true));
    }

    // Bắt đầu lắng nghe giọng nói
    SpeechRecognition.startListening({ continuous: true, language: "vi-VN" });

    return () => {
      SpeechRecognition.stopListening(); // Dừng lắng nghe khi rời khỏi trang
    };
  }, []);

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

// import { MUINavBar } from "../components/MUINavBar";
// import "../App.css";
// import { useEffect } from "react";
// import image2 from "../assets/images/homepage/asi.jpg";
// import image1 from "../assets/images/homepage/connect.jpg";
// import image4 from "../assets/images/homepage/music.jpg";
// import image3 from "../assets/images/homepage/news.jpg";
// import image5 from "../assets/images/homepage/physic.jpg";
// import image6 from "../assets/images/homepage/social.jpg";
// import VolumeSetting from "../components/Volume";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import HomePage from "../assets/mp3/HomePage.mp3";
// import { useNavigate } from "react-router-dom";

// // const cardData = [
// //   {
// //     title: "Tương tác tiện lợi",
// //     description: "Website được thiết kế với giao diện thân thiện, dễ sử dụng, nhiều thao tác tương tác được tích hợp sẵn giúp tối ưu hóa trải nghiệm của người dùng suy giảm thị lực",
// //     image: image1,
// //     route: ""
// //   },
// //   {
// //     title: "VSpeak - Trợ lý ảo",
// //     description: "Trợ lý ảo VSpeak giúp người dùng có thể tương tác với website bằng giọng nói và nhận được phản hồi ngay lập tức",
// //     image: image2,
// //     route: ""
// //   },
// //   {
// //     title: "Tin Tức",
// //     description: "Audio tin tức giúp người dùng được nghe thông tin thời sự một cách dễ dàng và cập nhật mới nhất",
// //     image: image3,
// //     route: "/news"
// //   },
// //   {
// //     title: "Âm nhạc",
// //     description: "Audio âm nhạc được chọn lọc đa dạng thể loại giúp người dùng có thể thư giãn và giải trí",
// //     image: image4,
// //     route: ""
// //   },
// //   {
// //     title: "Thể dục",
// //     description: "Radio và video chuỗi bài tập thể dục, thể thao dành cho người khiếm thị",
// //     image: image5,
// //     route: "/sports"
// //   },
// //   {
// //     title: "Mạng xã hội - VConnect",
// //     description: "Kết nối cộng đồng người khiếm thị, chia sẻ và bắt chuyện cùng nhau",
// //     image: image6,
// //     route: ""
// //   }
// // ];

// function Homepage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const audio = new Audio(HomePage);
//     audio.play().catch(console.error);
//   }, []);

//   return (
//     <div className="bg-gray-100">
//       <MUINavBar />
//       <VolumeSetting />

//       <Container className="mt-16">
//         <Grid container spacing={3} className="py-5">
//           {cardData.map((card, index) => (
//             <Grid item xs={6} key={index} className="flex justify-center">
//               <div className="p-2 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl w-full max-w-lg">
//                 <Card
//                   onClick={() => card.route && navigate(card.route)}
//                   sx={{
//                     width: '100%',
//                     height: '100%', // Đảm bảo card có chiều cao đồng nhất
//                     cursor: card.route ? 'pointer' : 'default',
//                     borderRadius: '0.75rem',
//                     overflow: 'hidden',
//                     transition: 'all 0.3s ease',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     '&:hover': {
//                       backgroundColor: "#ac7412",
//                       color: 'white',
//                       transform: 'translateY(-4px)'
//                     }
//                   }}
//                 >
//                   <div style={{ position: 'relative', paddingTop: '56.25%' /* Tỷ lệ 16:9 */ }}>
//                     <CardMedia
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         borderRadius: '0.75rem 0.75rem 0 0',
//                         backgroundPosition: 'center',
//                         backgroundSize: 'cover',
//                         objectFit: 'cover'
//                       }}
//                       image={card.image}
//                       title={card.description}
//                       component="img"
//                     />
//                   </div>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       gutterBottom
//                       variant="h5"
//                       component="div"
//                       className="font-bold"
//                     >
//                       {card.title}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         transition: 'color 0.3s ease',
//                         '.MuiCard-root:hover &': {
//                           color: 'rgba(255, 255, 255, 0.7)'
//                         }
//                       }}
//                     >
//                       {card.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default Homepage;