// app/tasks/[id]/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
          const data = await response.json();

          if (response.ok) {
            setTask(data);
          } else {
            setError('Task not found');
          }
        } catch (error) {
          setError('Failed to load task details');
        } finally {
          setLoading(false);
        }
      };

      fetchTaskDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!task) return <div>Task not found</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskDetail;
