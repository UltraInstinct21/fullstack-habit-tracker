
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"
import Login from './pages/Login.jsx'
import HabitForm from './components/Chakra-old/HabitForm.jsx'
import HabitCard from './components/Chakra-old/HabitCard.jsx';
import Check from './components/Chakra-old/Check';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DetailedCard from './components/UpdateCard';
import { Login1 } from './pages/Login1';
import Check1 from './components/Check1';
import HabitCard1 from './components/HabitCard1';
import HabitForm1 from './components/HabitForm1';
import Squares from './components/Squares';
import LandingPage from './pages/LandingPage';

function App() {


  return (
    <div className="w-full h-screen relative flex justify-center items-center">

      {/* Background effect */}
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#271E37"
          hoverColor="#00ACFF"
        />
      </div>

      {/* Foreground content */}
      <div className="absolute flex flex-col justify-center items-center">
        <ThemeProvider defaultTheme="dark">
          <div className="relative z-10 min-h-screen">
            <div className="relative z-10 min-h-screen">
              <Router>
                <Routes>
                  <Route path="/login" element={<Login1 />} />
                  <Route path="/" element={<LandingPage/>} />
                  <Route path="/habits" element={<Home />} />
                  <Route path="/create-habit" element={<HabitForm1 />} />
                </Routes>
              </Router>
            </div>
          </div>
        </ThemeProvider>
      </div>

    </div>
  )
}

export default App


