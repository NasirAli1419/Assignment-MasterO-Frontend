import { useState } from "react";
import TaskTable from "../components/TaskTable";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Project Report",
      assignedTo: "Employee 1",
      status: "Pending",
      dueDate: "2025-12-20",
    },
    {
      id: 2,
      title: "Team Meeting",
      assignedTo: "Employee 1",
      status: "In Progress",
      dueDate: "2025-12-15",
    },
  ]);

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="employee-dashboard-container">
      <h1>Employee Dashboard</h1>

      <div className="section">
        <h2>My Tasks</h2>
        <TaskTable tasks={tasks} onEdit={updateTask} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
