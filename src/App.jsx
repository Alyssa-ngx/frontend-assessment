import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CafesPage from './pages/CafesPage';
import EmployeesPage from './pages/EmployeesPage';
import AddEditCafe from './pages/AddEditCafe';
import AddEditEmployee from './pages/AddEditEmployee';
import './App.css'; // Add global styles if needed

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Café Employee Manager</h1>
          <nav>
            <ul>
              <li>
                <a href="/cafes">Cafes</a>
              </li>
              <li>
                <a href="/employees">Employees</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            {/* Cafes Routes */}
            <Route path="/cafes" element={<CafesPage />} />
            <Route path="/cafes/add" element={<AddEditCafe />} />
            <Route path="/cafes/edit/:id" element={<AddEditCafe />} />

            {/* Employees Routes */}
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/add" element={<AddEditEmployee />} />
            <Route path="/employees/edit/:id" element={<AddEditEmployee />} />

            {/* Default Route */}
            <Route
              path="*"
              element={
                <div>
                  <h2>404 - Page Not Found</h2>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
