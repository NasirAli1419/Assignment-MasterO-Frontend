import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../utils/auth";
import TaskTable from "../components/TaskTable";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const handleLogout = () => {
    clearAuthData();
    navigate("/auth/login");
  };

  useEffect(() => {
    // Fetch employee-specific tasks if needed
    const fetchEmployeeTasks = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
        }/users/${auth.user.id}/tasks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTasks(data.tasks || []);
    };
    fetchEmployeeTasks();
  }, []);
  const handleStatusChange = async (id, status) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
        }/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );
      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.task_id === id ? { ...task, task_status: status } : task
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="header">
        <h1>Employee Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="section">
        <h2>My Tasks</h2>
        <TaskTable
          tasks={tasks}
          onStatusChange={handleStatusChange}
          enableEdit={false}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
