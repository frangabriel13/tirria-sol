const initialState = {
  products: [],
  allProducts: [],
  productById: {},
  searchTerm: '',
  navbarSearchResults: [],
};

export function searchProductsHeader(products, searchTerm) {
  const keyword = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
  );

  console.log('Search Term:', searchTerm);
  console.log('Filtered Products:', filteredProducts);

  return filteredProducts;
}

export function searchProducts(products, searchTerm) {
  const keyword = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
  );

  console.log('Search Term:', searchTerm);
  console.log('Filtered Products:', filteredProducts);

  return filteredProducts;
}

function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload
      }
    case 'GET_PRODUCT_BY_ID':
      return {
        ...state,
        productById: action.payload
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
      }
      case 'FILTER_PRODUCTS':
        const allProducts = state.allProducts;
        if (action.payload) {
          console.log('Payload:', action.payload);
          const productFiltered = allProducts.filter((product) => {
            return product.categories.some((el) => el.id === parseInt(action.payload));
          });
          console.log('Filtered Products:', productFiltered);
          return {
            ...state,
            products: productFiltered,
          };
        } else {
          // Si categoryId no está definido, devuelve todos los productos
          return {
            ...state,
            products: allProducts,
          };
        }
        case 'SEARCH_PRODUCTS':
          const searchResult = searchProducts(state.allProducts, action.payload);
              return {
                  ...state,
                  products: [...searchResult],
                };
   
    
              case 'SEARCH_PRODUCTS_NAVBAR':
                const keyword = action.payload.trim().toLowerCase();
                // Llamar a la función searchProductsHeader para obtener los resultados
                const searchResults = searchProductsHeader(state.allProducts, keyword);
              
                // Puedes limitar la cantidad de resultados que se muestran en el navbar, por ejemplo, a 5 resultados
                const navbarResults = searchResults.slice(0, 5);
              
                return {
                  ...state,
                  navbarSearchResults: navbarResults,
                };
                case 'CLEAR_SEARCH_RESULTS':
                  return {
                    ...state,
                    navbarSearchResults: []
                  }  
    default:
      return state;
  }
}


export default productReducer;