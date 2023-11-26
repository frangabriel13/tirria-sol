import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../../redux/actions/cartActions';
import s from './Cart.module.css';
import { randomPhoneNumber } from '../../utils/helpers';
import { updateVariation } from '../../redux/actions/variationActions';
import { getProductById } from '../../redux/actions/productActions';
import { getVariations } from '../../redux/actions/variationActions';
import { useEffect, useState } from 'react';


const Cart = ({productId}) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productById);
  const variations = useSelector((state) => state.variation.variations);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(true);
  const [editVariation, setEditVariation] = useState({});

  const total = useSelector((state) => state.cart.total);
  

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(productId))
      .then(() => {
        setLoading(false);
        dispatch(getVariations(productId));
      });
  }, [dispatch, productId]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };


  const handleWhatsAppClick = () => {

    if (!cartItems || cartItems.length === 0) {
      // console.error('No hay elementos en el carrito.');
      return;
    }
  
    // Utilizar async/await para manejar la asincronía
    const updateVariationAsync = async (item) => {
      // console.log('Item antes del error:', item);
  
      const variationId = item.selectedVariation.id;
      const variation = variations.find((v) => v.id === variationId);
  
      if (variation) {
        const newStock = Math.max(0, variation.stock - item.quantity);
  
        // Utilizar await para manejar la asincronía de setEditVariation
        await setEditVariation({ ...variation, stock: newStock });
  
        // Despachar la acción después de que setEditVariation haya completado
        dispatch(updateVariation({ id: variation.id, stock: newStock }));
      } else {
        // console.error(`No se encontró la variación para el producto: ${item.product.name}`);
      }
    };
  
    // Utilizar Promise.all para esperar a que todas las actualizaciones se completen
    Promise.all(cartItems.map(updateVariationAsync))
      .then(() => {
        // console.log('Todas las actualizaciones completadas');
      })
      .catch((error) => {
        // console.error('Error al actualizar variaciones:', error);
      });
  //   // Crear un mensaje detallado con los elementos del carrito
  //   const message = cartItems.map((item) => {
       
  //     const itemName = item.product.name;
  //     const itemPrice = item.selectedVariation ? item.selectedVariation.price : item.product.price;
  //     const itemQuantity = item.quantity;
  //     const itemSize = item.selectedVariation ? ` - Talle: ${item.selectedVariation.size.name}` : ''; // Agrega el talle si está disponible
  //     return `${itemName}${itemSize} - Precio: $${itemPrice} - Cantidad: ${itemQuantity}`;
  // }).join('\n');

  //   // Generar el enlace de WhatsApp
  //   const phoneNumber = randomPhoneNumber() // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
  //   const whatsappMessage = encodeURIComponent(`¡Hola! Me gustaría realizar el siguiente pedido:\n\n${message}\n\nTotal: $${total}`);
  //   const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`;

  //   // Redireccionar a la URL de WhatsApp
  //   window.location.href = whatsappURL;
  };
 

  return (
    <div className={s.cart}>
      <h2>Carrito de Compras</h2>
      {
        cartItems.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <div>
            <ul>
              {
                cartItems.map((item) => (
                  <li key={item.selectedVariation ? item.selectedVariation.id : item.product.id} className={s['cart-item']}>
                    <div className={s.content} >
                      <div className={s.nombPrice}>
                        <img src={item.product.images[0].url} alt={item.product.name} />
                        <p>Nombre: {item.product.name}</p>
                        <p>Talle: {item.selectedVariation ? item.selectedVariation.size.name : 'Único'}</p>
                        <p>Precio: ${item.selectedVariation ? item.selectedVariation.price : item.product.price}</p>
                      </div>
                      <div className={s.canti}>
                        <p>Cantidad:</p>
                        <button onClick={() => handleDecrement(item.selectedVariation ? item.selectedVariation.id : item.product.id)}>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={() => handleIncrement(item.selectedVariation ? item.selectedVariation.id : item.product.id)}>+</button>
                        <button className={s['cart-button']} onClick={() => handleRemoveFromCart(item.selectedVariation ? item.selectedVariation.id : item.product.id)}>Eliminar</button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            <p className={s.totalCompra}>Total de la compra: ${total}</p>
          </div>
        )
      }
      <button className={s.buttonClear} onClick={() => dispatch(clearCart())}>Limpiar Carrito</button>
      <button className={s.buttonWP} onClick={handleWhatsAppClick}>
         Comprar por Whatsapp
       </button>

    </div>
  );
};

export default Cart;