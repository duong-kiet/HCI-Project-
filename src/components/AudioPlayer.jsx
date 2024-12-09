import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

const AudioPlayer = ({ audioUrl, title, author }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio(audioUrl));

    useEffect(() => {
        const audio = audioRef.current;

        // Set up audio event listeners
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            setProgress((audio.currentTime / audio.duration) * 100);
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            setProgress(0);
        });

        // Cleanup
        return () => {
            audio.removeEventListener('loadedmetadata', () => { });
            audio.removeEventListener('timeupdate', () => { });
            audio.removeEventListener('ended', () => { });
            audio.pause();
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        const newTime = clickPosition * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(clickPosition * 100);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-64 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-600">{author}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <button
                    onClick={togglePlay}
                    className="p-2 transition-colors hover:text-blue-600"
                >
                    {isPlaying ? (
                        <PauseCircle size={40} />
                    ) : (
                        <PlayCircle size={40} />
                    )}
                </button>

                <div className="w-full">
                    <div
                        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                        <span>{formatTime(audioRef.current.currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;