import { MUINavBar } from '../components/MUINavBar'
import {useEffect} from "react";
import Newspaper from "../components/Newspaper";
import Container from '@mui/material/Container';
import './News.css'
// import SpeechReg from '../components/SpeechReg';
// import VolumeSetting from '../components/Volume';

function News() {
  return (
    <>
      <MUINavBar />
      {/* <SpeechReg />
      <VolumeSetting /> */}

      <Container maxWidth="full" maxHeight="full" style={{ backgroundColor: "#f6f6f6" }}>
        <div className='News'>
          <Newspaper />
        </div>
      </Container>
    </>

  )
}

export default News