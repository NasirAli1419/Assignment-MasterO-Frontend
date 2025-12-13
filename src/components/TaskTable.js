import { useState } from "react";

const TaskTable = ({ tasks, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData(task);
  };

  const saveEdit = () => {
    onEdit(editData);
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
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                {editingId === task.id ? (
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                ) : (
                  task.title
                )}
              </td>

              <td>
                {editingId === task.id ? (
                  <input
                    value={editData.assignedTo}
                    onChange={(e) =>
                      setEditData({ ...editData, assignedTo: e.target.value })
                    }
                  />
                ) : (
                  task.assignedTo
                )}
              </td>

              <td>
                {editingId === task.id ? (
                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>

              <td>
                {editingId === task.id ? (
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) =>
                      setEditData({ ...editData, dueDate: e.target.value })
                    }
                  />
                ) : (
                  task.dueDate
                )}
              </td>

              <td>
                {editingId === task.id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <button onClick={() => startEdit(task)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
