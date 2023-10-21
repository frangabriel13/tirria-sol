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
  // }, [categories, allCategories]);
  }, []);

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

  console.log(category)

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
                        el.parents.length > 0 && (
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
                  onChange={(e) => setCategory({...category, name: e.target.value})}
                />
              </div>
              <div className={s.divParent}>
                <label>Categoría padre</label>
                <select>
                  <option value="0">Seleccione una categoría</option>
                  {
                    allCategories.map((el, i) => (
                      <option key={i} value={el.id}>{el.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className={s.divBtns}>
                <input type="button" value="Cancelar" onClick={() => handleCancelEdit()} />
                <button>Guardar</button>
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