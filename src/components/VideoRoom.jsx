// import React, { useEffect, useState } from 'react';
// // import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
// // import * as AgoraRTC from "agora-rtc-sdk-ng";
// import AgoraRTC from "agora-rtc-sdk-ng";
// // const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
// import { VideoPlayer } from './VideoPlayer';

// const APP_ID = 'fc425cf184b043409d4f7a10e775555a';
// const TOKEN =
//   '007eJxTYJg+tfjHpAzG0MRfJ5UztzksaM79GjY/nzu8dXeOkObXUxIKDGnJJkamyWmGFiZJBibGJgaWKSZp5omGBqnm5qZAkHhdtCC1IZCRYXtCDgMjFIL4zAzlKVkMDAAhRh5q';
// const CHANNEL = 'wdj';

// // AgoraRTC.setLogLevel(4);

// let agoraCommandQueue = Promise.resolve();

// const createAgoraClient = ({
//   onVideoTrack,
//   onUserDisconnected,
// }) => {
//   const client = AgoraRTC.createClient({
//     mode: 'rtc',
//     codec: 'vp8',
//   });

//   let tracks;

//   const waitForConnectionState = (connectionState) => {
//     return new Promise((resolve) => {
//       const interval = setInterval(() => {
//         if (client.connectionState === connectionState) {
//           clearInterval(interval);
//           resolve();
//         }
//       }, 200);
//     });
//   };

//   const connect = async () => {
//     await waitForConnectionState('DISCONNECTED');

//     const uid = await client.join(
//       APP_ID,
//       CHANNEL,
//       TOKEN,
//       null
//     );

//     client.on('user-published', (user, mediaType) => {
//       client.subscribe(user, mediaType).then(() => {
//         if (mediaType === 'video') {
//           onVideoTrack(user);
//         }
//       });
//     });

//     client.on('user-left', (user) => {
//       onUserDisconnected(user);
//     });

//     tracks =
//       await AgoraRTC.createMicrophoneAndCameraTracks();

//     await client.publish(tracks);

//     return {
//       tracks,
//       uid,
//     };
//   };

//   const disconnect = async () => {
//     await waitForConnectionState('CONNECTED');
//     client.removeAllListeners();
//     for (let track of tracks) {
//       track.stop();
//       track.close();
//     }
//     await client.unpublish(tracks);
//     await client.leave();
//   };

//   return {
//     disconnect,
//     connect,
//   };
// };

// export const VideoRoom = () => {
//   const [users, setUsers] = useState([]);
//   const [uid, setUid] = useState(null);

//   useEffect(() => {
//     const onVideoTrack = (user) => {
//       setUsers((previousUsers) => [...previousUsers, user]);
//     };

//     const onUserDisconnected = (user) => {
//       setUsers((previousUsers) =>
//         previousUsers.filter((u) => u.uid !== user.uid)
//       );
//     };

//     const { connect, disconnect } = createAgoraClient({
//       onVideoTrack,
//       onUserDisconnected,
//     });

//     const setup = async () => {
//       const { tracks, uid } = await connect();
//       setUid(uid);
//       setUsers((previousUsers) => [
//         ...previousUsers,
//         {
//           uid,
//           audioTrack: tracks[0],
//           videoTrack: tracks[1],
//         },
//       ]);
//     };

//     const cleanup = async () => {
//       await disconnect();
//       setUid(null);
//       setUsers([]);
//     };

//     setup();
//     agoraCommandQueue = agoraCommandQueue.then(setup);

//     return () => {
//       cleanup();
//       agoraCommandQueue = agoraCommandQueue.then(cleanup);
//     };
//   }, []);

//   return (
//     <>
      
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//         }}
//       >
//         <div
//           style={{
//             paddingTop: 20,
//             display: 'grid',
//             gridTemplateColumns: 'repeat(2, 750px)',
//             padding: 40,
//             grid: 'auto / auto auto auto',
//             gridGap: '40px',
//             display: 'flex',
//           }}
//         >
//           {users.map((user) => (
//             <VideoPlayer key={user.uid} user={user} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { VideoPlayer } from './VideoPlayer';

// const APP_ID = "c8cbee22dffb4dca8e770a51bd2c6b60";
// const CHANNEL = "123";
// const TOKEN = "007eJxTYPj5M/zyxyz5QLM5DVwB0/8+CPScO235dLWZ858rn9mVPa1GgSHZIjkpNdXIKCUtLckkJTnRItXc3CDR1DApxSjZLMnMYFKobXpDICODXZQGMyMDBIL4zAyGRsYMDADnNCAk";

// export const VideoRoom = () => {
//   const [users, setUsers] = useState([]); // Quản lý danh sách người dùng
//   const [localTrack, setLocalTrack] = useState(null); // Lưu trữ local track
//   const [rtcClient, setRtcClient] = useState(null); // RTC client

//   // Hàm để join channel
//   const joinChannel = async () => {
//     const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//     setRtcClient(client);

//     client.on("user-published", async (user, mediaType) => {
//       await client.subscribe(user, mediaType);
//       console.log("Subscribe success");

//       if (mediaType === "video" || mediaType === "audio") {
//         setUsers((prevUsers) => [...prevUsers, user]);
//       }
//     });

//     client.on("user-unpublished", (user) => {
//       setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
//     });

//     await client.join(APP_ID, CHANNEL, TOKEN, null);

//     // Tạo local track và publish
//     const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
//     setLocalTrack({ audioTrack: microphoneTrack, videoTrack: cameraTrack });

//     await client.publish([microphoneTrack, cameraTrack]);
//     console.log("Publish success");
//   };

//   // Hàm để leave channel
//   const leaveChannel = async () => {
//     if (localTrack) {
//       localTrack.audioTrack?.close();
//       localTrack.videoTrack?.close();
//     }
//     await rtcClient?.leave();
//     setUsers([]);
//     console.log("Left the channel");
//   };

//   // Cleanup khi component unmount
//   useEffect(() => {
//     return () => {
//       leaveChannel();
//     };
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <div
//         style={{
//           gridTemplateColumns: 'repeat(2, 750px)',
//           padding: 40,
//           gridGap: '40px',
//           display: 'grid',
//         }}
//       >
//         {users.map((user) => (
//           <VideoPlayer key={user.uid} user={user} />
//         ))}
//       </div>
//       <div>
//         <button onClick={joinChannel}>Join</button>
//         <button onClick={leaveChannel}>Leave</button>
//       </div>
//     </div>
//   );
// };
