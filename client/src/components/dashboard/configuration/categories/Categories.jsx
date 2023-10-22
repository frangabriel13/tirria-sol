import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { 
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  filterSubcategories,
} from '../../../../redux/actions/categoryActions';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);
  const allCategories = useSelector(state => state.category.allCategories);
  const [tab, setTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [category, setCategory] = useState({
    id: "",
    name: "",
    parents: [],
    children: [],
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [categories, allCategories]);
  // }, []);

  const handleTabChange = (e) => {
    setTab(e.target.value);
  };

  const handleFilterSubcategories = (id) => {
    dispatch(filterSubcategories(id));
  };

  const handleEditMode = (id) => {
    const categoryToEdit = categories.find(el => el.id === id);
    setCategory(categoryToEdit);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCategory({
      id: "",
      name: "",
      parents: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "parents") {
      const parent = allCategories.find(el => el.id === parseInt(value, 10));
      if(parent) {
        setCategory({
          ...category,
          parents: [...category.parents, parent],
        });
      }
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }
  };

  const handleRemoveParent = (id) => {
    setCategory({
      ...category,
      parents: category.parents.filter(el => el.id !== id),
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedCategory = {
      id: category.id,
      name: category.name,
      parentIds: category.parents.map(el => el.id),
    };
    dispatch(updateCategory(updatedCategory));
    setEditMode(false);
    setCategory({
      id: "",
      name: "",
      parents: [],
    });
  };

  return (
    <div className={s.container}>
      <h3>Administrar categorías</h3>
      <div className={s.content}>
        <div className={s.divTab}>
          <ul>
            <li
              className={tab === 0 ? s.active : ""}
              value={0}
              onClick={handleTabChange}
            >Categorías</li>
            <li
              className={tab === 1 ? s.active : ""}
              value={1}
              onClick={handleTabChange}
            >Subcategorías</li>
          </ul>
        </div>
        <div className={s.divTable}>
          {
            tab === 0 && (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allCategories.map((el, i) => (
                      el.parents.length === 0 && (
                        <tr key={i}>
                          <td>{el.id}</td>
                          <td>{el.name}</td>
                          <td>
                            <button onClick={() => handleEditMode(el.id)}>Editar</button>
                            <button>Eliminar</button>
                          </td>
                        </tr>
                      )
                    ))
                  }
                </tbody>
              </table>
            ) || tab === 1 && (
              <div>
                <select
                  onChange={(e) => handleFilterSubcategories(e.target.value)}
                >
                  <option value="0">Seleccione una categoría</option>
                  {
                    allCategories.map((el, i) => (
                      el.parents.length === 0 && (
                        <option key={i} value={el.id}>{el.name}</option>
                      )
                    ))
                  }
                </select>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((el, i) => (
                        (el.parents && el.parents.length > 0) && (
                          <tr key={i}>
                            <td>{el.id}</td>
                            <td>{el.name}</td>
                            <td>
                              <button onClick={() => handleEditMode(el.id)}>Editar</button>
                              <button>Eliminar</button>
                            </td>
                          </tr>
                        )
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
      {
        editMode ? (
          <div className={s.divForm}>
            <h3>Editar categoría</h3>
            <form>
              <div className={s.divName}>
                <label>Nombre</label>
                <input type="text" placeholder="Nombre" name="name"
                  value={category.name}
                  onChange={handleChange}
                />
              </div>
              <div className={s.divParent}>
                <label>Categoría padre</label>
                <select
                  name="parents"
                  onChange={handleChange}
                >
                  <option value="0">Seleccione una categoría</option>
                  {
                    allCategories.map((el, i) => (
                      <option key={i} 
                        value={el.id}
                      >{el.name}</option>
                    ))
                  }
                </select>
                {
                  category.parents.length > 0 && (
                    <div className={s.divParents}>
                      <label>Categorías padre</label>
                      <ul>
                        {
                          category.parents.map((el, i) => (
                            <div key={i}>
                              <li>{el.name}</li>
                              <button onClick={() => handleRemoveParent(el.id)}>X</button>
                            </div>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }
              </div>
              <div className={s.divBtns}>
                <input type="button" value="Cancelar" onClick={() => handleCancelEdit()} />
                <input type="button" value="Guardar" onClick={(e) => handleUpdate(e)} />
                {/* <button onClick={(e) => handleUpdate(e)}>Guardar</button> */}
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h3>Crear categoría</h3>
            {/* <form>
              <div className={s.divName}>
                <label>Nombre</label>
                <input type="text" placeholder="Nombre" />
              </div>
              <div className={s.divParent}>
                <label>Categoría padre</label>
                <select>
                  <option value="0">Seleccione una categoría</option>
                  {
                    allCategories.map((el, index) => (
                      <option key={index} value={el.id}>{el.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className={s.divBtns}>
                <button>Agregar</button>
              </div>
            </form> */}
          </div>
        )
      }
    </div>
  );
};


export default Categories;