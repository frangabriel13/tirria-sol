import React from "react";
import s from "./Dashboard.module.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Gallery from "./gallery/Gallery";
import Configuration from "./configuration/Configuration";
import ProductManagement from "./productManagement/ProductManagement";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <SideBar />
      <div className={s.content}>
        <Routes>
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/configuracion" element={<Configuration />} />
          <Route path="/productos" element={<ProductManagement />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;