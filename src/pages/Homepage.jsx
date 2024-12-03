import { MUINavBar } from "../components/MUINavBar";
import "../App.css";
import SpeechReg from "../components/SpeechReg.jsx";
import { useEffect } from "react";
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
import {useNavigate} from "react-router-dom";
function Homepage() {
  const handleAudio = () => {
    const audio = new Audio(HomePage);
    audio.play().then();
  };
  const navigator = useNavigate()
  useEffect(() => {
    handleAudio();
  }, []);
  return (
    <div style={{backgroundColor: "#f3f4f6"}}>
      <MUINavBar />
      <SpeechReg />
      <VolumeSetting />
      <Container>
        <Grid container spacing={3} className="py-5">
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500,
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#ac7412",
                color: 'white'
              }
            }}
                  title="Website được thiết kế với giao diện thân thiện, dễ sử dụng, nhiều thao tác tương tác được tích hợp sẵn giúp tối ưu hóa trải nghiệm của người dùng suy giảm thị lực"
            >
              <CardMedia
                sx={{ height: 250 }}
                image="https://cdn.hailocvn.com/wp-content/uploads/2020/11/huong-dan-su-dung-man-hinh-tuong-tac-3.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tương tác tiện lợi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500,
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#ac7412",
                color: 'white'
              }
            }}
                  title="Trợ lý ảo VSpeak giúp người dùng có thể tương tác với website bằng giọng nói và nhận được phản hồi ngay lập tức. VSpeak có thể giúp người dùng tìm kiếm thông tin, điều hướng trang web,..."
            >
              <CardMedia
                  sx={{ height: 250 }}
                  image="https://bizflyportal.mediacdn.vn/bizflyportal/1578/2428/2021/06/24/21/36/tuo16245237988998.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  VSpeak - Trợ lý ảo
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500,
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#ac7412",
                color: 'white'
              }
            }}
                  title="Audio tin tức giúp người dùng được nghe thông tin thời sự một cách dễ dàng và cập nhật mới nhất."
                  onClick={() => {
                    navigator("/news")
                  }}
            >
              <CardMedia
                  sx={{ height: 250 }}
                  image="https://media.dolenglish.vn/PUBLIC/MEDIA/78023dfb-3555-443f-88a1-f723a00c469c.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tin Tức
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500,
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#ac7412",
                color: 'white'
              }
            }}
              title="Audio âm nhạc được chọn lọc đa dạng thể loại giúp người dùng có thể thư giãn và giải trí."
            >
              <CardMedia
                  sx={{ height: 250 }}
                  image="https://i.ytimg.com/vi/_qzqYmNULRE/maxresdefault.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Âm nhạc
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500,
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#ac7412",
                color: 'white'
              }
            }}
              title="Radio và video chuỗi bài tập thể dục, thể thao dành cho người khiếm thị hỗ trợ hội viên Hội Người mù nâng cao sức khỏe trong mùa dịch Covid-19."
                  onClick={() => {
                    navigator("/sports")
                  }}
            >
              <CardMedia
                  sx={{ height: 250 }}
                  image="https://images2.thanhnien.vn/528068263637045248/2024/10/2/manh-va-ban-dong-hanh-dang-chay-17278567422612094589806.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Thể dục
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500,
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#ac7412",
                color: 'white'
              }
            }}>
              <CardMedia
                  sx={{ height: 250 }}
                  image="https://cdn.tgdd.vn/hoi-dap/845011/mxh-thao-phuong-800x385.jpg"
                  title="Kết nối cộng đồng người khiếm thị, chia sẻ và bắt chuyện cùng nhau."
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Mạng xã hội - VConnect
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Homepage;
