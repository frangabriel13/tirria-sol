import React from "react";
import s from "./Dashboard.module.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Gallery from "./gallery/Gallery";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <SideBar />
      <div className={s.content}>
        <Routes>
          <Route path="/galeria" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;