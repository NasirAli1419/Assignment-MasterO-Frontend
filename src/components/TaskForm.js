import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    status: "Pending",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(form);
    setForm({ title: "", assignedTo: "", status: "Pending", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Assigned To"
        value={form.assignedTo}
        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
