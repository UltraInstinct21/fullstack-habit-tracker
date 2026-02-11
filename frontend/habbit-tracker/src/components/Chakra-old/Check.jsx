import React, { useState } from 'react'
import { Checkbox, HStack, Stack } from "@chakra-ui/react"

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

const Check = ({ logs, habitId }) => {
    const [log, setLogs] = useState(logs);
    const [loadingDate, setLoadingDate] = useState(null);

    const toggleLog = async (date, newStatus) => {
        // optimistic UI update
        setLogs((prev) => ({
            ...prev,
            [date]: newStatus,
        }));

        setLoadingDate(date);

        try {
            await api.patch(`/api/habits/${habitId}/log`, {
                date,
            });
        } catch (err) {
            console.error("Failed to update habit log", err);

            // rollback if request fails
            setLogs((prev) => ({
                ...prev,
                [date]: !newStatus,
            }));
        } finally {
            setLoadingDate(null);
        }
    };

    return (
        <HStack gap="3">
            {Object.entries(log).map(([date, checked]) => {
                const day = date.split("-")[2];

                return (
                    <Checkbox.Root size='lg' colorPalette= "green"
                        key={date}
                        checked={checked}
                        disabled={loadingDate === date}
                        onCheckedChange={(e) =>
                            toggleLog(date, !!e.checked)
                        }
                    >
                        <Stack className="items-center">

                            <Checkbox.Label className="text-xs text-gray-500">
                                {day}
                            </Checkbox.Label>

                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                        </Stack>
                    </Checkbox.Root>
                );
            })}
        </HStack>
    );
};


export default Check
