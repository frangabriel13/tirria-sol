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
import { formatName } from "../../../../utils/helpers";

function validate(input) {
  let errors = {};
  if(!input.name) {
    errors.name = "El nombre es requerido";
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  } else if (input.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }
  return errors;
}

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategories());
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const errors = validate(category);

    if (Object.keys(errors).length === 0) {
      const updatedCategory = {
        id: category.id,
        name: category.name,
        parentIds: category.parents.map(el => el.id),
      };
      await dispatch(updateCategory(updatedCategory));
      setEditMode(false);
      setCategory({
        id: "",
        name: "",
        parents: [],
      });
      dispatch(getCategories());
    } else {
      setErrors(errors);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCategory(id));
    dispatch(getCategories());
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const errors = validate(category);

    if (Object.keys(errors).length === 0) {
      const categoryCreate = {
        name: category.name,
        parentIds: category.parents.map(el => el.id),
      };
      await dispatch(createCategory(categoryCreate));
      setCategory({
        id: "",
        name: "",
        parents: [],
      });
      dispatch(getCategories());
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={s.container}>
      <h3>Administrar categorías</h3>
      <div className={s.content}>
        <div className={s.divCategory}>
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
                <table className={s.tabCategories}>
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
                              <i
                                className={`bi bi-pencil-square ${s.editIcon}`}
                                onClick={() => handleEditMode(el.id)}
                              ></i>
                              <i
                                className={`bi bi-trash ${s.deleteIcon}`}
                                onClick={() => handleDelete(el.id)}
                              ></i>
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
                    className={s.selectCategory}
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
                  <table className={s.tabCategories}>
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
                              <i
                                className={`bi bi-pencil-square ${s.editIcon}`}
                                onClick={() => handleEditMode(el.id)}
                              ></i>
                              <i
                                className={`bi bi-trash ${s.deleteIcon}`}
                                onClick={() => handleDelete(el.id)}
                              ></i>
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
                  {errors.name && (<p className={s.error}>{errors.name}</p>)}
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
                  {errors.parents && (<p className={s.error}>{errors.parents}</p>)}
                  {
                    category.parents.length > 0 && (
                      <div className={s.divParents}>
                        <label>Categorías padre</label>
                        <ul>
                          {
                            category.parents.map((el, i) => (
                              <div className={s.parentsCat} key={i}>
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
                </div>
              </form>
            </div>
          ) : (
            <div className={s.divForm}>
              <h3>Crear categoría</h3>
              <form
                onSubmit={(e) => handleCreate(e)}
              >
                <div className={s.divName}>
                  <label>Nombre</label>
                  <input type="text" placeholder="Nombre" 
                    onChange={handleChange}
                    name="name"
                    value={category.name}
                  />
                  {errors.name && (<p className={s.error}>{errors.name}</p>)}
                </div>
                <div className={s.divParent}>
                  <label>Categoría padre</label>
                  <select
                    name="parents"
                    onChange={handleChange}
                  >
                    <option value="0">Seleccione una categoría</option>
                    {
                      allCategories.map((el, index) => (
                        <option key={index} value={el.id}>{el.name}</option>
                      ))
                    }
                  </select>
                  {errors.parents && (<p className={s.error}>{errors.parents}</p>)}
                  {
                    category.parents.length > 0 && (
                      <div className={s.divParents}>
                        <label>Seleccionadas</label>
                        <ul className={s.ulParents}>
                          {
                            category.parents.map((el, i) => (
                              <div className={s.parentsCat} key={i}>
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
                  <input className={s.createBtn} type="submit" value="Crear" />
                </div>
              </form>
            </div>
          )
        }
      </div>
    </div>
  );
};


export default Categories;