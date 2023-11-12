import React, { useEffect, useState } from "react";
import s from "./ProductManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { 
  getProducts, 
  getProductById, 
  addProduct, 
  deleteProduct, 
  updateProduct  } from '../../../redux/actions/productActions';
import { 
  getVariations, 
  addVariation, 
  updateVariation, 
  deleteVariation, 
  filterVariation } from '../../../redux/actions/variationActions'

const ProductManagement = () => {
  return(
    <div>Product Management</div>
  )
};


export default ProductManagement;