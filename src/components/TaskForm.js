import { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ onTaskCreated }) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setEmployees(res.users);
    };
    fetchEmployees();
  }, []);

  const [form, setForm] = useState({
    title: "",
    assigned_to: "",
    status: "pending",
    due_date: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (response.ok) {
      setForm({
        title: "",
        assigned_to: "",
        status: "pending",
        due_date: "",
        description: "",
      });
      onTaskCreated && onTaskCreated();
    }
  };

  return (
    <div className="task-form-container">
      <div className="employees-section">
        <h2>Employees</h2>
        <ul className="employees-list">
          {employees.map((emp) => (
            <li key={emp.id}>{emp.name}</li>
          ))}
        </ul>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Create Task</h2>

        <div className="input-group">
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Assigned To</label>
          <select
            value={form.assigned_to}
            onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="input-group">
          <label>Due Date</label>
          <input
            type="date"
            value={form.due_date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
