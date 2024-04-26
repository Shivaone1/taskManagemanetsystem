import React from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

const App = () => {
  return (
    <>
      <h1 className='text-center text-info-emphasis'>Task Management System</h1>
      <div className='row'>
        <div className='col-md-6'>
          <TaskForm />
        </div>
        <div className='col-md-6'>
          <TaskList />
        </div>
      </div>
    </>
  )
}

export default App
