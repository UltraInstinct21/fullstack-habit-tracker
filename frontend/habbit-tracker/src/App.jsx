
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"
import Home from './pages/Home';
import { Login1 } from './pages/Login1';
import Squares from './components/Squares';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/Protected'

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
                  <Route path="/" element={<LandingPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/habits" element={<Home />} />
                  </Route>
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


