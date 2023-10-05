import React from "react";
import s from "./Dashboard.module.css";
import SideBar from "./sideBar/SideBar";

const Dashboard = () => {
  return (
    <div className={s.container}>
      <SideBar />
      <div className={s.content}>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};


export default Dashboard;