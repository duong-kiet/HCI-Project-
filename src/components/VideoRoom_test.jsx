import React, { useEffect, useState } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'fc425cf184b043409d4f7a10e775555a';
const TOKEN = '007eJxTYJg+tfjHpAzG0MRfJ5UztzksaM79GjY/nzu8dXeOkObXUxIKDGnJJkamyWmGFiZJBibGJgaWKSZp5omGBqnm5qZAkHhdtCC1IZCRYXtCDgMjFIL4zAzlKVkMDAAhRh5q';
const CHANNEL = 'wdj';

const createAgoraClient = ({ onVideoTrack, onUserDisconnected }) => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  let tracks;

  const connect = async () => {
    const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);

    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'video') onVideoTrack(user);
    });

    client.on('user-left', (user) => onUserDisconnected(user));

    tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    await client.publish(tracks);

    return { tracks, uid };
  };

  const disconnect = async () => {
    client.removeAllListeners();
    for (const track of tracks) {
      track.stop();
      track.close();
    }
    await client.unpublish(tracks);
    await client.leave();
  };

  return { connect, disconnect };
};

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const onVideoTrack = (user) => {
      setUsers((prev) => [...prev, user]);
    };

    const onUserDisconnected = (user) => {
      setUsers((prev) => prev.filter((u) => u.uid !== user.uid));
    };
    // User identifier

    const { connect, disconnect } = createAgoraClient({
      onVideoTrack,
      onUserDisconnected,
    });

    const setup = async () => {
      const { tracks, uid } = await connect();
      setUid(uid);
      setUsers((prev) => [...prev, { uid, audioTrack: tracks[0], videoTrack: tracks[1] }]);
    };

    const cleanup = async () => {
      await disconnect();
      setUid(null);
      setUsers([]);
    };

    setup();

    return cleanup;
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          gridTemplateColumns: 'repeat(2, 750px)',
          padding: 40,
          gridGap: '40px',
          display: 'grid',
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
