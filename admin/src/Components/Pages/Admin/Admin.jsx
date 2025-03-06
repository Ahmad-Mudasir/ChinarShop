import React from 'react'
import "./Admin.css"
import Sidebar from '../../Sidebar/Sidebar'
import {  Route, Routes } from 'react-router-dom';
import Addproduct from '../../Addproduct/Addproduct';
import Listproduct from '../../Listproduct/Listproduct';
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      
      <Routes>
              <Route path="/add-product" element={<Addproduct/>} />
              <Route path="/list-product" element={<Listproduct/>} />
            </Routes>
      </div>
  )
}

export default Admin