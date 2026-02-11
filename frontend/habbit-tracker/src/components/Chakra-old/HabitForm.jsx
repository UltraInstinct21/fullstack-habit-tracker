import React, { useState } from 'react'
import axios from 'axios'
import {
  Button, Card, Field, Input, Stack, CloseButton,
  Drawer,
  For,
  HStack,
  Portal
} from "@chakra-ui/react"

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});
import fetchOverview from './HabitCard'

const HabitForm = ({ fetchOverview }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault();

    let newHabit = {
      title: title,
      description: description
    }



    // Make POST request to send data
    api
      .post('/api/habits', newHabit)
      .then((response) => {
        setResponseMessage("Post created successfully!");
        fetchOverview();
      })
      .catch((err) => {
        console.log(err)
        setResponseMessage("Error creating post");
      });
  }


  return (
    <>
      {/* <h1>Create Habit</h1><br />
            <form >
                <input type="text" name="title" placeholder='title' onChange={(e) => setTitle(e.target.value)} /><br />
                <input type="text" name="description" placeholder='description' onChange={(e) => setDescription(e.target.value)} /><br />
                <button type='submit' onClick={handleSubmit}>Submit</button>

                

            </form> */}


      <Drawer.Root placement='bottom' className='max-w-2xl'>
        <Drawer.Trigger asChild>
          <Button variant="solid" size="md" className=''>
            Create Habit
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <div className='lex items-center justify-center h-screen max-w-1/4'>
            <Drawer.Positioner padding=""  >
              <Drawer.Content rounded="md">
                <Drawer.Header>
                  <Drawer.Title>Create Habit</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>

                  <Stack gap="4" w="full">
                    <Field.Root>
                      <Field.Label>Habit Title</Field.Label>
                      <Input placeholder='Habit title' onChange={(e) => setTitle(e.target.value)} />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Description</Field.Label>
                      <Input placeholder='Give your habit a small description' onChange={(e) => setDescription(e.target.value)} />
                    </Field.Root>
                  </Stack>

                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <HStack justify="flex-end" w="full">
                      <Button variant="outline">
                        Cancel
                      </Button>

                      <Button onClick={handleSubmit}>
                        Save
                      </Button>
                    </HStack>
                  </Drawer.CloseTrigger>
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </div>
        </Portal>
      </Drawer.Root>




    </>
  )
}

export default HabitForm
