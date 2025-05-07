'use client';
import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../../services/taskService';
import TaskCard from '../../components/TaskCard';
import AddTask from '../../components/AddTask';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <AddTask onTaskAdded={loadTasks} />
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskPage;
