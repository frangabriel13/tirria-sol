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
                    allCategories.map((category, index) => (
                      category.parents.length === 0 && (
                        <tr key={index}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            <button>Editar</button>
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
                    allCategories.map((category, index) => (
                      category.parents.length === 0 && (
                        <option key={index} value={category.id}>{category.name}</option>
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
                      categories.map((category, index) => (
                        category.parents.length > 0 && (
                          <tr key={index}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                              <button>Editar</button>
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
    </div>
  );
};


export default Categories;