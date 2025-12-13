import { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="section">
        <EmployeeList />
      </div>

      <div className="section">
        <TaskForm addTask={addTask} />
      </div>

      <div className="section">
        <TaskTable tasks={tasks} onEdit={updateTask} />
      </div>
    </div>
  );
};

export default AdminDashboard;
