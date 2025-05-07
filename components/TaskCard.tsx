'use client';

const TaskCard = ({ task }: { task: any }) => {
  return (
    <div className="border p-4 mb-4 rounded-md shadow-sm">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo}</p>
    </div>
  );
};

export default TaskCard;
