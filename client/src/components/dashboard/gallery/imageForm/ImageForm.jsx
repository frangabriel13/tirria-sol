import React, { useState } from "react";
import s from "./ImageForm.module.css";
import { useDispatch } from "react-redux";
import { createImage } from "../../../../redux/actions/imageActions";

const ImageForm = ({ setShowForm }) => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImages = (e) => {
    const files = e.target.files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    setSelectedImages(images);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createImage(selectedImages));
    setShowForm(false);
  };
  
  return(
    <div className={s.container}>
      <h3>Subir imágenes</h3>
      <form className={s.form} onSubmit={handleSubmit}>
        <input className={s.input} type="file" name="images" onChange={handleImages} multiple />
        <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
        <button type="submit">Subir</button>
      </form>
    </div>
  )
};


export default ImageForm;