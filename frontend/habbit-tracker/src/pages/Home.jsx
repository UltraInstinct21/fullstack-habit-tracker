import HabitCard1 from '@/components/HabitCard1'
import Navbar from '@/components/Navbar'

import { ChakraProvider } from "@chakra-ui/react"

import React from 'react'

const Home = () => {
  return (
    <div>
      
        <Navbar />
        <HabitCard1/>
      
    </div>
  )
}

export default Home
