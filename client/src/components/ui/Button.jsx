// src/components/ui/Button.jsx

import React from "react";

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
