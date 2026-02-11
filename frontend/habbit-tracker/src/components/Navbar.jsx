import React, { useState, useEffect } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [dayOfWeek, setDayOfWeek] = useState("")
  const [currentDate, setCurrentDate] = useState("")

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

  return (
    <nav className="flex items-center justify-between px-4 py-3">
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Center spacer */}
      <div className="flex-1" />

      {/* Date */}
      <div className="flex items-center gap-4">
        <h1 className="text-md font-semibold">
          {dayOfWeek}, {currentDate}
        </h1>

        <Avatar>
          <AvatarFallback>
            SR
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}

export default Navbar
