import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import Detail from './components/detail/Detail';
import Login from './components/login/Login';
import Categories from './components/categories/Categories';
import ProductsByCategory from './components/productByCategory/ProductByCategory';
import Search from './components/search/Search';
import Cart from './components/cart/Cart';
import Tienda from './components/tienda/Tienda';  

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.includes('dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path='/products/:id' element={<Detail />} />
        <Route path='/login-admin' element={<Login />} /> 
        <Route path='/categories' element={<Categories />} /> 
        <Route path='/categories/:categoryId' element={<ProductsByCategory/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/tienda' element={<Tienda />} />
      </Routes>
    </>
  );
}


export default App