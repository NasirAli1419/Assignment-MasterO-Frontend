import { useState } from "react";

const TaskTable = ({ tasks, onStatusChange, onEdit, enableEdit = false }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleStatusChange = (id, status) => {
    if (onStatusChange) {
      onStatusChange(id, status);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.task_id);
    setEditData(task);
  };

  const saveEdit = () => {
    if (onEdit) {
      onEdit(editData);
    }
    setEditingId(null);
  };

  return (
    <div>
      <h2>Tasks</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Description</th>
            {enableEdit && <th>Edit</th>}
          </tr>
        </thead>

        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task.task_id}>
                <td>
                  {enableEdit && editingId === task.task_id ? (
                    <input
                      value={editData.task_title || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, task_title: e.target.value })
                      }
                    />
                  ) : (
                    task.task_title
                  )}
                </td>
                <td>{task.assigned_user}</td>
                <td>
                  {enableEdit ? (
                    editingId === task.task_id ? (
                      <select
                        value={editData.task_status || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            task_status: e.target.value,
                          })
                        }
                      >
                        <option>pending</option>
                        <option>in_progress</option>
                        <option>completed</option>
                      </select>
                    ) : (
                      task.task_status
                    )
                  ) : (
                    <select
                      value={task.task_status}
                      onChange={(e) =>
                        handleStatusChange(task.task_id, e.target.value)
                      }
                    >
                      <option>pending</option>
                      <option>in_progress</option>
                      <option>completed</option>
                    </select>
                  )}
                </td>
                <td>
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString("en-US")
                    : ""}
                </td>
                <td>
                  {enableEdit && editingId === task.task_id ? (
                    <textarea
                      value={editData.description || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    task.description || ""
                  )}
                </td>
                {enableEdit && (
                  <td>
                    {editingId === task.task_id ? (
                      <button onClick={saveEdit}>Save</button>
                    ) : (
                      <button onClick={() => startEdit(task)}>Edit</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
