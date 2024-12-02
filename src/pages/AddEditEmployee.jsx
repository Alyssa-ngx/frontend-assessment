import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEmployees, addEmployee, updateEmployee } from '../services/employeeService';
import { fetchCafes } from '../services/cafeService';

export default function AddEditEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    gender: '',
    cafe_id: '',
  });
  const [cafes, setCafes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load employee data and café list
  useEffect(() => {
    const loadData = async () => {
      const cafeList = await fetchCafes();
      setCafes(cafeList);

      if (id) {
        const employees = await fetchEmployees();
        const employee = employees.find((e) => e.id === id);

        if (employee) {
          setIsEditing(true);
          setFormData({
            name: employee.name,
            email_address: employee.email_address,
            phone_number: employee.phone_number,
            gender: employee.gender,
            cafe_id: employee.cafe_id,
          });
        }
      }
    };
    loadData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || formData.name.length < 6 || formData.name.length > 10) {
      alert('Name must be between 6 and 10 characters');
      return;
    }
    if (!formData.email_address || !formData.email_address.includes('@')) {
      alert('Invalid email address');
      return;
    }
    if (!/^[89]\d{7}$/.test(formData.phone_number)) {
      alert('Phone number must start with 8 or 9 and have 8 digits');
      return;
    }
    if (!formData.gender) {
      alert('Please select a gender');
      return;
    }
    if (!formData.cafe_id) {
      alert('Please assign the employee to a café');
      return;
    }

    // Call API
    if (isEditing) {
      await updateEmployee(id, formData);
    } else {
      await addEmployee(formData);
    }

    navigate('/employees'); // Redirect to employees page
  };

  // Warn before canceling if there are unsaved changes
  const handleCancel = () => {
    if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
      navigate('/employees');
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="6-10 characters"
            required
          />
        </div>

        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
            placeholder="example@example.com"
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="8-digit number starting with 8 or 9"
            required
          />
        </div>

        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
        </div>

        <div>
          <label>Assigned Café:</label>
          <select name="cafe_id" value={formData.cafe_id} onChange={handleChange} required>
            <option value="">Select a Café</option>
            {cafes.map((cafe) => (
              <option key={cafe.id} value={cafe.id}>
                {cafe.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
