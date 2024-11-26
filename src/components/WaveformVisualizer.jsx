// import React, { useState, useEffect, useRef } from 'react';

// function WaveformVisualizer() {
//   const canvasRef = useRef(null);
//   const [audioContext, setAudioContext] = useState(null);
//   const [analyser, setAnalyser] = useState(null);
//   const [dataArray, setDataArray] = useState(null);
//   const [error, setError] = useState('');
//   const animationRef = useRef(null);

//   useEffect(() => {
//     const setupAudio = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         const context = new (window.AudioContext || window.webkitAudioContext)();
//         const audioAnalyser = context.createAnalyser();
//         const source = context.createMediaStreamSource(stream);
        
//         audioAnalyser.fftSize = 2048;
//         const bufferLength = audioAnalyser.frequencyBinCount;
//         const dataArr = new Uint8Array(bufferLength);
        
//         source.connect(audioAnalyser);
        
//         setAudioContext(context);
//         setAnalyser(audioAnalyser);
//         setDataArray(dataArr);
//       } catch (err) {
//         setError('Không thể truy cập microphone. Vui lòng cấp quyền và thử lại.');
//       }
//     };

//     setupAudio();

//     return () => {
//       if (audioContext) {
//         audioContext.close();
//       }
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!analyser || !dataArray || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const canvasCtx = canvas.getContext('2d');
    
//     const draw = () => {
//       const width = canvas.width;
//       const height = canvas.height;
      
//       analyser.getByteTimeDomainData(dataArray);
      
//       canvasCtx.fillStyle = 'rgb(20, 20, 20)';
//       canvasCtx.fillRect(0, 0, width, height);
      
//       canvasCtx.lineWidth = 2;
//       canvasCtx.strokeStyle = 'rgb(0, 255, 0)';
//       canvasCtx.beginPath();
      
//       const sliceWidth = width / dataArray.length;
//       let x = 0;
      
//       for (let i = 0; i < dataArray.length; i++) {
//         const v = dataArray[i] / 128.0;
//         const y = v * height / 2;
        
//         if (i === 0) {
//           canvasCtx.moveTo(x, y);
//         } else {
//           canvasCtx.lineTo(x, y);
//         }
        
//         x += sliceWidth;
//       }
      
//       canvasCtx.lineTo(width, height / 2);
//       canvasCtx.stroke();
      
//       animationRef.current = requestAnimationFrame(draw);
//     };
    
//     draw();
    
//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [analyser, dataArray]);

//   return (
//     <div className="w-full max-w-4xl p-4">
//       <div className="mb-4">
//         <h2 className="text-xl font-bold">Hiển thị Sóng Âm</h2>
//       </div>

//       <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
//         <canvas
//           ref={canvasRef}
//           className="w-full h-full"
//           width={1024}
//           height={576}
//         />
//       </div>

//       {error && (
//         <div className="mt-4 text-red-500">
//           {error}
//         </div>
//       )}

//       <div className="mt-4 text-sm text-gray-600">
//         Di chuyển chuột qua đồ thị để xem chi tiết sóng âm
//       </div>
//     </div>
//   );
// };

// export default WaveformVisualizer

import React, { useState, useEffect, useRef } from 'react';
import { MicOff, Mic} from 'lucide-react';

const WaveformVisualizer = () => {
  const localCanvasRef = useRef(null);
  const remoteCanvasRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);
  const [localAnalyser, setLocalAnalyser] = useState(null);
  const [remoteAnalyser, setRemoteAnalyser] = useState(null);
  const [localDataArray, setLocalDataArray] = useState(null);
  const [remoteDataArray, setRemoteDataArray] = useState(null);
  const [error, setError] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const animationRef = useRef(null);
  const [mutedLocal, setMutedLocal] = useState(true);
  const [mutedRemote, setMutedRemote] = useState(true);

  const setupLocalAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // lấy luồng âm thanh từ micro , stream chứa dữ liệu âm thanh từ micro
      const context = new (window.AudioContext || window.webkitAudioContext)(); //cho phép bạn tạo, thao tác, và phát âm thanh trực tiếp trên trình duyệt.
      const analyser = context.createAnalyser(); // tạo một đối tượng AnalyserNode để phân tích các thuộc tính của tín hiệu âm thanh, ví dụ: tần số hoặc cường độ.
      const source = context.createMediaStreamSource(stream); // kết nối stream âm thanh từ micro vào đối tượng AnalyserNode.
      
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArr = new Uint8Array(bufferLength);
      
      source.connect(analyser);
      
      setAudioContext(context);
      setLocalAnalyser(analyser);
      setLocalDataArray(dataArr);
      
      setTimeout(setupRemoteAudio, 1000);
    } catch (err) {
      setError('Không thể truy cập microphone. Vui lòng cấp quyền và thử lại.');
    }
  };

  const setupRemoteAudio = () => {
    if (!audioContext) return;
    
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArr = new Uint8Array(bufferLength);
    
    setRemoteAnalyser(analyser);
    setRemoteDataArray(dataArr);
    setIsCallActive(true);
  };

  useEffect(() => {
    setupLocalAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const drawWaveform = (canvas, analyser, dataArray, color) => {
    if (!canvas || !analyser || !dataArray) return;
    
    const canvasCtx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    analyser.getByteTimeDomainData(dataArray);
    
    canvasCtx.fillStyle = 'rgb(20, 20, 20)';
    canvasCtx.fillRect(0, 0, width, height);
    
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = color;
    canvasCtx.beginPath();
    
    const sliceWidth = width / dataArray.length;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * height / 2;
      
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
        drawWaveform(localCanvasRef.current, localAnalyser, localDataArray, 'rgb(0, 255, 0)');
      }
      if (remoteCanvasRef.current && isCallActive) {
        drawWaveform(remoteCanvasRef.current, remoteAnalyser, remoteDataArray, 'rgb(0, 191, 255)');
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (localAnalyser && localDataArray) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [localAnalyser, remoteAnalyser, localDataArray, remoteDataArray, isCallActive]);

  return (
    <div className="w-full max-w-6xl p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Hiển thị cuộc gọi</h2>
      </div>

      <div className="flex gap-4">
        {/* Local Audio Waveform */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded z-10">
              Microphone của bạn
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <canvas
                ref={localCanvasRef}
                className="w-full h-full"
                width={512}
                height={512}
              />
            </div>
            <div className='flex justify-center mt-[20px]'>
              {!mutedLocal && (
                <button
                  className="group relative"
                  onClick={() => setMutedLocal(!mutedLocal)}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-800 p-4 rounded-full border border-red-400 hover:border-pink-400 transition">
                      <MicOff className="w-8 h-8 text-red-400 group-hover:text-pink-400" />
                    </div>
                </button>
              )}

              {mutedLocal && (
                <button
                  className="group relative"
                  onClick={() => setMutedLocal(!mutedLocal)}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-800 p-4 rounded-full border border-green-400 hover:border-green-400 transition">
                      <Mic className="w-8 h-8 text-green-400 group-hover:text-green-400" />
                    </div>
                </button>
              )}

            </div>
          </div>
        </div>

        {/* Remote Audio Waveform */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded z-10">
              Người gọi đến
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <canvas
                ref={remoteCanvasRef}
                className="w-full h-full"
                width={512}
                height={512}
              />
            </div>
            <div className='flex justify-center mt-[20px]'>
              {!mutedRemote && (
                <button
                  className="group relative"
                  onClick={() => setMutedRemote(!mutedRemote)}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-800 p-4 rounded-full border border-red-400 hover:border-pink-400 transition">
                      <MicOff className="w-8 h-8 text-red-400 group-hover:text-pink-400" />
                    </div>
                </button>
              )}

              {mutedRemote && (
                <button
                  className="group relative"
                  onClick={() => setMutedRemote(!mutedRemote)}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur opacity-40 group-hover:opacity-75 transition"></div>
                    <div className="relative bg-slate-800 p-4 rounded-full border border-green-400 hover:border-green-400 transition">
                      <Mic className="w-8 h-8 text-green-400 group-hover:text-green-400" />
                    </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center mt-[30px]">
        <div className="text-sm text-gray-300">
          {isCallActive ? 'Cuộc gọi đang diễn ra' : 'Đang kết nối...'}
        </div>
        <div className="flex gap-2">
          {/* <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Tắt micro bản thân
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Tắt micro người nói
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WaveformVisualizer;