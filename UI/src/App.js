import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Index from './components';
import Dashboard from './components/Dashboard';
import Error from './Error';
import ListTask from './components/ListTask';
import AddTask from './components/AddTask';


const App = () => {
  return (
    <>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Index />} />
                    
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path="/Dashboard" element={localStorage.getItem("login")?<Dashboard/>:<Login />}/>
          <Route path="/add-task" element={localStorage.getItem("login")?<AddTask/>:<Login />}/>
          <Route path="/list-task" element={localStorage.getItem("login")?<ListTask/>:<Login />}/>
          
          <Route path="/*" element={<Error />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      
    </>
  )
}

export default App
