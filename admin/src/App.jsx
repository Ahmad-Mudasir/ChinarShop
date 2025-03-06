import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Components/Pages/Admin/Admin'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Navbar />
      <Admin />
      <Toaster />
    </div>
  )
}

export default App