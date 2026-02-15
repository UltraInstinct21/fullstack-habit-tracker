import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

const Navbar = () => {
  const [dayOfWeek, setDayOfWeek] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const today = new Date()

    const dayString = today.toLocaleDateString(undefined, {
      weekday: "long",
    })

    const dateString = today.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    })

    setDayOfWeek(dayString)
    setCurrentDate(dateString)
  }, [])

const handleLogout = async () => {
  try {
    await api.post(
      "/auth/logout",
      {},
      { withCredentials: true } // important if using cookies
    )
  } catch (err) {
    console.log("Logout API failed, continuing anyway...")
  }

  // Clear client-side auth completely
  localStorage.removeItem("token")
  sessionStorage.clear()

  // Hard redirect (most reliable)
  window.location.href = "/login"
}


  return (
    <nav className="w-full h-16 px-4 md:px-8 flex items-center justify-between border-b bg-background shadow-sm">

      {/* Left Section (App Name Optional) */}
      <div className="flex items-center">
        <h2 className="text-lg font-bold tracking-tight hidden sm:block">
          Momentum
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Date (Hidden on very small screens) */}
        <h1 className="text-sm md:text-md font-semibold hidden sm:block">
          {dayOfWeek}, {currentDate}
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 rounded-full">
              <Avatar>
                <AvatarFallback>
                  SR
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/billing")}>
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
