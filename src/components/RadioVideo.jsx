import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import ReplayIcon from "@mui/icons-material/Replay";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import "./RadioVideo.css";

function RadioVideo({ video, setActiveAudioRef, isCurrentTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(video.audioUrl);
    }

    if (isCurrentTrack) {
      setActiveAudioRef(audioRef);
    }

    const audio = audioRef.current;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.onplay = () => {
      setIsPlaying(true);
    };

    audio.onpause = () => {
      setIsPlaying(false);
    };

    return () => {
      audio.pause();
      setIsPlaying(false);
    };
  }, [video.audioUrl, setActiveAudioRef, isCurrentTrack]);

  const handlePlayAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.play();
        setActiveAudioRef(audioRef);
      } else {
        audio.pause();
      }
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleForward = () => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.min(audio.currentTime + 10, audio.duration);
      audio.currentTime = newTime;
    }
  };

  const handleRewind = () => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.max(audio.currentTime - 10, 0);
      audio.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`news_book my-4 ${isCurrentTrack ? 'current-track' : ''}`}>
      <Card>
        <CardMedia
          sx={{ height: 300 }}
          image={video.image}
          title={video.name}
        />
        <CardActions>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            px: 2
          }}>
            <Box sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box>
                <IconButton
                  aria-label="replay"
                  onClick={handleReplay}
                  sx={{ height: 38, width: 38 }}
                >
                  <ReplayIcon sx={{ height: 24, width: 24 }} />
                </IconButton>
              </Box>

              <Box sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <IconButton
                  aria-label="rewind"
                  onClick={handleRewind}
                  sx={{ height: 38, width: 38 }}
                >
                  <FastRewindIcon sx={{ height: 24, width: 24 }} />
                </IconButton>

                <IconButton
                  aria-label="play/pause"
                  onClick={handlePlayAudio}
                  sx={{ height: 38, width: 38 }}
                >
                  {isPlaying ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>

                <IconButton
                  aria-label="forward"
                  onClick={handleForward}
                  sx={{ height: 38, width: 38 }}
                >
                  <FastForwardIcon sx={{ height: 24, width: 24 }} />
                </IconButton>
              </Box>

              <Box sx={{ width: 38 }} />
            </Box>

            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  width: '100%',
                  height: 4,
                  borderRadius: 2,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(currentTime)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(duration)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardActions>
        <CardContent className="border-spacing-0">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: "#133c8b", fontWeight: "bold" }}
          >
            {video.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.auther}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default RadioVideo;