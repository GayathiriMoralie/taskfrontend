'use client';

import { useState, useEffect } from 'react';

const SearchTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch tasks from API (you can change the API URL if necessary)
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means it runs only once after the component mounts

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search tasks by title"
        className="border p-2 w-full"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((task, index) => (
            <div key={index}>
              <p>{task.title}</p>
              <p>{task.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchTasks;
