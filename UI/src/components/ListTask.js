import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ListTask () {
  const [tasks, setTasks] = useState([])

  async function getTasks () {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/list')
      const responseData = response.data.data
      setTasks(responseData)
    } catch (error) {
      toast.error('Failed to fetch tasks.')
    }
  }

  async function deleteTask (id, title) {
    try {
      if (
        window.confirm(`Are you sure you want to delete category ${title} ?`)
      ) {
        await axios.post(`http://127.0.0.1:8000/api/user/delete/`, {
          task_id: id
        })
        getTasks()
        toast.error(`${title} Delete Successfully!!!`)
      }
    } catch (error) {
      toast.error("Can't Delete This Time", error)
    }
  }
  //   function editTask (id) {
  //     toast.success(`Task Update Successfully!!!`, id)
  //   }
  useEffect(() => {
    getTasks()
  }, [tasks.length])

  return (
    <>
      <h2 className='text-center'>Task List</h2>
      <div className='table table-responsive'>
        <table className='table' id='dataTable' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length ? (
              tasks.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.title ? item.title : ''}</td>
                  <td>{item.status ? item.status : ''}</td>
                  <td>{item.deadline ? item.deadline : ''}</td>
                  <td>{item.description ? item.description : ''}</td>
                  <td>
                  <a
  href={`/edit-task?task_id=${item.id}`}
  className='btn btn-success'
>
  Edit
</a>

                    <a
                      onClick={() => deleteTask(item.id, item.title)}
                      className='btn btn-danger'
                    >
                      <i className='fa fa-trash-alt'></i>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center'>
                  Task Not Found !!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
