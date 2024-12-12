import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserSelect from "./pages/UserSelect";
import Protected from "./pages/Protected";
import Homepage from "./pages/Homepage";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Music from "./pages/Music";
import VoiceChat from "./pages/VoiceChat";
import Sports from "./pages/Sports";
import Education from "./pages/Education";
import Books from "./pages/Books";
import Radio from "./pages/Radio";
import SignUp from "./pages/SignUp";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} /> {/* OK */}
      <Route path="/user-select" element={<UserSelect />} /> {/* OK */}
      <Route path="/login" element={<Login />} /> {/* OK */}
      <Route path="/home-page" element={<Homepage />} /> {/* OK */}
      <Route path="/protected" element={<Protected />} /> {/* OK */}
      <Route path="/news" element={<News />} /> {/* OK */}
      <Route path="/voice-chat" element={<VoiceChat />} /> {/* OK */}
      <Route path="/profile" element={<Profile />} /> {/* OK */}
      {/* <Route path="/music" element={<Sports />} /> */}
      <Route path="/music" element={<Radio />} />
      {/* <Route path="/Education" element={<Education />} /> */}
      <Route path="/books" element={<Books />} /> {/* OK */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signup" element={<SignUp />} />
      {/* </Route> */}
    </>
  ),
  // { basename: import.meta.env.DEV ? "/" : "/react-face-auth/" }
  { basename: "/" }
);

export default router;
