import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCafes, deleteCafe } from "../services/cafeService";
import "./../styles/CafesPage.css";

export default function CafesPage() {
  const [cafes, setCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const navigate = useNavigate();

  // Load cafes
  const loadCafes = async () => {
    try {
      const data = await fetchCafes(locationFilter);
      console.log("Fetched Cafes:", data);
      setCafes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cafes:", error);
      setCafes([]);
    }
  };

  // Delete Cafe
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this café?")) {
      await deleteCafe(id);
      loadCafes();
    }
  };

  useEffect(() => {
    loadCafes();
  }, [locationFilter]);

  return (
    <div className="cafes-page">
      <h1 className="cafes-title">Cafes</h1>
      <div className="cafes-filter-container">
        <TextField
          label="Filter by Location"
          variant="outlined"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="cafes-filter-input"
        />
        <Button variant="contained" color="primary" onClick={loadCafes}>
          Filter
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/cafes/add")}
        >
          Add New Café
        </Button>
      </div>
      <TableContainer component={Paper} className="cafes-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Employees</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cafes.map((cafe) => (
              <TableRow key={cafe.id}>
                <TableCell>
                  {cafe.logo ? (
                    <img
                      src={cafe.logo}
                      alt="logo"
                      className="cafes-logo"
                    />
                  ) : (
                    "No Logo"
                  )}
                </TableCell>
                <TableCell>{cafe.name}</TableCell>
                <TableCell>{cafe.description}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => navigate(`/employees?cafe=${cafe.name}`)}
                  >
                    {cafe.employees}
                  </Button>
                </TableCell>
                <TableCell>{cafe.location}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/cafes/edit/${cafe.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(cafe.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
