import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions/productActions';
import s from './ProductDetails.module.css';
import { getVariations } from '../../redux/actions/variationActions';
import { calculateTotal, randomPhoneNumber } from '../../utils/helpers';
import { addToCart } from '../../redux/actions/cartActions';

const ProductDetail = ({ productId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product.productById);
  const variations = useSelector((state) => state.variation.variations);

  const [selectedImage, setSelectedImage] = useState(null);
  const imagesRef = useRef(null);

  const [quantity, setQuantity] = useState(1);
  const [variationQuantities, setVariationQuantities] = useState({});

  const [selectedColor, setSelectedColor] = useState(null);
  const [uniqueColors, setUniqueColors] = useState({});
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(productId))
      .then(() => {
        setLoading(false);
        dispatch(getVariations(productId));
      });
      window.scrollTo(0, 0);
  }, [dispatch, productId]);
  
  // useEffect(() => {
  //   const uniqueColorsTemp = {};
  //   product.variations.forEach((el) => {
  //     uniqueColorsTemp[el.color.name] = { id: el.color.id, name: el.color.name };
  //   });
  //   setUniqueColors(uniqueColorsTemp);
  //   const defaultColor = Object.values(uniqueColorsTemp)[0];
  //   setSelectedColor(defaultColor.id);
  // }, [product]);
  useEffect(() => {
    if (product && product.variations) {
      const uniqueColorsTemp = {};
      product.variations.forEach((el) => {
        uniqueColorsTemp[el.color.name] = { id: el.color.id, name: el.color.name };
      });
      setUniqueColors(uniqueColorsTemp);
      const defaultColor = Object.values(uniqueColorsTemp)[0];
      setSelectedColor(defaultColor.id);
    }
  }, [product]);

  if (loading) return <p>Cargando...</p>

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleDecrement = (variation) => {
    const currentQuantity = variationQuantities[variation.id] || 0;
    if (currentQuantity > 0) {
      setVariationQuantities({
        ...variationQuantities,
        [variation.id]: currentQuantity - 1,
      });
    }
  };
  
  const handleIncrement = (variation) => {
    const currentQuantity = variationQuantities[variation.id] || 0;
    if (currentQuantity < variation.stock) {
      setVariationQuantities({
        ...variationQuantities,
        [variation.id]: currentQuantity + 1,
      });
    }
  };

  const handleQuantityChange = (variationId, newQuantity) => {
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setVariationQuantities({
        ...variationQuantities,
        [variationId]: newQuantity,
      });
    }
  };

  const handleAddToCart = () => {
    if (product.isVariant) {
      // Es un producto con variaciones, debes encontrar la variación seleccionada
      const selectedVariations = variations.filter((variation) => {
        const quantity = variationQuantities[variation.id] || 0;
        
        return quantity > 0;
        
      });
    
  
      if (selectedVariations.length === 0) {
        // No se ha seleccionado ninguna variación
        alert("Por favor, seleccione al menos una variación antes de agregar al carrito.");
      } else {
        // Agrega todas las variaciones seleccionadas al carrito
        selectedVariations.forEach((selectedVariation) => {
          const quantity = variationQuantities[selectedVariation.id];
          dispatch(addToCart(product, selectedVariation, quantity));
        });
        setVariationQuantities({});
        // Redirige al usuario al carrito
        // history.push('/carrito'); // Puedes redirigir al usuario a la página del carrito si es necesario
      }
    } else {
      // Es un producto simple, agrega la cantidad seleccionada al carrito
      dispatch(addToCart(product, null, quantity));
      setQuantity(1);
      // Redirige al usuario al carrito
      // history.push('/carrito'); // Puedes redirigir al usuario a la página del carrito si es necesario
    }
  
    
  };
  
  // Define la función animateButton fuera de handleAddToCart
 
  const handleImageClick = (image) => {
    setSelectedImage(image.url);
    imagesRef.current.scrollTop = image.index * (image.height + 20); // Ajusta el desplazamiento vertical según la imagen seleccionada
  };
  
  const handleConsultWhatsapp = () => {
    const phoneNumber = randomPhoneNumber();
    const message = encodeURIComponent('Hola, les quería hacer una consulta');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

 

  const sortVariations = (variations) => {
    let productVariations = variations.filter((variation) => variation.product.id === product.id);

    if(selectedColor) {
      productVariations = productVariations.filter((variation) => variation.colorId === selectedColor);
    }

    return productVariations.sort((a, b) => {
      const sizeA = a.size ? a.size.name.toLowerCase() : '';
      const sizeB = b.size ? b.size.name.toLowerCase() : '';
      if (sizeA < sizeB) return -1;
      if (sizeA > sizeB) return 1;
      if (a.stock < b.stock) return -1; // Agrega esta línea para comparar el stock
      if (a.stock > b.stock) return 1; // Agrega esta línea para comparar el stock
      return 0;
    });
  };

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
    setActiveColor(colorId); // Actualiza el color activo
    setVariationQuantities({});
  };
  
  return (
    <div className={s.divUni}>
      <h1 className={s.minimo}>Es necesario alcanzar un mínimo de $50,000 en tu carrito, Podes elegir diferentes modelos y talles</h1>
      <div className={s.divGlobal}>
        
        <div className={s.divPhotos}>
          <div className={s.gallery}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Image ${index + 1}`}
                className={`${s.galleryImage} ${selectedImage === image.url ? s.selected : ''}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>

          <div className={s.divImage} ref={imagesRef}>
            {
              selectedImage ? (
                <div className={s.productoDetailImages}>
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className={s.productoDetailImage}
                  />
                </div>
              ) : (
                <div
                  className={s.productoDetailImages}
                  style={{ scrollSnapType: 'y mandatory', scrollPadding: '200px 0' }}>
                  {
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Image ${index + 1}`}
                        className={s.productoDetailImage}
                        onClick={() => setSelectedImage(image.url)}
                      />
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
        <div className={s.productoDetail}>
          <div className={s.continent}>
          <h2 className={s.productoDetailName}>{product && product.name ? product.name : 'Cargando...'}</h2>
            <p className={s.productoDetailPrice}>${product.price}</p>
            {
              product.isVariant === false ? 
              <div className={s.divVariant}>
                <h3>Seleccione la cantidad:</h3>
                <div className={s.btnQuantity}>
                  <button className={s.decrement} onClick={decrementQuantity}>-</button>
                  <input type="number" value={quantity}
                    className={s.quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    readOnly
                  />
                  <button className={s.increment} onClick={incrementQuantity}>+</button>
                </div>
              </div> : 
              <div className={s.divVariant}>
                <h3>Seleccione el color:</h3>
                <div className={s.divColors}>
                    {Object.values(uniqueColors).map((color) => (
                      <button
                        key={color.id}
                        className={`${s.buttonColor} ${activeColor === color.id ? s.activeColor : ''}`}
                        onClick={() => handleColorChange(color.id)}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                <h3>Seleccione la cantidad por talle:</h3>
                {
                  sortVariations(variations).map((variation) => (
                    <div className={s.divQuantity} key={variation.id}>
                      <p>{variation && variation.size.name}</p>
                      <p>Stock: {variation.stock}</p> {/* Agrega esta línea para mostrar el stock */}
                      {
                        variation.available === true ?
                          <div className={s.btnQuantity}>
                            <button className={s.decrement} onClick={() => handleDecrement(variation)}>-</button>
                            <input type="number"
                              className={s.quantity}
                              value={variationQuantities[variation.id] || 0} 
                              onChange={(e) => handleQuantityChange(variation.id, parseInt(e.target.value, 10))}
                              readOnly
                            />
                            <button className={s.increment} onClick={() => handleIncrement(variation)}>+</button>
                          </div> :
                          <p className={s.cant}>Sin Stock</p>
                      }
                    </div>
                  ))
                }
              </div>
            }
            <p className={s.cantTotal}>Total:   ${calculateTotal(product, quantity, variations, variationQuantities)}</p>
            <button className={s.buttonCart} onClick={handleAddToCart}>Agregar al carrito</button>
            <br/>
            <button
              className={s.buttonWP}
              onClick={handleConsultWhatsapp}
            >
              Consultanos al Whatsapp
            </button>
          </div>
        </div>
      </div>
      <div className={s.divDescription}>
        <p className={s.productoDetailDescription}>
          Description: {product.description && product.description}
        </p>
      </div>
      <h2 className={s.relacionados}>Productos relacionados</h2>
    </div>
  ) 
}

export default ProductDetail;