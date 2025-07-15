import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contacts, setContacts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:5000/api/contact');
    setContacts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/contact', formData);
    setFormData({ name: '', email: '', message: '' });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Formulario de Contacto</h1>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            name="message"
            className="form-control"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mensaje"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Enviar</button>
      </form>

      <h2 className="mt-5">Contactos Registrados</h2>
      <ul className="list-group mt-3">
        {contacts.map((c) => (
          <li key={c.id} className="list-group-item">
            <strong>{c.name}</strong> ({c.email}): {c.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
