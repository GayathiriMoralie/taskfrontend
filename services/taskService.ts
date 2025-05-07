const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface TaskData {
  title: string;
  description: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  assignedTo?: string;
  createdBy?: string;
}

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return await response.json();
};

// Fetch a single task by ID
export const fetchTaskById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return await response.json();
};

// Create a new task
export const createTask = async (taskData: TaskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return await response.json();
};

// Update an existing task
export const updateTask = async (id: string, taskData: Partial<TaskData>) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return await response.json();
};

// Delete a task by ID
export const deleteTask = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return await response.json(); // Optional: return confirmation
};
