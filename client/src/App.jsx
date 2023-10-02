import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App
