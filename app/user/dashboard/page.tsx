'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/userdashboard.module.css';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState('User1'); // This should be dynamically fetched when implementing authentication
  const [tasks, setTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
  

  // Fetch tasks when the component mounts or when the `user` state changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${apiUrl}/tasks`);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
  
        const today = new Date();
        const overdue = data.filter(
          (task: any) => new Date(task.due_date) < today && task.status !== 'Completed'
        );
        setOverdueTasks(overdue);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);
  

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  // Handle task creation form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    try {
      const response = await fetch(`${apiUrl}/tasks/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskForm), // ✅ Send only the taskForm
      });
  
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
  
      alert('Task created successfully!');
      setShowCreateTaskForm(false); // Optionally close the form
      setTaskForm({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        status: 'Pending',
      }); // Clear form
      // Optional: Refresh tasks
      const updatedTasks = await fetch(`${apiUrl}/tasks`);
      const taskData = await updatedTasks.json();
      setTasks(taskData);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };
  

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date in a readable format
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>Welcome, {user}!</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.card}>
            <h2>Assigned Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks assigned yet.</p>
            ) : (
              tasks.map((task: any) => (
                <div key={task.id} className={styles.taskCard}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {formatDate(task.due_date)}</p>
                  <p>Status: {task.status}</p>
                </div>
              ))
            )}
          </div>

          {!showCreateTaskForm && (
            <button onClick={() => setShowCreateTaskForm(true)} className={styles.createBtn}>
              Create Task
            </button>
          )}

          {showCreateTaskForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3>Create New Task</h3>
              <label>Title:</label>
              <input
                name="title"
                value={taskForm.title}
                onChange={handleChange}
                required
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={taskForm.description}
                onChange={handleChange}
                required
              />

              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={taskForm.dueDate}
                onChange={handleChange}
                required
              />

              <label>Priority:</label>
              <select name="priority" value={taskForm.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <label>Status:</label>
              <select name="status" value={taskForm.status} onChange={handleChange}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          )}

          <div className={styles.card}>
            <h2>Overdue Tasks</h2>
            {overdueTasks.length === 0 ? (
              <p>No overdue tasks</p>
            ) : (
              overdueTasks.map((task: any) => (
                <div key={task.id} className={styles.taskCard}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {formatDate(task.due_date)}</p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => {
              alert('You have been logged out');
              router.push('/login');
            }}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
