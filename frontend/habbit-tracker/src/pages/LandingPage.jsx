import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">Momentum</h1>
          </div>

          {/* Get Started Button */}
          <Button
            onClick={handleClick}
            className="text-white text-sm sm:text-base"
            size="default"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Visual Element */}
          <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl border border-border flex items-center justify-center relative overflow-hidden">
            {/* <img 
              src="/svg-ai-create-a-minimalist-svg-logo-for-a-modern-habit-tr-2026-02-16.svg" 
              alt="Momentum Habit Tracker" 
              className="w-full h-full p-8 object-contain"
            /> */}

            {/* Left Side - Visual Element */}
            <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl border border-border flex items-center justify-center relative overflow-hidden">

              <svg
                viewBox="0 0 100 100"
                className="w-80 h-80 text-primary "
                fill="none"
              >
                {/* Outer Instrument Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="60 15 10 5"
                />

                {/* Momentum Growth Wave */}
                <path
                  d="M15 70 L35 30 L50 55 L65 25 L85 70"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

           
            </div>

          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="scroll-m-20 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                Build Habits.
              </h1>
              <h1 className="scroll-m-20 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                One day at a time.
              </h1>
            </div>

            <h2 className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Master your routine with a distraction-free habit tracker designed for peak productivity and long-term behavioral change.
            </h2>

            <Button
              onClick={handleClick}
              className="text-white text-lg py-6 px-8 sm:py-7 sm:px-10 h-auto"
              size="lg"
            >
              Get Started
            </Button>

            {/* Stats or Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">Free to use</p>

              </div>
              <div>
                <p className="text-3xl font-bold">365</p>
                <p className="text-sm text-muted-foreground">Days to change</p>
              </div>
              <div>
                <p className="text-3xl font-bold">∞</p>
                <p className="text-sm text-muted-foreground">Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
