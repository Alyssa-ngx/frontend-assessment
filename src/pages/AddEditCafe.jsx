import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCafe, updateCafe, fetchCafes } from '../services/cafeService';

export default function AddEditCafe() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    logo: null,
    location: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch existing cafe data and prefill the form
      (async () => {
        const data = await fetchCafes();
        const cafe = data.find((c) => c.id === id);
        if (cafe) setForm(cafe);
      })();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCafe(id, form);
    } else {
      await addCafe(form);
    }
    navigate('/cafes');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit' : 'Add'} Café</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        minLength={6}
        maxLength={10}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        maxLength={256}
      />
      <input
        type="file"
        name="logo"
        accept="image/*"
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => navigate('/cafes')}>Cancel</button>
    </form>
  );
}
