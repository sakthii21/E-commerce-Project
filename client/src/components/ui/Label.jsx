// components/Label.js
import React from "react";

const Label = ({ children, className }) => {
  return (
    <label className={`block text-gray-700 font-medium ${className}`}>
      {children}
    </label>
  );
}

export default Label;
