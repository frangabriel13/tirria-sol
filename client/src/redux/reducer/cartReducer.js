const initialState = {
  cartItems: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, selectedVariation, quantity } = action.payload;
      
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = state.cartItems.findIndex((item) => {
        if(selectedVariation) {
          // Si es una variante, verificar por selectedVariation.id
          return (
            item.selectedVariation &&
            item.selectedVariation.id === selectedVariation.id
          );
        } else {
          // Si es un producto simple, verificar por product.id
          return item.product.id === product.id;
        }
      });

      if (existingItemIndex !== -1) {
        // El producto o variante ya existe en el carrito, actualiza la cantidad
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;

        const total = updatedCartItems.reduce((acc, item) => {
          const itemTotal = (item.selectedVariation ? item.selectedVariation.price : item.product.price) * item.quantity;
          return acc + itemTotal;
        }, 0);

        return {
          ...state,
          cartItems: updatedCartItems,
          total: total
        };
      } else {
        // El producto o variante no existe en el carrito, agrégalo
        const item = {
          product,
          selectedVariation,
          quantity,
        };

        const itemTotal = (selectedVariation ? selectedVariation.price : product.price) * quantity;

        const total = state.cartItems.reduce((acc, item) => {
          const itemTotal = (item.selectedVariation ? item.selectedVariation.price : item.product.price) * item.quantity;
          return acc + itemTotal;
        }, itemTotal); // También suma el nuevo item al total

        return {
          ...state,
          cartItems: [...state.cartItems, item],
          total: total,
        };
      }

    case 'REMOVE_FROM_CART':
      const productIdToRemove = action.payload;
      const updatedCartItems = state.cartItems.filter((item) => {
        if (item.product.isVariable) {
          // Si es un producto variable, verificar por selectedVariation.productId
          return item.selectedVariation.id !== productIdToRemove;
        } else {
          // Si es un producto simple, verificar por product.id
          return item.product.id !== productIdToRemove;
        }
      });

      const totalAfterRemoval = updatedCartItems.reduce((acc, item) => {
        const itemTotal = (item.selectedVariation ? item.selectedVariation.price : item.product.price) * item.quantity;
        return acc + itemTotal;
      }, 0);

      return {
        ...state,
        cartItems: updatedCartItems,
        total: totalAfterRemoval,
      };

    case 'INCREMENT_QUANTITY':
      const productIdToIncrement = action.payload;
      const incrementedCartItems = state.cartItems.map((item) => {
        if (item.product.isVariable) {
          // Si es un producto variable, verificar por selectedVariation.id
          if (item.selectedVariation.id === productIdToIncrement) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
        } else {
          // Si es un producto simple, verificar por product.id
          if (item.product.id === productIdToIncrement) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
        }
        return item;
      });
      
      const totalAfterIncrement = incrementedCartItems.reduce((acc, item) => {
        const itemTotal = (item.selectedVariation ? item.selectedVariation.price : item.product.price) * item.quantity;
        return acc + itemTotal;
      }, 0);
      
      return {
        ...state,
        cartItems: incrementedCartItems,
        total: totalAfterIncrement,
      };

    case 'DECREMENT_QUANTITY':
      const productIdToDecrement = action.payload;
      const decrementedCartItems = state.cartItems.map((item) => {
        if (item.product.isVariable) {
          // Si es un producto variable, verificar por selectedVariation.id
          if (item.selectedVariation.id === productIdToDecrement && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        } else {
          // Si es un producto simple, verificar por product.id
          if (item.product.id === productIdToDecrement && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        }
        return item;
      });
      
      const totalAfterDecrement = decrementedCartItems.reduce((acc, item) => {
        const itemTotal = (item.selectedVariation ? item.selectedVariation.price : item.product.price) * item.quantity;
        return acc + itemTotal;
      }, 0);
      
      return {
        ...state,
        cartItems: decrementedCartItems,
        total: totalAfterDecrement,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        total: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;