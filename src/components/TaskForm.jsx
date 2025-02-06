import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setDescription, setStatus, addTasks, setEditId } from '../store/slice';
import { v4 as uuid } from 'uuid';
import { createTaskAPI } from '../api/api';

const TaskForm = () => {

    const dispatch = useDispatch();
    const { title, status, description } = useSelector((state) => state.tasks);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newTask = {
            id: uuid(),
            title,
            description,
            status
        };
        try {
            const savedTask = await createTaskAPI(newTask);
            dispatch(addTasks(newTask));    // Update Redux state with the new task     
            console.log(savedTask)
        } catch (err) {
            console.error("Error creating task:", err.message);
        }
        dispatch(addTasks(newTask));
        // ✅ Reset form fields after submission
        dispatch(setTitle(""));
        dispatch(setDescription(""));
        dispatch(setStatus("")); // Reset status to blank
        // console.log(title, description, status);
    }

  return (
    <div className='mt-8'>
        <form className='space-y-2' onSubmit={handleSubmit} data-testid="task-form">
            <h1 className='font-bold md:text-xl text-[1rem] text-blue-500'>Add New Task</h1>
            <input type='text' placeholder='Title' className='w-full border border-gray-400 p-2 rounded-md' required value={title} onChange={(e) => dispatch(setTitle(e.target.value))}></input>
            <textarea placeholder='Description' className='w-full border border-gray-400 p-2 rounded-md' rows='2' value={description} onChange={(e) => dispatch(setDescription(e.target.value))}></textarea>
            <select className='w-full p-2 border rounded-md border-gray-400 uppercase' required value={status} onChange={(e) => dispatch(setStatus(e.target.value))}>
                <option value="">Select Status</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
            </select>
            <div className='flex justify-center'>
                <button title="Add Task" className='font-bold border border-gray-400 bg-blue-400 hover:bg-blue-500 cursor-pointer text-white w-full rounded-md py-2'>Add Task</button>
            </div>
        </form>
    </div>
  )
}

export default TaskForm