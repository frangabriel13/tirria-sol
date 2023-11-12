import React, { useEffect, useState } from "react";
import s from "./ProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../redux/actions/productActions";
import { getCategories } from "../../../../redux/actions/categoryActions";
import { getImages } from "../../../../redux/actions/imageActions";
import { getColors } from "../../../../redux/actions/colorActions";
import { getSizes } from "../../../../redux/actions/sizeActions";

const ProductForm = () => {
  return(
    <div>Product Form</div>
  )
};


export default ProductForm;