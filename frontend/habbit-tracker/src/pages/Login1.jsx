import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import api from '../lib/api'


export function Login1() {
    const [signup, setSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    function handleSignupClick(e) {
        e.preventDefault();
        setSignUp(!signup);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let newPost = {};

            if (!signup) {
                newPost = {
                    email,
                    password
                };
            } else {
                newPost = {
                    username,
                    email,
                    password
                };
            }

            const url = signup ? "/auth/register" : "/auth/login";

            const response = await api.post(url, newPost);

            // Save token (make sure backend sends it)
            localStorage.setItem("token", response.data.token);

            setResponseMessage("Login Successful!");

            // Navigate ONLY after success
            navigate("/habits");

        } catch (err) {
            setResponseMessage("Error logging in!");
            console.log(err);
        }
    };

    return (

        <div className="flex items-center justify-center h-screen">
            <Card className="min-w-md">


                <CardHeader>
                    <CardTitle>{signup ? "Sign Up" : "Login to your account"}</CardTitle>

                    <CardAction>
                        <Button variant="link" onClick={handleSignupClick}>Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>

                        {signup && (<div className="flex flex-col gap-6">
                            <div className="grid gap-2 mb-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>)}





                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleSubmit}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                        window.location.href = "http://localhost:3000/auth/google";
                    }}>
                        Login with Google
                    </Button>
                </CardFooter>
                <div>
                    {responseMessage}
                </div>
            </Card>
        </div>





    )
}
