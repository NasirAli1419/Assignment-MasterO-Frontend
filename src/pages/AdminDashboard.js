import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../utils/auth";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    clearAuthData();
    navigate("/auth/login");
  };

  const fetchTasks = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/tasks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setTasks(data.Tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTask = async (updatedTask) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const payload = {
      title: updatedTask.task_title,
      assigned_to: updatedTask.assigned_user,
      status: updatedTask.task_status,
      due_date: updatedTask.due_date,
      description: updatedTask.description,
    };
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
        }/tasks/${updatedTask.task_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.task_id === updatedTask.task_id ? updatedTask : task
          )
        );
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

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
          body: JSON.stringify({ task_status: status }),
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
    <div className="dashboard-container">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="section">
        <TaskForm onTaskCreated={fetchTasks} />
      </div>

      <div className="section">
        <TaskTable
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onEdit={updateTask}
          enableEdit={true}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
