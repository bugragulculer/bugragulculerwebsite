import React from "react";
import { useLocation } from "react-router-dom";
import { AdminNav } from "../../components";

const Admin = () => {
  const params = useLocation();
  return (
    <div className="admin__page__container">
      <AdminNav location={params.pathname} />
      <div className="admin__cubes">
        <div>total visitors</div>
        <div>view stats (30 days)</div>
        <div>blog favorites</div>
        <div>total sales</div>
        <div>total orders</div>
        <div>average order value</div>
      </div>
    </div>
  );
};

export default Admin;
