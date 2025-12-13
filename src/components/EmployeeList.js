const EmployeeList = () => {
  const employees = ["Rahul", "Amit", "Neha", "Priya"];

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp}>{emp}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
