import React, { useState, useEffect } from "react"
import axios from "axios"
import { Checkbox } from "@/components/ui/checkbox"

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})

const Check1 = ({ logs = {}, habitId }) => {
  const [log, setLogs] = useState(logs)
  const [loadingDate, setLoadingDate] = useState(null)

  useEffect(() => {
    setLogs(logs || {})
  }, [logs])

  const toggleLog = async (date, newStatus) => {
    setLogs((prev) => ({
      ...prev,
      [date]: newStatus,
    }))

    setLoadingDate(date)

    try {
      await api.patch(`/api/habits/${habitId}/log`, { date })
    } catch (err) {
      console.error("Failed to update habit log", err)

      setLogs((prev) => ({
        ...prev,
        [date]: !newStatus,
      }))
    } finally {
      setLoadingDate(null)
    }
  }

  return (
    <div className="flex gap-3">
      {Object.entries(log).map(([date, checked]) => {
        const day = date.split("-")[2]

        return (
          <div
            key={date}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs text-muted-foreground">
              {day}
            </span>

            <Checkbox
              checked={checked}
              disabled={loadingDate === date}
              onCheckedChange={(value) =>
                toggleLog(date, Boolean(value))
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default Check1
