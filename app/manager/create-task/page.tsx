'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/createtask.module.css';

export default function CreateTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // Handle task submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    try {
      const response = await fetch(`${apiUrl}/tasks/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      // On successful task creation, redirect to manager dashboard
      alert('Task created successfully!');
      router.push('/manager/dashboard');  // Redirect to manager dashboard
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.greeting}>Create a New Task</div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.createTaskForm}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit" className={styles.submitButton}>Create Task</button>
        </form>
      </div>

      <button onClick={() => router.push('/login')} className={styles.cancelButton}>Cancel</button>
      <button
        onClick={() => {
          alert('You have been logged out');
          router.push('/login');
        }}
        className={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
}
