import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./Dashboard.module.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Gallery from "./gallery/Gallery";
import Configuration from "./configuration/Configuration";
import ProductManagement from "./productManagement/productManagement";
import General from "./general/General";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("Usuario no está autenticado, redirigiendo a /");
      navigate("/login-admin");
    }
  }, [token, navigate]); // Agrega user y navigate como dependencias del efecto

  return (
    <div className={s.container}>
      <SideBar />
      <div className={s.content}>
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/configuracion" element={<Configuration />} />
          <Route path="/productos" element={<ProductManagement />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;