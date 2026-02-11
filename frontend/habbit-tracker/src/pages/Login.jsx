import { useState } from "react";
import { Activity } from 'react';
import axios from "axios";
import { Button, Card, Field, Input, Stack, Text, AbsoluteCenter, Box } from "@chakra-ui/react"

import {
    PasswordInput,
    PasswordStrengthMeter,
} from "@/components/ui/password-input"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});


function Login() {

    const [signup, setSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleSignupClick(e) {
        e.preventDefault();
        setSignUp(!signup);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let newPost = {}

        if (!signup) {
            newPost = {
                email: email,
                password: password

            };
        }

        else {
            newPost = {
                username: username,
                email: email,
                password: password

            };
        }

        const url = signup ? "/auth/register" : "/auth/login";
        // Make POST request to send data
        api
            .post(url, newPost)
            .then((response) => {
                setResponseMessage("Post created successfully!");
            })
            .catch((err) => {
                setResponseMessage("Error creating post");
            });
    };

    return (
       
        <Box >
            <AbsoluteCenter>        <Card.Root maxW="md">
                <Card.Header>
                    <Card.Title>{signup ? "Sign Up" : "Sign In"}</Card.Title>
                </Card.Header>

                <Card.Body>
                    <Stack gap="4" w="full">

                        {signup && (
                            <Field.Root>
                                <Field.Label>Username</Field.Label>
                                <Input
                                    placeholder="Username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Field.Root>
                        )}

                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <PasswordInput placeholder="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)} />

                        </Field.Root>



                        <Text fontSize="sm">
                            {signup ? (
                                <>
                                    Already have an account?
                                    <Text
                                        as="span"
                                        color="blue.500"
                                        cursor="pointer"
                                        ml="1"
                                        onClick={handleSignupClick}
                                    >
                                        Sign In
                                    </Text>
                                </>
                            ) : (
                                <>
                                    Don&apos;t have an account?
                                    <Text
                                        as="span"
                                        color="blue.500"
                                        cursor="pointer"
                                        ml="1"
                                        onClick={handleSignupClick}
                                    >
                                        Sign Up
                                    </Text>
                                </>
                            )}
                        </Text>

                    </Stack>
                </Card.Body>

                <Card.Footer justifyContent="flex-end">
                    <Button variant="solid" onClick={handleSubmit}>
                        {signup ? "Sign Up" : "Sign In"}
                    </Button>
                </Card.Footer>
            </Card.Root></AbsoluteCenter>
        </Box>

    );
}


export default Login;