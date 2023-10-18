import React from "react";
import s from "./Configuration.module.css";
import Variations from "./variations/Variations";
import Categories from "./categories/Categories";

const Configuration = () => {
  return (
    <div className={s.container}>
      <h2>Configuración</h2>
      <div className={s.content}>
        <Categories />
        <Variations />
      </div>
    </div>
  );
};


export default Configuration;