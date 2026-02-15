import React, { useEffect, useState } from "react"
import axios from "axios"
import TargetCursor from "./TargetCursor"

import Check1 from "./Check1"
import UpdateCard from "./UpdateCard"
import HabitForm1 from "./HabitForm1"
import Squares from './Squares';
import TextType from '../components/TypeText';

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import api from '../lib/api'


const HabitCard = () => {
    const [data, setData] = useState({
        habits: [],
        dates: [],
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchOverview = async () => {
        try {
            setLoading(true)
            const res = await api.get("/api/habits/overview")

            setData({
                habits: res.data.habits || [],
                dates: res.data.dates || [],
            })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOverview()
    }, [])

    // DELETE HABIT
    const handleDelete = async (habitId) => {
        try {
            await api.delete(`/api/habits/${habitId}`)

            setData((prev) => ({
                ...prev,
                habits: prev.habits.filter(
                    (habit) => habit.habitId !== habitId
                ),
            }))
        } catch (err) {
            console.error("Error deleting habit:", err)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor
                parallaxOn
                hoverDuration={0.2}
            />



            <div className="flex items-center justify-between">
                {/* Left text */}
                <div className="flex flex-col gap-1 mb-2 min-w-2/3">
                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
                        <TextType
                            text={["YOUR DASHBOARD", "Consistency is the key to master."]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor
                            cursorCharacter="_"

                            deletingSpeed={50}
                            variableSpeedEnabled
                            variableSpeedMin={60}
                            variableSpeedMax={120}
                            cursorBlinkDuration={0.5}
                        />

                    </h1>
                </div>

                {/* Right button */}
                <div className="cursor-target mr-2">
                    <HabitForm1 fetchOverview={fetchOverview} />
                </div>
            </div>







            {/* Habit Grid */}
            <div className="grid grid-cols-5 gap-4">
                {data.habits.map((habit) => (
                    <div key={habit.habitId} className="cursor-target">
                        <Card
                            className="
                w-full
                max-w-xl
                p-6
                
                
              "
                        >
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-semibold tracking-tight">
                                    {habit.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {habit.description}
                                </p>
                            </CardHeader>

                            <CardContent className="flex gap-4">
                                

                                <Check1
                                    logs={habit.logs}
                                    habitId={habit.habitId}
                                />

                                <div className="flex flex-col gap-2">
                                    <UpdateCard habitId={habit.habitId} fetchOverview={fetchOverview} />

                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(habit.habitId)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>




        </>
    )
}

export default HabitCard
