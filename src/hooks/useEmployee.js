import { useState } from "react";
import USER_MOCK_LIST from "../_mocks_/_user";

export default function useEmployee() {
  // Create a custom React Hook
  const [employees, setEmployees] = useState(USER_MOCK_LIST);

  const findEmployee = id => {
    return employees.filter(u => u.id.toString() === id.toString())[0];
  };

  const findEmployeeIndex = id => {
    let result = -1;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateEmployeeRole = (id, role) => {
    setEmployees(employees.map(u => (u.id === id.toString() ? { id, role } : u)));
  };
  const deleteEmployee = id => {
    const newSectorTypes = employees.filter(u => u.id !== id);
    setEmployees(newSectorTypes);
  };
  const addEmployee = name => {
    if (name !== null && name !== "") {
      // temp id; will be replaced by id received from backend
      setEmployees([...employees, { id: employees.length, name: name }]);
    }
  };

  return {
    employees,
    addEmployee,
    setEmployees,
    findEmployee,
    updateEmployeeRole,
    findEmployeeIndex,
    deleteEmployee
  };
}
