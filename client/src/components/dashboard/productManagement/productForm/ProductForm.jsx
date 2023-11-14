import React, { useEffect, useState } from "react";
import s from "./ProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../redux/actions/productActions";
import { getCategories } from "../../../../redux/actions/categoryActions";
import { getImages } from "../../../../redux/actions/imageActions";
import { getColors } from "../../../../redux/actions/colorActions";
import { getSizes } from "../../../../redux/actions/sizeActions";
import Images from "./Images";
import CombinedVariation from "./CombinedVariation";

function ProductForm({getProducts}) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const colors = useSelector((state) => state.color.colors);
  const sizes = useSelector((state) => state.size.sizes);
  const images = useSelector((state) => state.image.images);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    categories: [],
    image: "",
    isVariant: false,
    available: true,
    variations: [],
  });
  const [imagesData, setImagesData] = useState([]);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [combinedVariation, setCombinedVariation] = useState([{}]);
  const [combinedActive, setCombinedActive] = useState(false);

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      variations: combinedVariation,
    }));
  }, [combinedVariation]);

  const validateForm = () => {
    // Implementa tus validaciones aquí
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor que 0";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Debes seleccionar al menos una categoría";
    }

    if (formData.images.length === 0) {
      newErrors.images = "Debes seleccionar al menos una imagen";
    }

    if (formData.isVariant && formData.variations.length === 0) {
      newErrors.variations = "Si es variable, debe tener al menos una variación";
    }
    if (formData.isVariant && formData.variations.length > 0) {
      formData.variations.forEach((variation) => {
        if (!variation.size) {
          newErrors.variations = "Si es variable, debe tener al menos una variación";
        }
      });
    }

    // Agrega más validaciones según tus requisitos

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    validateForm();
    if (!formValid) {
      return;
    }
    // Envía el formulario
    await dispatch(addProduct(formData));
  
    // Después de enviar el formulario con éxito, restablece los campos
    setFormData({
      name: "",
      description: "",
      images: [],
      price: 0,
      stock: 0,
      categories: [],
      image: "",
      isVariant: false,
      available: true,
      variations: [],
    });
    setSelectedSizes([]);
    setSelectedColors([]);
    setCombinedActive(false);
    // Después de la creación, obtén la lista de productos actualizada
    await dispatch(getProducts());
  };

  const handleSelectSize = (e) => {
    const sizeId = e.target.value;
    const sizeName = e.target.options[e.target.selectedIndex].getAttribute("name");
  
    if (sizeId && !selectedSizes.some((size) => size.id === sizeId)) {
      const size = { id: sizeId, name: sizeName };
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleRemoveSize = (sizeId) => {
    const newSelectedSizes = selectedSizes.filter((size) => size.id !== sizeId);
    setSelectedSizes(newSelectedSizes);
  };

  const handleChangeCategories = (e) => {
    const selectedCategoryId = e.target.value;
    if (!formData.categories.some(cat => cat.id === selectedCategoryId)) {
      // Agrega el nuevo ID de categoría al array
      setFormData({ ...formData, categories: [...formData.categories, { id: selectedCategoryId }] });
    }
  };

  const handleRemoveCategory = (categoryId) => {
    const newSelectedCategories = formData.categories.filter((cat) => cat.id != categoryId);
    console.log(newSelectedCategories);
    setFormData({ ...formData, categories: newSelectedCategories });
  };

  return (
    <div className={s.container}>
      <h2>Crear Producto</h2>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.input}>
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
          { errors.name && <p className={s.error}>{errors.name}</p> }
        </div>
        <div className={s.input}>
          <label htmlFor="description">Descripción:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>
        <div className={s.input}>
          <label htmlFor="price">Precio:</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          { errors.price && <p className={s.error}>{errors.price}</p> }
        </div>
        <div className={s.input}>
          <label htmlFor="category">Categorías:</label>
          <select 
            name="category" 
            value={formData.categories} 
            onChange={handleChangeCategories}
          >
            <option value="">Seleccionar</option>
            {
              categories.map((el) => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))
            }
          </select>
          { errors.categories && <p className={s.error}>{errors.categories}</p> }
          <div>
            <h4>Categorías seleccionadas:</h4>
            <ul>
              {/* {console.log(formData.categories)} */}
              {
                categories
                  .filter(cat => formData.categories.some(selectedCat => Number(selectedCat.id) === cat.id))
                  .map(selectedCategory => (
                    <div>
                      <li key={selectedCategory.id}>{selectedCategory.name}</li>
                      <button type="button" onClick={() => handleRemoveCategory(selectedCategory.id)}>X</button>
                    </div>
                  ))
              }
            </ul>
          </div>
        </div>
        <div className={s.input}>
          <label htmlFor="image">Imágenes:</label>
          <button type="button" onClick={() => setOpenGallery(true)}>Añadir imágenes</button>
          {errors.images && <p className={s.error}>{errors.images}</p>}
          {
            openGallery && (
              <Images 
                images={images}
                setOpenGallery={setOpenGallery}
                setImagesData={setImagesData}
                setFormData={setFormData}
              />
            )
          }
          <div className={s.imgSelectContainer}>
            <h4>Imágenes seleccionadas</h4>
            <div className={s.imgContent}>
              {
                formData && formData.images.map(el => (
                  <div className={s.cardImg}>
                    <img src={el.url} alt="" />
                    <div className={s.btnImg}>
                    <label>
                      <input
                        type="radio"
                        name="image"
                        value={el.url} // Puedes usar otro identificador único aquí si es necesario
                        checked={formData.image === el.url} // Marca como seleccionada si es la imagen principal
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                      />
                      Elegir principal
                    </label>
                    <button>Eliminar</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className={s.input}>
          <label htmlFor="available">Habilitado:</label>
          <input 
            type="checkbox" 
            name="available" 
            checked={formData.available} 
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
          />
        </div>
        <div className={s.variationContainer}>
          <h3>Añadir variaciones:</h3>
          <div className={s.input}>
            <label htmlFor="variable">Variable:</label>
            <input 
              type="checkbox" 
              name="variable" 
              checked={formData.isVariant} 
              onChange={(e) => setFormData({ ...formData, isVariant: e.target.checked })}
            />
          </div>
          {
            formData.isVariant && (
              <div className={s.formData}>
                <div className={s.input}>
                  <label htmlFor="size">Talle:</label>
                  <select
                    name="size"
                    value={selectedSizeId}
                    onChange={(e) => {
                      setSelectedSizeId(e.target.value);
                      handleSelectSize(e);
                    }}
                  >
                    <option value="">Seleccionar</option>
                    {
                      sizes.map((el) => (
                        <option
                          key={el.id}
                          value={el.id}
                          name={el.name}
                        >{el.name}</option>
                      ))
                    }
                  </select>
                  <div className={s.input}>
                    <h5 className={s.sizesSelected}>Talles seleccionados:</h5>
                    <ul className={s.sizesSelectedList}>
                      {
                        selectedSizes.map((el) => (
                          <div className={s.divSize}>
                            <li key={el.id}>{el.name}</li>
                            <button type="button" onClick={() => handleRemoveSize(el.id)}>X</button>
                          </div>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCombinedActive(true)}
                >Generar variaciones</button>
                {
                  combinedActive && (
                    <CombinedVariation 
                      selectedSizes={selectedSizes}
                      selectedColors={selectedColors}
                      combinedVariation={combinedVariation}
                      setCombinedVariation={setCombinedVariation}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )
                }
              </div>
            )
          }
          { errors.variations && <p className={s.error}>{errors.variations}</p> }
        </div>     
        <div>
          <button type="submit">Añadir</button>
        </div>
      </form>
    </div>
  );
}


export default ProductForm;