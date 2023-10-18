import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { 
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
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
        {
          tab === 0 && (
            <p>Categorías seleccionadas</p>
          ) || tab === 1 && (
            <p>Subcategorías seleccionadas</p>
          )
        }
      </div>
    </div>
  );
};


export default Categories;