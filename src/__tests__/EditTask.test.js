import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../store/slice'; 
import EditTask from '../components/EditTask';

describe('EditTask Component', () => {
  let store;
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending'
  };

  beforeEach(() => {

    store = configureStore({
      reducer: {
        tasks: tasksReducer
      },
      preloadedState: {
        tasks: {
          editId: null,
          items: [mockTask],
          status: ''
        }
      }
    });

    // Mock the API calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ task: mockTask })
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders task status correctly in view mode', () => {
    render(
      <Provider store={store}>
        <EditTask task={mockTask} />
      </Provider>
    );

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  test('switches to edit mode when edit button is clicked', () => {
    render(
      <Provider store={store}>
        <EditTask task={mockTask} />
      </Provider>
    );

    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);


    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect).toBeInTheDocument();
    expect(statusSelect).toHaveValue('Pending');
  });

  test('displays all status options in edit mode', () => {
    store = configureStore({
      reducer: { tasks: tasksReducer },
      preloadedState: {
        tasks: {
          editId: 1, 
          items: [mockTask],
          status: 'Pending'
        }
      }
    });

    render(
      <Provider store={store}>
        <EditTask task={mockTask} />
      </Provider>
    );

    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect).toBeInTheDocument();


    expect(screen.getByRole('option', { name: 'PENDING' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'IN PROGRESS' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'COMPLETED' })).toBeInTheDocument();
  });

  test('shows edit button with correct styling', () => {
    render(
      <Provider store={store}>
        <EditTask task={mockTask} />
      </Provider>
    );

    const editButton = screen.getByRole('button');
    expect(editButton).toHaveClass('text-blue-500');
    expect(editButton).toHaveClass('cursor-pointer');
  });
});
