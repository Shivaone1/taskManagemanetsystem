import React, { useState } from 'react';
// import { createTask } from '../services/api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const taskData = { title, description, status, deadline };
    // await createTask(taskData);
    // // Reset form fields
    // setTitle('');
    // setDescription('');
    // setStatus('');
    // setDeadline('');
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <input type="date" placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
