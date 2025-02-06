import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useDispatch, useSelector } from "react-redux";
import { setEditId, setStatus, updateTasks } from "../store/slice";
import { updateTaskAPI } from "../api/api";

const EditTask = ({ task }) => {
  const dispatch = useDispatch();
  const { editId = null } = useSelector((state) => state.tasks || {});
  const isEditing = editId === task?.id;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus); // Update state

    // Create a new task object with all fields
    const updatedTask = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: newStatus, 
      };
      dispatch(updateTasks(updatedTask));       //Since API failed dispatch here
    // Send PUT request to update the task on the backend
    try {
      await updateTaskAPI(task.id, updatedTask);
      dispatch(updateTasks(updatedTask)); // Update Redux state
    } catch (error) {
      console.error("Error updating status:", error);
    }

    dispatch(setEditId(null)); // Exit edit mode after selection
  };

  return (
    <div className="flex items-center justify-between w-full py-2">
      <p className="font-bold flex md:flex-row flex-col items-left gap-2 md:text-[16px] text-[10px]">
        Status:{" "}
        {isEditing ? (
          <select
            className="border border-gray-400 md:text-sm text-[9px] rounded-md uppercase"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Pending">PENDING</option>
            <option value="In Progress">IN PROGRESS</option>
            <option value="Completed">COMPLETED</option>
          </select>
        ) : (
          <span className="text-green-500 md:text-[16px] text-[10px]">{task.status}</span>
        )}
      </p>

      <div className="flex gap-3">
        <button title="Edit Task"
          onClick={() => dispatch(setEditId(task.id))}
          className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
        >
          <EditNoteIcon />
        </button>

      </div>
    </div>
  );
};

export default EditTask;
