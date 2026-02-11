import React, { useState } from "react"
import axios from "axios"

import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

const HabitForm1 = ({ fetchOverview }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [responseMessage, setResponseMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newHabit = {
            title,
            description,
        }

        try {
            await api.post("/api/habits", newHabit)
            setResponseMessage("Post created successfully!")
            fetchOverview()
        } catch (err) {
            console.error(err)
            setResponseMessage("Error creating post")
        }
    }

    return (
        <Drawer>
           <DrawerTrigger asChild>
  <Button size="sm">
    Create Habit
  </Button>
</DrawerTrigger>



            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create Habit</DrawerTitle>
                </DrawerHeader>

                <form
                    onSubmit={handleSubmit}
                    className="px-4 space-y-4"
                >
                    <div className="space-y-2">
                        <Label>Habit Title</Label>
                        <Input
                            placeholder="Habit title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            placeholder="Give your habit a small description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </div>

                    {responseMessage && (
                        <p className="text-sm text-muted-foreground">
                            {responseMessage}
                        </p>
                    )}

                    <DrawerFooter className="flex justify-end gap-2">
                        <DrawerClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DrawerClose>

                        <Button type="submit">
                            Save
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}

export default HabitForm1
