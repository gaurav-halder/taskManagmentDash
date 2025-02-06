import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {

  return (
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center justify-center shadow-sm p-6">
            <h1 className="md:text-3xl text-[1.05rem] font-bold text-blue-500">
              Task Management Dashboard
            </h1>
          </div>
          <TaskForm/>
          <TaskList/>
        </div>
      </div>
  );
}

export default App;
