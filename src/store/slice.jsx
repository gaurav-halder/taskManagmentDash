import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "tasks",
    initialState: {
        items:[],
        error: null,
        title: '',
        description: '',
        status: '',
        editId: null,
        filter: '',
    },
    reducers: {
        setTasks: (state, action) =>{
            state.items = action.payload;
        },
        addTasks: (state, action) => {
            state.items.push(action.payload);
        },
        updateTasks: (state, action) =>{
            const index = state.items.findIndex((task) => task.id == action.payload.id);
            if (index !== -1){
                state.items[index] = { ...state.items[index], ...action.payload };
            }
            state.editId = null; // Close edit mode
        },
        deleteTasks: (state, action) =>{
            state.items = state.items.filter((task)=> task.id !== action.payload);
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setEditId: (state, action) => {
            state.editId = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload; 
        },
    },
});
export const { setTasks, addTasks, updateTasks, deleteTasks, setTitle, setDescription, setStatus, setEditId, setFilter} = slice.actions;
export default slice.reducer;