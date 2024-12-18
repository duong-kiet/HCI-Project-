import { MUINavBar } from '../components/MUINavBar'
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {NewsContextProvider } from "../NewsContext";
import Newspaper from "../components/Newspaper";
import Container from '@mui/material/Container';
import './News.css'
import SpeechReg from '../components/SpeechReg';
import { NavBarNews } from '../components/NavBarNews';
import VolumeSetting from '../components/Volume';
// import SportsVideos from '../components/SportsVideos';

import Sport from '../assets/mp3/Sport.mp3';

function Sports() {
  return (
    <>
    <MUINavBar />
    <VolumeSetting />
    
    <Container maxWidth="full" maxHeight="full" style={{backgroundColor: "#f6f6f6"}}>
      <div className='News'>
        <SportsVideos />
      </div>
    </Container>
    </>

  )
}

export default Sports