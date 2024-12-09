import { MUINavBar } from '../components/MUINavBar'
import Container from '@mui/material/Container';
import BooksAudio from '../components/BooksAudio'

function Books() {
  return (
    <>
    <MUINavBar />
    <Container maxWidth="full" maxHeight="full" style={{backgroundColor: "#f6f6f6"}}>
      <div className='News'>
        <BooksAudio />
      </div>
    </Container>
    </>

  )
}

export default Books