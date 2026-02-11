import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div>

      <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight">
        Build Habits.
      </h1>
      <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight">
        One day at a time.
      </h1>

      <h2 className="text-xl text-muted-foreground max-w-3xl mt-3">
        Master your routine with a distraction-free habit tracker designed for peak productivity and long-term behavioral change.
      </h2>

      <Button variant="" onClick={handleClick} className=" text-white text-xl mt-3" >Get Started </Button>




    </div>
  )
}

export default LandingPage
