import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/userActions";

function CreateUser() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: true,
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    // Limpia el formulario después de enviar los datos, si es necesario
    setFormData({
      name: "",
      email: "",
      password: "",
      isAdmin: true,
      phone: "",
    });
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div>
          <label htmlFor="isAdmin">Es Administrador:</label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
          />
        </div> */}
        {/* <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div> */}
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}

export default CreateUser;