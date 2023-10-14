import React, { useEffect, useState } from "react";
import s from "./Gallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteImage } from "../../../redux/actions/imageActions";
import ImageForm from "./imageForm/ImageForm";

const Gallery = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Galería de imágenes</h2>
        <button onClick={() => setShowForm(!showForm)}>Agregar</button>
        {
          showForm && <ImageForm setShowForm={setShowForm} />
        }
      </div>
    </div>
  );
};


export default Gallery;