import React, { useEffect, useState } from "react";
import s from "./productManagement.module.css";
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
  filterVariations } from '../../../redux/actions/variationActions';
import ProductForm from './productForm/ProductForm';
import ProductEditForm from './productEditForm/ProductEditForm';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const allProducts = useSelector((state) => state.product.allProducts);
  const variations = useSelector((state) => state.variation.variations);
  const allVariations = useSelector((state) => state.variation.allVariations);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariation, setEditingVariation] = useState(null);
  const [newVariationPrice, setNewVariationPrice] = useState("");
  
  useEffect(() => {
    dispatch(getProducts());
  }, [selectedTab]);

  useEffect(() => {
    dispatch(getVariations());
  }, [selectedTab]);

  useEffect(() => {
    // Actualiza la vista previa cuando se selecciona un producto
    const selected = allProducts.find((el) => el.id === selectedProduct);
    setPreviewProduct(selected);
  }, [selectedProduct]);

  const handleFilterVariations = (id) => {
    setSelectedProduct(parseInt(id));
    dispatch(filterVariations(id));
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditingProduct(productToEdit);
  }

  const handleCancelEdit = async () => {
    setEditingProduct(null);
    await dispatch(getProducts());
  }

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id))
    .then(() => {
      dispatch(getProducts());
    });
  };

  const handleEditVariation = (variationId) => {
    // Encuentra la variación que se va a editar en función del ID
    const variationToEdit = variations.find((el) => el.id === variationId);
  
    if (variationToEdit) {
      // Al hacer clic en "Editar", establece la variación que se está editando en el estado
      setEditingVariation(variationToEdit);
      // También establece el precio actual de la variación en el estado newVariationPrice
      setNewVariationPrice(variationToEdit.price.toString()); // Convierte el precio a una cadena
    } else {
      console.error(`No se pudo encontrar la variación con ID ${variationId}`);
    }
  };

  const handleUpdateVariation = async (e) => {
    e.preventDefault();
  
    if (editingVariation) {
      const updatedVariation = {
        ...editingVariation,
        price: parseFloat(newVariationPrice),
        available: editingVariation.available,
      };
  
      // Primero, llama a la acción para actualizar la variación en el estado global
      // console.log('ed:', editingVariation)
      // console.log('up: ', updatedVariation)
      await dispatch(updateVariation(updatedVariation));
  
      // Después de la actualización exitosa, obtén la lista de variaciones actualizada
      await dispatch(getProducts())
      await dispatch(getVariations());
  
      // Limpia el estado de newVariationPrice y cancela la edición
      setNewVariationPrice("");
      setEditingVariation(null);
    }
  };

  const compareVariationsBySize = (a, b) => {
    const sizeA = a.size ? a.size.name : ''; // Verifica si 'size' es nulo antes de acceder a 'name'
    const sizeB = b.size ? b.size.name : ''; // Verifica si 'size' es nulo antes de acceder a 'name'
  
    // Realiza la comparación de las cadenas de tamaño (si son cadenas)
    return sizeA.localeCompare(sizeB);
  };

  return (
    <div className={s.container}>
      <h2>Administrar de productos</h2>
      <div className={s.content}>
        <ul>
          <li className={selectedTab === 0 ? s.selected : ""} onClick={() => setSelectedTab(0)}>Productos</li>
          <li className={selectedTab === 1 ? s.selected : ""} onClick={() => setSelectedTab(1)}>Variaciones</li>
        </ul>
        <div className={s.tableContainer}>
          {
            selectedTab === 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Variable</th>
                    {/* <th>Categorías</th> */}
                    <th>Precio</th>
                    <th>Habilitado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((el) => (
                      <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.isVariant ? 'Sí' : 'No'}</td>
                        {/* <td>{el.category ? el.category.name : 'No'}</td> */}
                        <td>{el.price}</td>
                        <td>{el.available ? 'Sí' : 'No'}</td>
                        <td>
                          <button onClick={() => {setSelectedProduct(el.id)}}>Ver</button>
                        </td>
                        <td>
                          <button onClick={() => handleEditProduct(el.id)}>Editar</button>
                          <button onClick={() => handleDeleteProduct(el.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ) : (
              <div className={s.list}>
                <select
                  onChange={(e) => handleFilterVariations(e.target.value)}
                >
                  <option>Seleccionar</option>
                  {
                    allProducts.filter((el) => el.isVariant).map((el) => (
                      <option key={el.id} value={el.id}>{el.name}</option>
                    ))
                  }
                </select>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Talle</th>
                      <th>Color</th>
                      <th>Precio</th>
                      <th>Habilitado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      variations
                        .filter((el) => el.productId === selectedProduct) // Filtra las variaciones por el producto seleccionado
                        .slice()
                        .sort(compareVariationsBySize)
                        .map((el) => (
                          // Resto de tu código para mostrar las variaciones
                          <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.size ? el.size.name : 'Sin tamaño'}</td>
                            <td>{el.color ? el.color.name : 'Sin color'}</td>
                            <td>{el.price}</td>
                            <td>{el.available ? 'Sí' : 'No'}</td>
                            <td>
                              <button onClick={() => handleEditVariation(el.id)}>Editar</button>
                            </td>
                          </tr>
                        ))
                    }                   
                  </tbody>
                </table>
              </div>
            )
          }
          {
            editingVariation &&
          <div className={s.editVariationForm}>
            <h3>Editar Variación</h3>
            <form onSubmit={handleUpdateVariation}>
              <div>
                <label htmlFor="newVariationPrice">Nuevo Precio:</label>
                <input
                  type="text"
                  id="newVariationPrice"
                  value={newVariationPrice}
                  onChange={(e) => setNewVariationPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="availability">Habilitado</label>
                <input
                  type="checkbox"
                  id="available"
                  checked={editingVariation.available}
                  onChange={(e) => {
                    const updatedVariation = {
                      ...editingVariation,
                      available: e.target.checked,
                    };
                    setEditingVariation(updatedVariation);
                  }}
                />
              </div>
              <div>
                <button type="submit">Guardar</button>
                <button onClick={() => setEditingVariation(null)}>Cancelar</button>
              </div>
            </form>
          </div>
          }
        </div>
      </div>
      <ProductForm getProducts={getProducts} />
      {
        editingProduct && (
          <ProductEditForm 
            product={editingProduct}
            onCancelEdit={handleCancelEdit}
          />
        )
      }
    </div>
  );
};


export default ProductManagement;