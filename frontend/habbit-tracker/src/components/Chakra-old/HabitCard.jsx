import React, { useEffect, useState } from "react";
import axios from "axios";
import Check from "./Check";
import UpdateCard from "../UpdateCard"
import HabitForm from './HabitForm'


import { Card, Heading, Stack, Flex, Button } from "@chakra-ui/react";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const HabitCard = () => {
  // IMPORTANT: correct initial shape
  const [data, setData] = useState({
    habits: [],
    dates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await api.get("api/habits/overview");
      setData({
        habits: res.data.habits || [],
        dates: res.data.dates || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);



  // DELETE HABIT
  const handleDelete = async (habitId) => {
    try {
      await api.delete(`api/habits/${habitId}`);

      setData((prev) => ({
        ...prev,
        habits: prev.habits.filter(
          (habit) => habit.habitId !== habitId
        ),
      }));
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>

      <Stack>

        <div>
          <div className="cursor-target relative">

            <HabitForm fetchOverview={fetchOverview} />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 ">
          {data.habits.map((habit) => (
            <div key={habit.habitId} className="cursor-target">
              <Card.Root
                size="lg"
                minW={100}
                className="
          w-full 
          max-w-xl 
          p-10
          rounded-2xl 
          bg-white 
          shadow-md 
          border border-gray-200
          transition-all duration-300
          hover:shadow-xl hover:-translate-y-1
        "
              >
                <Card.Header className="mb-4">
                  <Heading
                    size="lg"
                    className="text-3xl font-semibold tracking-tight"
                  >
                    {habit.title}
                  </Heading>
                </Card.Header>

                <Card.Body
                  color="fg.muted"
                  className="text-gray-600 text-base leading-relaxed"
                >
                  <Flex >
                    <Check
                      logs={habit.logs}
                      habitId={habit.habitId}
                    />

                    <Stack ml={3} >
                      <UpdateCard />

                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(habit.habitId)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Flex>
                </Card.Body>
              </Card.Root>
            </div>
          ))}
        </div>
      </Stack>


    </>

  );
};

export default HabitCard;
