import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

export default function EditTask() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const task_id = params.get('task_id');
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');

  async function getTask() {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/view/', {
        task_id: task_id
      });
      const responseData = response.data.data;
      setTask(responseData[0]); // Assuming you only expect one task
    } catch (error) {
      toast.error('Failed to fetch task.');
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'deadline':
        setDeadline(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/update', {
        task_id: task.id,
        title: title,
        description: description,
        status: status,
        deadline: deadline
      });
      if (response.data.status === true) {
        toast.success(response.data.message);
        setTitle('');
        setDescription('');
        setStatus('');
        setDeadline('');
      } else {
        toast.error(response.data.message || 'Failed to update task');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  if (!task) return null; 

  return (
    <div className='form-group'>
      <div className='container'>
        <h2 className='text-center'>Update Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Task Title</label>
          <input
            className='form-control my-3'
            id='title'
            type='text'
            name='title'
            placeholder='Title'
            value={title || task.title}
            onChange={handleChange}
          />
          <label htmlFor='description'>Task Description</label>
          <textarea
            className='form-control my-3'
            id='description'
            name='description'
            placeholder='Description'
            value={description || task.description}
            onChange={handleChange}
          />
          <label htmlFor='status'>Task Status</label>
          <input
            className='form-control my-3'
            id='status'
            type='text'
            name='status'
            placeholder='Status'
            value={status || task.status}
            onChange={handleChange}
          />
          <label htmlFor='deadline'>Task Deadline</label>
          <input
            className='form-control my-3'
            id='deadline'
            type='date'
            name='deadline'
            placeholder='Deadline'
            value={deadline || task.deadline}
            onChange={handleChange}
          />
          <button type='submit' className='form-control btn btn-success my-2'>
            Update Task
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
