import { MUINavBar } from '../components/MUINavBar';
import React, { createContext, useEffect, useState } from "react";
import RadioVideos from "../components/RadioVideos";
import Container from '@mui/material/Container';
import './News.css';
// import SpeechReg from '../components/SpeechReg';
// import VolumeSetting from '../components/Volume';
import RadioAudio from '../assets/mp3/Radio.mp3';

function Radio() {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handleAudio = () => {
    const audio = new Audio(RadioAudio);
    audio.play();
  }

  useEffect(() => {
    handleAudio();
  }, []);

  return (
    <>
      <MUINavBar />
      {/* <SpeechReg />
      <VolumeSetting /> */}

      <Container maxWidth="full" maxHeight="full" style={{
        backgroundColor: "#f6f6f6",
        padding: "50px"
      }}>
        <div className='News'>
          <RadioVideos setCurrentAudio={setCurrentAudio} currentAudio={currentAudio} />
        </div>
      </Container>
    </>
  )
}

export default Radio;