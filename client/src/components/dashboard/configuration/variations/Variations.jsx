import React, { useEffect, useState } from "react";
import s from "./Variations.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSizes, addSize, updateSize, deleteSize } from "../../../../redux/actions/sizeActions";
import { getColors, addColor, updateColor, deleteColor } from "../../../../redux/actions/colorActions";

const Variations = () => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.size.sizes);
  const allSizes = useSelector((state) => state.size.allSizes);
  const colors = useSelector((state) => state.color.colors);
  const allColors = useSelector((state) => state.color.allColors);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [size, setSize] = useState({
    name: "",
  });
  const [color, setColor] = useState({
    name: "",
    hex: "#000000",
  });

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleAddSize = async (e) => {
    e.preventDefault();
    await dispatch(addSize(size));
    setSize({
      id: "",
      name: "",
    });
  };

  const handleEditSize = (id) => {
    const sizeToUpdate = allSizes.find((el) => el.id === id);
    setEditMode(true);
    setSize({
      id: sizeToUpdate.id,
      name: sizeToUpdate.name,
    });
  };

  const handleUpdateSize = async (e) => {
    e.preventDefault();
    await dispatch(updateSize({
      id: size.id,
      name: size.name,
    }));
    setEditMode(false);
    setSize({
      id: "",
      name: "",
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSize({
      id: "",
      name: "",
    });
  };

  const handleDeleteSize = async (id) => {
    await dispatch(deleteSize(id));
  };

  const handleAddColor = async (e) => {
    e.preventDefault();
    await dispatch(addColor(color));
    setColor({
      id: "",
      name: "",
      hex: "#000000",
    });
  };

  const handleEditColor = (id) => {
    const colorToUpdate = allColors.find((el) => el.id === id);
    setEditMode(true);
    setColor({
      id: colorToUpdate.id,
      name: colorToUpdate.name,
      hex: colorToUpdate.hex,
    });
  };

  const handleUpdateColor = async (e) => {
    e.preventDefault();
    await dispatch(updateColor({
      id: color.id,
      name: color.name,
      hex: color.hex,
    }));
    setEditMode(false);
    setColor({
      id: "",
      name: "",
      hex: "#000000",
    });
  };

  const handleCancelEditColor = () => {
    setEditMode(false);
    setColor({
      id: "",
      name: "",
      hex: "#000000",
    });
  };

  const handleDeleteColor = async (id) => {
    await dispatch(deleteColor(id));
  };

  return (
    <div className={s.container}>
      <h3>Administrar variaciones</h3>
      <div className={s.content}>
        <ul className={s.listTab}>
          <li
            className={selectedTab === 0 ? s.selected : ""}
            onClick={() => handleTabClick(0)}>Size
          </li>
          <li
            className={selectedTab === 1 ? s.selected : ""}
            onClick={() => handleTabClick(1)}>Color
          </li>
        </ul>
        <div className={s.divSubcontent}>
          {
            selectedTab === 0 && (
              <div className={s.divSize}>
                <table className={s.tableSize}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Talle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sizes.map((el) => (
                        <tr key={el.id}>
                          <td>{el.id}</td>
                          <td>{el.name}</td>
                          <td>
                              <i
                                className={`bi bi-pencil-square ${s.editIcon}`}
                                onClick={() => handleEditSize(el.id)}
                              ></i>
                              <i
                                className={`bi bi-trash ${s.deleteIcon}`}
                                onClick={() => handleDeleteSize(el.id)}
                              ></i>
                            </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                {
                  editMode ? (
                    <form>
                      <div className={s.divFormSize}>
                        <div className={s.divName}>
                          <label>Talle</label>
                          <input type="text" name="size" placeholder="Talle"
                            value={size.name}
                            onChange={(e) => setSize({ ...size, name: e.target.value })}
                          />
                        </div>
                        <div className={s.divBtns}>
                          <input type="button" value="Cancelar" onClick={() => handleCancelEdit()} />
                          <input type="button" value="Guardar" onClick={(e) => handleUpdateSize(e)} />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className={s.divFormSize}>
                      <h3>Agregar talle</h3>
                      <form onSubmit={(e) => handleAddSize(e)}>
                        <div className={s.divName}>
                          <label>Talle</label>
                          <input type="text" name="size" placeholder="Talle"
                            value={size.name}
                            onChange={(e) => setSize({ ...size, name: e.target.value })}
                          />
                        </div>
                        <div className={s.divBtns}>
                          <input className={s.createBtn} type="submit" value="Crear" />
                        </div>
                      </form>
                    </div>
                  )
                }
              </div>
            ) || selectedTab === 1 && (
              <div className={s.divColor}>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Color</th>
                      <th>Código</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      colors.map((el) => (
                        <tr key={el.id}>
                          <td>{el.id}</td>
                          <td>{el.name}</td>
                          <td>{el.hex}</td>
                          <td>
                            <button onClick={() => handleEditColor(el.id)}>Editar</button>
                            <button onClick={() => handleDeleteColor(el.id)}>Eliminar</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                {
                  editMode ? (
                    <div className={s.divEditColor}>
                      <input type="text" placeholder="Color"
                        value={color.name}
                        onChange={(e) => setColor({ ...color, name: e.target.value })}
                      />
                      <input type="color" placeholder="Código" 
                        value={color.hex}
                        onChange={(e) => setColor({ ...color, hex: e.target.value })}
                      />
                      <button
                        onClick={() => handleCancelEditColor()}
                      >Cancelar</button>
                      <button
                        onClick={(e) => handleUpdateColor(e)}
                      >Guardar</button>
                    </div>
                  ) : (
                    <div className={s.divAddColor}>
                      <input type="text" placeholder="Color" 
                        value={color.name}
                        onChange={(e) => setColor({ ...color, name: e.target.value })}  
                      />
                      <input type="color" placeholder="Código"
                        value={color.hex}
                        onChange={(e) => setColor({ ...color, hex: e.target.value })}
                      />
                      <button
                        onClick={(e) => handleAddColor(e)}
                      >Agregar</button>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};


export default Variations;