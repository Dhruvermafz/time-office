import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes } from "./routes";

// import { AuthContext } from "../context/AuthContext";

const Router = () => {
  // const { user } = useContext(AuthContext);

  // console.log("User in Router:", user);

  const renderRoutes = (routes) => {
    return routes.map(({ path, element: Element }, index) => (
      <Route key={index} path={path} element={<Element />} />
    ));
  };

  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <Routes>
        {renderRoutes(publicRoutes)}

        {/* {user && user.role === "admin" && renderRoutes(adminRoutes)}

        {user && user.role !== "admin" && (
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}

        {!user && <Route path="/admin/*" element={<Navigate to="/login" />} />} */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
