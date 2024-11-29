// import React, { useState, useEffect, useRef } from 'react';
// import { Mic, MicOff } from 'lucide-react';

// const WaveformVisualizer = ({ localAudioTrack, remoteAudioTracks }) => {
//   const localCanvasRef = useRef(null);
//   const remoteCanvasRefs = useRef([]);
//   const [audioContext, setAudioContext] = useState(null);
//   const [localAnalyser, setLocalAnalyser] = useState(null);
//   const [remoteAnalysers, setRemoteAnalysers] = useState([]);
//   const [localDataArray, setLocalDataArray] = useState(null);
//   const [remoteDataArrays, setRemoteDataArrays] = useState([]);
//   const [error, setError] = useState('');
//   const [isCallActive, setIsCallActive] = useState(false);
//   const animationRef = useRef(null);
//   const [mutedLocal, setMutedLocal] = useState(false);
//   const [mutedRemotes, setMutedRemotes] = useState([]);

//   const setupLocalAudio = async () => {
//     if (!localAudioTrack) return;
    
//     try {
//       const context = new (window.AudioContext || window.webkitAudioContext)();
//       const analyser = context.createAnalyser();
      
//       // Tạo MediaStream từ local audio track
//       const stream = new MediaStream([localAudioTrack.getMediaStreamTrack()]);
//       const source = context.createMediaStreamSource(stream);
      
//       analyser.fftSize = 2048;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArr = new Uint8Array(bufferLength);
      
//       source.connect(analyser);
      
//       setAudioContext(context);
//       setLocalAnalyser(analyser);
//       setLocalDataArray(dataArr);
      
//       setIsCallActive(true);
//     } catch (err) {
//       setError('Không thể thiết lập âm thanh local. Vui lòng thử lại.');
//     }
//   };

//   const setupRemoteAudios = () => {
//     if (!audioContext || !remoteAudioTracks.length) return;
    
//     const analysers = remoteAudioTracks.map((track, index) => {
//       const analyser = audioContext.createAnalyser();
//       analyser.fftSize = 2048;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArr = new Uint8Array(bufferLength);
      
//       const stream = new MediaStream([track.getMediaStreamTrack()]);
//       const source = audioContext.createMediaStreamSource(stream);
//       source.connect(analyser);
      
//       return { analyser, dataArr };
//     });
    
//     setRemoteAnalysers(analysers.map(item => item.analyser));
//     setRemoteDataArrays(analysers.map(item => item.dataArr));
//     setMutedRemotes(new Array(remoteAudioTracks.length).fill(true));
//   };

//   const drawWaveform = (canvas, analyser, dataArray, color, isMuted) => {
//     if (!canvas || !analyser || !dataArray) return;
    
//     const canvasCtx = canvas.getContext('2d');
//     const width = canvas.width;
//     const height = canvas.height;
    
//     canvasCtx.fillStyle = 'rgb(20, 20, 20)';
//     canvasCtx.fillRect(0, 0, width, height);
    
//     if (isMuted) {
//       analyser.getByteTimeDomainData(dataArray);
      
//       canvasCtx.lineWidth = 2;
//       canvasCtx.strokeStyle = color;
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
//     } else {
//       canvasCtx.beginPath();
//       canvasCtx.strokeStyle = color;
//       canvasCtx.lineWidth = 2;
//       canvasCtx.moveTo(0, height / 2);
//       canvasCtx.lineTo(width, height / 2);
//       canvasCtx.stroke();
//     }
//   };

//   useEffect(() => {
//     setupLocalAudio();
//   }, [localAudioTrack]);

//   useEffect(() => {
//     setupRemoteAudios();
//   }, [remoteAudioTracks]);

//   useEffect(() => {
//     const animate = () => {
//       if (localCanvasRef.current) {
//         drawWaveform(localCanvasRef.current, localAnalyser, localDataArray, 'rgb(0, 255, 0)', mutedLocal);
//       }
      
//       remoteAnalysers.forEach((analyser, index) => {
//         if (remoteCanvasRefs.current[index]) {
//           drawWaveform(
//             remoteCanvasRefs.current[index], 
//             analyser, 
//             remoteDataArrays[index], 
//             'rgb(0, 191, 255)', 
//             mutedRemotes[index]
//           );
//         }
//       });
      
//       animationRef.current = requestAnimationFrame(animate);
//     };
    
//     if (localAnalyser && localDataArray && remoteAnalysers.length > 0) {
//       animate();
//     }
    
//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [localAnalyser, remoteAnalysers, localDataArray, remoteDataArrays, mutedLocal, mutedRemotes]);

//   const toggleLocalMute = () => {
//     setMutedLocal(!mutedLocal);
//     if (localAudioTrack) {
//       localAudioTrack.setEnabled(!mutedLocal);
//     }
//   };

//   const toggleRemoteMute = (index) => {
//     const newMutedRemotes = [...mutedRemotes];
//     newMutedRemotes[index] = !newMutedRemotes[index];
//     setMutedRemotes(newMutedRemotes);
    
//     if (remoteAudioTracks[index]) {
//       remoteAudioTracks[index].setEnabled(!newMutedRemotes[index]);
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl p-4">
//       <div className="mb-4">
//         <h2 className="text-xl font-bold text-white">Hiển thị cuộc gọi</h2>
//       </div>

//       <div className="flex gap-4">
//         {/* Local Audio Waveform */}
//         <div className="flex-1">
//           <div className="relative">
//             <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded z-10">
//               Microphone của bạn
//             </div>
//             <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
//               <canvas
//                 ref={localCanvasRef}
//                 className="w-full h-full"
//                 width={512}
//                 height={512}
//               />
//             </div>
//             <div className="mt-2 flex justify-center">
//               <button 
//                 onClick={toggleLocalMute} 
//                 className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
//               >
//                 {mutedLocal ? <MicOff size={24} /> : <Mic size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Remote Audio Waveforms */}
//         {remoteAudioTracks.map((track, index) => (
//           index > 0 && (<div key={index} className="flex-1">
//             <div className="relative">
//               <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded z-10">
//                 Người tham gia {index}
//               </div>
//               <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
//                 <canvas
//                   ref={(el) => {
//                     remoteCanvasRefs.current[index] = el;
//                   }}
//                   className="w-full h-full"
//                   width={512}
//                   height={512}
//                 />
//               </div>
//               <div className="mt-2 flex justify-center">
//                 <button 
//                   onClick={() => toggleRemoteMute(index)} 
//                   className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
//                 >
//                   {mutedRemotes[index] ? <MicOff size={24} /> : <Mic size={24} />}
//                 </button>
//               </div>
//             </div>
//           </div>)
//         ))}
//       </div>

//       {error && (
//         <div className="mt-4 text-red-500 text-center">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WaveformVisualizer;

// Ver 2
// import React, { useState, useEffect, useRef } from 'react';
// import { Mic, MicOff } from 'lucide-react';

// const WaveformVisualizer = ({ localAudioTrack, remoteAudioTracks = [] }) => {
//   const localCanvasRef = useRef(null);
//   const remoteCanvasRefs = useRef([]);
//   const [audioContext, setAudioContext] = useState(null);
//   const [localAnalyser, setLocalAnalyser] = useState(null);
//   const [remoteAnalysers, setRemoteAnalysers] = useState([]);
//   const [localDataArray, setLocalDataArray] = useState(null);
//   const [remoteDataArrays, setRemoteDataArrays] = useState([]);
//   const [error, setError] = useState('');
//   const animationRef = useRef(null);
//   const [mutedLocal, setMutedLocal] = useState(false);
//   const [mutedRemotes, setMutedRemotes] = useState([]);

//   useEffect(() => {
//     const setupAudioContext = () => {
//       try {
//         const context = new (window.AudioContext || window.webkitAudioContext)();
//         setAudioContext(context);
//       } catch (err) {
//         setError('Không thể khởi tạo AudioContext. Vui lòng kiểm tra trình duyệt.');
//       }
//     };

//     if (!audioContext) setupAudioContext();
//   }, [audioContext]);

//   const setupLocalAudio = async () => {
//     if (!localAudioTrack || !audioContext) return;

//     try {
//       const analyser = audioContext.createAnalyser();
//       const stream = new MediaStream([localAudioTrack.getMediaStreamTrack()]);
//       const source = audioContext.createMediaStreamSource(stream);

//       analyser.fftSize = 2048;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArr = new Uint8Array(bufferLength);

//       source.connect(analyser);
//       setLocalAnalyser(analyser);
//       setLocalDataArray(dataArr);
//     } catch (err) {
//       setError('Không thể thiết lập âm thanh local. Vui lòng thử lại.');
//     }
//   };

//   const setupRemoteAudios = () => {
//     if (!audioContext || remoteAudioTracks.length === 0) return;

//     const analysers = remoteAudioTracks.map((track) => {
//       const analyser = audioContext.createAnalyser();
//       analyser.fftSize = 2048;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArr = new Uint8Array(bufferLength);

//       const stream = new MediaStream([track.getMediaStreamTrack()]);
//       const source = audioContext.createMediaStreamSource(stream);
//       source.connect(analyser);

//       return { analyser, dataArr };
//     });

//     setRemoteAnalysers(analysers.map((item) => item.analyser));
//     setRemoteDataArrays(analysers.map((item) => item.dataArr));
//     setMutedRemotes(new Array(remoteAudioTracks.length).fill(true));
//   };

//   useEffect(() => {
//     setupLocalAudio();
//   }, [localAudioTrack, audioContext]);

//   useEffect(() => {
//     setupRemoteAudios();
//   }, [remoteAudioTracks, audioContext]);

//   const drawWaveform = (canvas, analyser, dataArray, color, isMuted) => {
//     if (!canvas || !analyser || !dataArray) return;

//     const canvasCtx = canvas.getContext('2d');
//     const width = canvas.width;
//     const height = canvas.height;

//     canvasCtx.fillStyle = 'rgb(20, 20, 20)';
//     canvasCtx.fillRect(0, 0, width, height);

//     analyser.getByteTimeDomainData(dataArray);

//     canvasCtx.lineWidth = 2;
//     canvasCtx.strokeStyle = color;
//     canvasCtx.beginPath();

//     const sliceWidth = width / dataArray.length;
//     let x = 0;

//     for (let i = 0; i < dataArray.length; i++) {
//       const v = dataArray[i] / 128.0;
//       const y = v * (height / 2);

//       if (i === 0) {
//         canvasCtx.moveTo(x, y);
//       } else {
//         canvasCtx.lineTo(x, y);
//       }
//       x += sliceWidth;
//     }

//     canvasCtx.lineTo(width, height / 2);
//     canvasCtx.stroke();
//   };

//   useEffect(() => {
//     const animate = () => {
//       if (localCanvasRef.current) {
//         drawWaveform(
//           localCanvasRef.current,
//           localAnalyser,
//           localDataArray,
//           'rgb(0, 255, 0)',
//           mutedLocal
//         );
//       }

//       remoteAnalysers.forEach((analyser, index) => {
//         if (remoteCanvasRefs.current[index]) {
//           drawWaveform(
//             remoteCanvasRefs.current[index],
//             analyser,
//             remoteDataArrays[index],
//             'rgb(0, 191, 255)',
//             mutedRemotes[index]
//           );
//         }
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     if (localAnalyser && remoteAnalysers.length > 0) animate();

//     return () => {
//       if (animationRef.current) cancelAnimationFrame(animationRef.current);
//     };
//   }, [localAnalyser, remoteAnalysers, localDataArray, remoteDataArrays, mutedLocal, mutedRemotes]);

//   const toggleLocalMute = () => {
//     setMutedLocal((prev) => !prev);
//     if (localAudioTrack) localAudioTrack.setEnabled(mutedLocal);
//   };

//   const toggleRemoteMute = (index) => {
//     setMutedRemotes((prev) => {
//       const newMuted = [...prev];
//       newMuted[index] = !newMuted[index];
//       return newMuted;
//     });

//     if (remoteAudioTracks[index]) {
//       remoteAudioTracks[index].setEnabled(mutedRemotes[index]);
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl p-4">
//       <h2 className="text-xl font-bold text-white mb-4">Hiển thị cuộc gọi</h2>
//       <div className="flex gap-4">
//         <div className="flex-1">
//           <div className="relative">
//             <canvas
//               ref={localCanvasRef}
//               width={512}
//               height={512}
//               className="w-full h-full bg-gray-900 rounded-lg"
//             />
//             <button onClick={toggleLocalMute} className="absolute top-2 left-2 bg-black/50 p-2 rounded">
//               {mutedLocal ? <MicOff color='blue'/> : <Mic color='red'/>}
//             </button>
//           </div>
//         </div>
//         {remoteAudioTracks.map((track, index) => (
//           <div key={index} className="flex-1">
//             <div className="relative">
//               <canvas
//                 ref={(el) => (remoteCanvasRefs.current[index] = el)}
//                 width={512}
//                 height={512}
//                 className="w-full h-full bg-gray-900 rounded-lg"
//               />
//               <button
//                 onClick={() => toggleRemoteMute(index)}
//                 className="absolute top-2 left-2 bg-black/50 p-2 rounded"
//               >
//                 {mutedRemotes[index] ? <MicOff  color='blue'/> : <Mic color='red'/>}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {error && <div className="text-red-500 mt-4">{error}</div>}
//     </div>
//   );
// };

// export default WaveformVisualizer;

// ver 3 
// import React, { useEffect, useRef } from "react";

// const WaveformVisualizer = ({ localAudioTrack, remoteAudioTracks, mutedTracks = [] }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const audioTracks = [...(remoteAudioTracks || [])];
//     if (localAudioTrack) audioTracks.push(localAudioTrack);

//     let animationFrameId;

//     const drawWaveform = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       audioTracks.forEach((track, index) => {
//         if (mutedTracks.includes(track)) return; // Skip muted tracks
//         const volume = track.getVolumeLevel ? track.getVolumeLevel() : Math.random(); // Fallback for mock testing
//         const barHeight = volume * canvas.height;

//         ctx.fillStyle = `rgba(0, 255, 255, ${0.5 + 0.5 * volume})`;
//         ctx.fillRect(index * 10, canvas.height - barHeight, 8, barHeight);
//       });

//       animationFrameId = requestAnimationFrame(drawWaveform);
//     };

//     drawWaveform();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [localAudioTrack, remoteAudioTracks, mutedTracks]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width="400"
//       height="100"
//       style={{ background: "black", display: "block", margin: "0 auto" }}
//     />
//   );
// };

// export default WaveformVisualizer;

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
          <div key={index} className="flex-1">
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
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default WaveformVisualizer;
