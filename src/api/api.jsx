const API_URL = "http://localhost:5174/tasks";

// Fetch all tasks
export const fetchTasksAPI = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  };
  
  // Create a new task
  export const createTaskAPI = async (task) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  };
  
  // Update a task
  export const updateTaskAPI = async (taskId, updatedTask) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  };
  
  // Delete a task
  export const deleteTaskAPI = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return taskId; // Return task ID for Redux state update
  };