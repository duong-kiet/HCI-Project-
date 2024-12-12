import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./Article.css"

function Article(props) {
  return (
    <div className="news__card">
      <CardMedia
        sx={{ height: 235.58 }}
        image={props.article.urlToImage}
        title="green iguana"
      />
      <CardContent sx={{minHeight:"300px", maxHeight: "300px", whiteSpace:"pre-line", overflow: "hidden"}} className="border-spacing-0">
        <Typography gutterBottom variant="h5" component="div">
          {props.article.title}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          align="right"
          className="italic"
        >
          Ngày đăng: {props.article.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.article.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          tabIndex={"1"}
          aria-label="play/pause"
          onClick={() => props.play()}
        >
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
      </CardActions>
    </div>
  );
}


export default Article;