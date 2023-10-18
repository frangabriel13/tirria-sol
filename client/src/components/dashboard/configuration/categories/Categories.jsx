import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>Categories</div>
    </div>
  );
};


export default Categories;