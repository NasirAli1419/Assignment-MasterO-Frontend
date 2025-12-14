import { useState, useEffect } from "react";
const EmployeeList = () => {
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
  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>{emp.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
