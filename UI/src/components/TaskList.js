import React, { useState, useEffect } from 'react'
import Task from '../models/Task'
// import { getTasks } from '../services/api';
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  async function getTasks () {
    const response = await axios.post('http://127.0.0.1:8000/api/list')
    const responseData = response.data.data
    setTasks(responseData)
  }
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <h2>Task List</h2>
      <ul>
        {tasks.length ? (
          tasks.map((item, index) => (
            <li key={index + 1}>
              <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{item.status}</div>
              <div>{item.deadline}</div>
            </li>
          ))
        ) : (
          <h1 className='text-center'>Task Not Found !!!</h1>
        )}
      </ul>
    </>
  )
}

export default TaskList
