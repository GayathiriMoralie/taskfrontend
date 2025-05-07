// 'use client';

// import { useState } from 'react';
// import TaskForm from '@/components/TaskForm';
// import { createTask } from '@/services/taskService'; // Adjust path if needed

// const CreateTaskPage = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleCreateTask = async (taskData: any) => {
//     try {
//       setLoading(true);
//       setError(null);
//       setSuccess(null);

//       // Call the API to create the task
//       const newTask = await createTask(taskData);

//       setSuccess('Task created successfully!');
//       console.log('New Task:', newTask);
//     } catch (error: any) {
//       setError('Failed to create task');
//       console.error('Error creating task:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return( <div className={styles.container}>
//   <div className={styles.card}>
//     <div className={styles.greeting}>Create a New Task</div>
//     {error && <div className={styles.error}>{error}</div>}
//     <form onSubmit={handleSubmit} className={styles.createTaskForm}>
//       <label htmlFor="title">Title</label>
//       <input
//         type="text"
//         id="title"
//         name="title"
//         value={task.title}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="description">Description</label>
//       <textarea
//         id="description"
//         name="description"
//         rows="4"
//         value={task.description}
//         onChange={handleChange}
//         required
//       ></textarea>

//       <label htmlFor="dueDate">Due Date</label>
//       <input
//         type="date"
//         id="dueDate"
//         name="dueDate"
//         value={task.dueDate}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="priority">Priority</label>
//       <select
//         id="priority"
//         name="priority"
//         value={task.priority}
//         onChange={handleChange}
//         required
//       >
//         <option value="Low">Low</option>
//         <option value="Medium">Medium</option>
//         <option value="High">High</option>
//       </select>

//       <label htmlFor="status">Status</label>
//       <select
//         id="status"
//         name="status"
//         value={task.status}
//         onChange={handleChange}
//         required
//       >
//         <option value="Pending">Pending</option>
//         <option value="In Progress">In Progress</option>
//         <option value="Completed">Completed</option>
//       </select>

//       <button type="submit" className={styles.submitButton}>Create Task</button>
//     </form>
//   </div>

//   <button onClick={() => router.push('/manager')} className={styles.cancelButton}>Cancel</button>
//   <button
//     onClick={() => {
//       alert('You have been logged out');
//       router.push('/login');
//     }}
//     className={styles.logoutButton}
//   >
//     Logout
//   </button>
// </div>
// );
// }

// export default CreateTaskPage;
