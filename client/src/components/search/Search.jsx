import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from "./Search.module.css";
import { Link, NavLink } from "react-router-dom";
import { searchProducts } from '../../redux/actions/productActions';  
import { getProducts } from '../../redux/actions/productActions';

function Search() { 


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);

  const [showResults, setShowResults] = useState(false);
  const navbarSearchResults = useSelector((state) => state.product.navbarSearchResults);

useEffect(() => {

 

  // const headerRef = useRef(null);
  // const [scrolled, setScrolled] = useState(false);

  dispatch(getProducts());
      const handleDocumentClick = (e) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
          setShowResults(false);
        }
      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, [dispatch]);

const handleSearchInputChange = (e) => {
  const term = e.target.value;
  dispatch(searchProducts(term));
  setShowResults(true);
};

const handleSearchResultClick = (productId) => {
  navigate(`/products/${productId}`);
  setShowResults(false);
};

const handleSeeMoreClick = () => {
  navigate(`/search/${searchTerm}`);
  setShowResults(false);
};

return (
    <div className={s.navContainer}>
        <div className={s.searchContainer}>
          <input
            ref={inputRef}
            onClick={() => setShowResults(true)} 
            className={s.searchInput}
            type="text"
            onChange={handleSearchInputChange}
            placeholder="Buscar" 
          />
          {
            showResults && (
              <div ref={searchResultsRef} className={s.searchResults}>
                {
                  navbarSearchResults && navbarSearchResults.length === 0 && (
                    <div>no andaaaaaaaaa</div>
                  )
                }
                {
                  navbarSearchResults && navbarSearchResults.map((result) => (
                    <div
                      key={result.id}
                      className={s.resultItem}
                      onClick={() => handleSearchResultClick(result.id)}  >
                      <img src={result.images[0]?.url || ''} alt={result.name} />
                      <span className={s.nameProduct}>{result.name}</span>
                      <span className={s.priceProduct}>${result.price}</span>
                    </div>
                  ))
                }
                {
                  navbarSearchResults && navbarSearchResults.length > 5 && (
                    <div className={s.seeMore} onClick={handleSeeMoreClick}>
                      Ver más resultados
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
     </div>      
)


}

export default Search;