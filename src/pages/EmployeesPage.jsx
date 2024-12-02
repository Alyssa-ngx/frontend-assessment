import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState('');
  const navigate = useNavigate();

  // Load employees from API
  const loadEmployees = async () => {
    const data = await fetchEmployees(selectedCafe);
    setEmployees(data);
  };

  // Handle employee deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  // Table columns for AgGrid
  const columns = [
    { field: 'id', headerName: 'Employee ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email_address', headerName: 'Email Address' },
    { field: 'phone_number', headerName: 'Phone Number' },
    { field: 'days_worked', headerName: 'Days Worked' },
    { field: 'cafe', headerName: 'Café Name' },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <button onClick={() => navigate(`/employees/edit/${params.data.id}`)}>Edit</button>
          <button onClick={() => handleDelete(params.data.id)}>Delete</button>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadEmployees();
  }, [selectedCafe]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <h1>Employees</h1>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Filter by café name"
          value={selectedCafe}
          onChange={(e) => setSelectedCafe(e.target.value)}
        />
        <button onClick={loadEmployees}>Filter</button>
        <button onClick={() => navigate('/employees/add')}>Add New Employee</button>
      </div>
      <AgGridReact rowData={employees} columnDefs={columns} />
    </div>
  );
}
