import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./Article.css"
import { useState, useRef } from 'react';
  
function BookAudio({ book }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handlePlayAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(book.audioUrl);
    }

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudio = () => {
    let audio = new Audio(book.audioTitle); // replace 'audioUrl' with the actual property
    audio.play();
  }

  const handlePauseAudio = () => {
    // Assuming `audio` is the audio object you want to control
    if (audio) {
      audio.pause();
    }
  };
  
  return (
    <div className="news_book my-4">
      <CardMedia
          sx={{ height: 300 }}
          image={book.audioImage}
          title="green iguana"
      />
      <CardActions >
        <Typography gutterBottom variant="h5" component="div"></Typography>
        <IconButton
          tabIndex={"1"}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          aria-label="play/pause"
          onClick={handlePlayAudio}
          onFocus={handleAudio}
        >
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
      </CardActions>
      <CardContent className="border-spacing-0">
        <Typography gutterBottom variant="h5" component="div" style={{ color: '#133c8b', fontWeight: 'bold' }}>
          {book.title}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          align="right"
          className="italic"
        >
          Tác giả: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
      </CardContent>
    </div>
    // <div className="news_book my-4 w-[calc(50%-1rem)] bg-white rounded-lg shadow-md">
    //   <CardMedia
    //     sx={{ height: 300 }}
    //     image={book.audioImage}
    //     title={book.title}
    //   />
    //   <CardActions>
    //     <Typography gutterBottom variant="h5" component="div"></Typography>
    //     <IconButton
    //       tabIndex={"1"}
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         height: "100%",
    //       }}
    //       aria-label="play/pause"
    //       onClick={handlePlayAudio}
    //       onFocus={handleAudio}
    //     >
    //       <PlayArrowIcon sx={{ height: 38, width: 38 }} />
    //     </IconButton>
    //   </CardActions>
    //   <CardContent className="p-4">
    //     <Typography
    //       gutterBottom
    //       variant="h5"
    //       component="div"
    //       className="text-[#133c8b] font-bold"
    //     >
    //       {book.title}
    //     </Typography>
    //     <Typography
    //       gutterBottom
    //       variant="subtitle2"
    //       component="div"
    //       align="right"
    //       className="italic"
    //     >
    //       Tác giả: {book.author}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {book.description}
    //     </Typography>
    //   </CardContent>
    // </div>
  );
}

export default BookAudio;