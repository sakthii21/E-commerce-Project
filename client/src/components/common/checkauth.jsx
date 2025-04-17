import React from 'react';
import { useLocation, Navigate } from 'react-router';

function Checkauth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log(location.pathname,isAuthenticated)
  if (
    !isAuthenticated &&
    !(location.pathname.includes("/login") || location.pathname.startsWith("/register"))
  ) {
    return <Navigate to="/auth/login" replace />;
  
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.startsWith("/register"))
  ) {
    const redirectPath = user?.role === "admin" ? "/admin/dashboard" : "/shop/home";
    return <Navigate to={redirectPath} replace />;
  }
  

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" replace/>
  }

  // ✅ Allow all roles to access /shop route
  return <>{children}</>;
}

export default Checkauth;
