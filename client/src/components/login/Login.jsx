import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }) 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(formData));
      console.log("Login successful. Response:", response);
      // Puedes redirigir al usuario a su panel de control o a otra página aquí
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed. Error:", error);
      // Maneja errores de inicio de sesión aquí (puedes mostrar un mensaje de error al usuario)
    }
  };

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email:</label>
          <input type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Password:</label>
          <input type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  )
}


export default Login;