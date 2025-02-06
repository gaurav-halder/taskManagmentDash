import { useEffect } from "react";
import { deleteTaskAPI, fetchTasksAPI } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, setTasks, setFilter } from "../store/slice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "./EditTask";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const filter = useSelector((state) => state.tasks.filter);

  useEffect(() => {
    fetchTasksAPI()
      .then((data) => dispatch(setTasks(data.tasks)))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTasks(id));      //Since API failed dispatch here
    deleteTaskAPI(id)
      .then(() => dispatch(deleteTasks(id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  // filtering logic
  const filteredTasks =
    filter === "All" || filter === ""
      ? tasks // Show all tasks if "All" is selected
      : tasks.filter((task) => task.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-6">
      <div className="w-full flex justify-between">
        <h2 className="font-bold md:text-xl text-[1rem] text-blue-500">Task List</h2>
        <div className="flex items-center space-x-2">
          <p>Filter:</p>
          <select
            className="text-sm border border-gray-300 rounded-sm uppercase"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          >
            <option value="All">All</option> 
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <ul className="w-full space-y-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id} className="w-full flex justify-between items-center">
              <div className="w-2/4 flex flex-col pr-1">
                <h3 className="md:text-lg text-[12px] font-semibold text-gray-800">{task.title}</h3>
                <h5 className="md:text-[16px] text-[10px]">{task.description}</h5>
              </div>
              <div className="flex w-1/3">
                <EditTask task={task} />
              </div>
              <div className="w-1/8 flex justify-center space-x-6">
                <button data-testid="delete-task"
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                >
                  <DeleteIcon fontSize="medium" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks found for "{filter}"</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;