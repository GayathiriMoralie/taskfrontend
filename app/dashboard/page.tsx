'use client';

import { useState, useEffect } from 'react';
import TaskCard from '../../components/TaskCard';
import TaskForm from '../../components/TaskForm';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../services/taskService';
import './dashboard.css'; // Importing the styles for the Dashboard component

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  createdBy: string;
  assignedTo: string;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Ideally get logged-in user from context or state management
  const loggedInUser = 'user1'; 

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    let filteredTasks = tasks;

    // Apply search filter
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filteredTasks = filteredTasks.filter((task) => task.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter) {
      filteredTasks = filteredTasks.filter((task) => task.priority === priorityFilter);
    }

    // Apply due date filter
    if (dueDateFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.dueDate).toISOString().split('T')[0] === dueDateFilter
      );
    }

    // Filter tasks based on user roles
    setAssignedTasks(filteredTasks.filter((task) => task.assignedTo === loggedInUser));
    setCreatedTasks(filteredTasks.filter((task) => task.createdBy === loggedInUser));
    setOverdueTasks(filteredTasks.filter(
      (task) => new Date(task.dueDate) < new Date() && task.status !== 'Completed'
    ));
  }, [searchTerm, statusFilter, priorityFilter, dueDateFilter, tasks]);

  const handleCreateTask = async (taskData: Task) => {
    setLoading(true);
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError('Error creating task. Please try again.');
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id: number, taskData: Task) => {
    setLoading(true);
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      setError('Error updating task. Please try again.');
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError('Error deleting task. Please try again.');
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">DASHBOARD</h1>

      <TaskForm onCreateTask={handleCreateTask} />

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filters */}
      <div className="filters-container">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {loading ? (
        <div className="loading-spinner">Loading tasks...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="task-list">
            <h2 className="task-list-title">Tasks Assigned to You</h2>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p>No tasks assigned to you.</p>
            )}
          </div>

          <div className="task-list">
            <h2 className="task-list-title">Tasks You Created</h2>
            {createdTasks.length > 0 ? (
              createdTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p>You haven't created any tasks yet.</p>
            )}
          </div>

          <div className="task-list overdue">
            <h2 className="task-list-title overdue-title">Overdue Tasks</h2>
            {overdueTasks.length > 0 ? (
              overdueTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p>No overdue tasks.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
