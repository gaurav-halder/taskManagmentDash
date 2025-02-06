import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="flex flex-col items-center p-6">
        <button
          onClick={toggleDarkMode}
          className={`fixed top-4 right-4 p-2 rounded-full ${
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors`}
          aria-label="Toggle dark mode"
        >
          {isDark ? 
            <LightModeIcon className="text-yellow-400" /> : 
            <DarkModeIcon className="text-gray-700" />
          }
        </button>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center justify-center shadow-sm p-6">
            <h1 className="md:text-3xl text-[1.05rem] font-bold text-blue-500">
              Task Management Dashboard
            </h1>
          </div>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;
