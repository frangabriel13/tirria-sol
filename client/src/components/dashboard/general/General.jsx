import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser, editUser } from "../../../redux/actions/authActions";

function General() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUser({ ...user });
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async () => {
    await dispatch(editUser(editedUser));
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Llama a la acción logoutUser al hacer clic en el botón de cierre de sesión
  };

  return (
    <div>
      <h2>Información General</h2>
      {user && !editMode && (
        <div>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
      {editMode && (
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
          <div>
            <button onClick={handleSaveClick}>Guardar</button>
            <button onClick={handleCancelClick}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default General;