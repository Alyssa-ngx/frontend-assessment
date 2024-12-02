import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CafesPage from './pages/CafesPage';
import EmployeesPage from './pages/EmployeesPage';
import AddEditCafe from './pages/AddEditCafe';
import AddEditEmployee from './pages/AddEditEmployee';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/cafes" element={<CafesPage />} />
        <Route path="/cafes/add" element={<AddEditCafe />} />
        <Route path="/cafes/edit/:id" element={<AddEditCafe />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/add" element={<AddEditEmployee />} />
        <Route path="/employees/edit/:id" element={<AddEditEmployee />} />
      </Routes>
    </Router>
  );
}
