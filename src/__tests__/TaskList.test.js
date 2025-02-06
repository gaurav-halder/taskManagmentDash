import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import TaskList from "../components/TaskList";
import tasksReducer from "../store/slice";
import "@testing-library/jest-dom";

describe("TaskList Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { tasks: tasksReducer },
      preloadedState: {
        tasks: {
          items: [
            { id: 1, title: "Task 1", description: "Description 1", status: "Pending" },
            { id: 2, title: "Task 2", description: "Description 2", status: "Completed" },
            { id: 3, title: "Task 3", description: "Description 3", status: "In Progress" }
          ],
          filter: "All",
          editId: null
        }
      }
    });

    // Mock the API calls
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve({ tasks: [] })
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders TaskList with all tasks", () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText("Task List")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  test("filters tasks correctly when filter is changed", () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    const filterSelect = screen.getByRole("combobox");
    
    // Test filtering completed tasks
    fireEvent.change(filterSelect, { target: { value: "completed" } });
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();

    // Test filtering pending tasks
    fireEvent.change(filterSelect, { target: { value: "pending" } });
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  test("shows 'No tasks found' message when filter returns no results", () => {
    store = configureStore({
      reducer: { tasks: tasksReducer },
      preloadedState: {
        tasks: {
          items: [{ id: 1, title: "Task 1", description: "Description 1", status: "Pending" }],
          filter: "completed",
          editId: null
        }
      }
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText('No tasks found for "completed"')).toBeInTheDocument();
  });

  test("deletes a task when delete button is clicked", async () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    const deleteButtons = screen.getAllByTestId("delete-task");
    fireEvent.click(deleteButtons[0]);
    
    // Check if first task is removed
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });
});