import "./App.css";
import { Route, Routes ,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Home1 from "./components/HOME1";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";

function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={user ?<><Showcase/><hr /><Home1 /> <Footer /></> : <Navigate to='/login' />}></Route>
        <Route path="/about" element={<><About /> <Footer /></>}></Route>
        <Route path="/contact-us" element={<><ContactUs /> <Footer /></>}></Route>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}></Route>
      </Routes>
    </div> 
  );
}

export default App;
