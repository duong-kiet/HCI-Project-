import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

const WaveformVisualizer = ({ localAudioTrack, remoteAudioTracks = [] }) => {
  const localCanvasRef = useRef(null);
  const remoteCanvasRefs = useRef([]);
  const [audioContext, setAudioContext] = useState(null);
  const [localAnalyser, setLocalAnalyser] = useState(null);
  const [remoteAnalysers, setRemoteAnalysers] = useState([]);
  const [localDataArray, setLocalDataArray] = useState(null);
  const [remoteDataArrays, setRemoteDataArrays] = useState([]);
  const [error, setError] = useState('');
  const animationRef = useRef(null);
  const [mutedLocal, setMutedLocal] = useState(false);
  const [mutedRemotes, setMutedRemotes] = useState([]);

  useEffect(() => {
    // Thiết lập AudioContext một lần duy nhất
    const setupAudioContext = () => {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
      } catch (err) {
        setError('Không thể khởi tạo AudioContext. Vui lòng kiểm tra trình duyệt.');
      }
    };

    if (!audioContext) setupAudioContext();
  }, [audioContext]);

  const setupLocalAudio = async () => {
    if (!localAudioTrack || !audioContext) return;

    try {
      const analyser = audioContext.createAnalyser();
      const stream = new MediaStream([localAudioTrack.getMediaStreamTrack()]);
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArr = new Uint8Array(bufferLength);

      source.connect(analyser);
      setLocalAnalyser(analyser);
      setLocalDataArray(dataArr);
    } catch (err) {
      setError('Không thể thiết lập âm thanh local. Vui lòng thử lại.');
    }
  };

  const setupRemoteAudios = () => {
    if (!audioContext || remoteAudioTracks.length === 0) return;

    const analysers = remoteAudioTracks.map((track) => {
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArr = new Uint8Array(bufferLength);

      const stream = new MediaStream([track.getMediaStreamTrack()]);
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      return { analyser, dataArr };
    });

    setRemoteAnalysers(analysers.map((item) => item.analyser));
    setRemoteDataArrays(analysers.map((item) => item.dataArr));
    setMutedRemotes(new Array(remoteAudioTracks.length).fill(false));
  };

  useEffect(() => {
    setupLocalAudio();
  }, [localAudioTrack, audioContext]);

  useEffect(() => {
    setupRemoteAudios();
  }, [remoteAudioTracks, audioContext]);

  const drawWaveform = (canvas, analyser, dataArray, color, isMuted) => {
    if (!canvas || !analyser || !dataArray) return;

    const canvasCtx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Xóa canvas
    canvasCtx.fillStyle = 'rgb(20, 20, 20)';
    canvasCtx.fillRect(0, 0, width, height);

    if (isMuted) return; // Nếu track bị mute, không vẽ waveform

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = color;
    canvasCtx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * (height / 2);

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    canvasCtx.lineTo(width, height / 2);
    canvasCtx.stroke();
  };

  useEffect(() => {
    const animate = () => {
      if (localCanvasRef.current) {
        drawWaveform(
          localCanvasRef.current,
          localAnalyser,
          localDataArray,
          'rgb(0, 255, 0)',
          mutedLocal
        );
      }

      remoteAnalysers.forEach((analyser, index) => {
        if (remoteCanvasRefs.current[index]) {
          drawWaveform(
            remoteCanvasRefs.current[index],
            analyser,
            remoteDataArrays[index],
            'rgb(0, 191, 255)',
            mutedRemotes[index]
          );
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (localAnalyser || remoteAnalysers.length > 0) animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [localAnalyser, remoteAnalysers, localDataArray, remoteDataArrays, mutedLocal, mutedRemotes]);

  const toggleLocalMute = () => {
    setMutedLocal((prev) => !prev);
    if (localAudioTrack) localAudioTrack.setEnabled(!mutedLocal);
  };

  const toggleRemoteMute = (index) => {
    setMutedRemotes((prev) => {
      const newMuted = [...prev];
      newMuted[index] = !newMuted[index];
      return newMuted;
    });

    if (remoteAudioTracks[index]) {
      remoteAudioTracks[index].setEnabled(!mutedRemotes[index]);
    }
  };

  return (
    <div className="w-full max-w-6xl p-4">
      <h2 className="text-xl font-bold text-white mb-4">Hiển thị cuộc gọi</h2>
      <div className="flex gap-4">
        {/* Local audio */}
        <div className="flex-1">
          <div className="relative">
            <canvas
              ref={localCanvasRef}
              width={400}
              height={400}
              className="w-full h-full bg-gray-900 rounded-lg"
            />
            <button onClick={toggleLocalMute} className="absolute top-2 left-2 bg-black/50 p-2 rounded">
              {mutedLocal ? <MicOff color='red'/> : <Mic color='blue'/>}
            </button>
          </div>
        </div>

        {/* Remote audios */}
        {remoteAudioTracks.map((track, index) => (
          index == 0 && ( <div key={index} className="flex-1">
            <div className="relative">
              <canvas
                ref={(el) => (remoteCanvasRefs.current[index] = el)}
                width={512}
                height={512}
                className="w-full h-full bg-gray-900 rounded-lg"
              />
              <button
                onClick={() => toggleRemoteMute(index)}
                className="absolute top-2 left-2 bg-black/50 p-2 rounded"
              >
                {mutedRemotes[index] ? <MicOff color='red'/> : <Mic color='blue'/>}
              </button>
            </div>
          </div>)
        ))}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};
export default WaveformVisualizer;