import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "../components/TaskForm";
import tasksReducer from "../store/slice"; 

describe("TaskForm Component", () => {          
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { tasks: tasksReducer },  
      preloadedState: {
        tasks: { title: "", description: "", status: "" }, 
      },
    });
  });

  test("Should Load Form component", () => {
    render(
      <Provider store={store}> 
        <TaskForm />
      </Provider>
    );

    expect(screen.getByText("Add New Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  test("shows all status options in dropdown", () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    const statusSelect = screen.getByRole("combobox");
    
    expect(screen.getByRole("option", { name: "Pending" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "In Progress" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Completed" })).toBeInTheDocument();
  });

});