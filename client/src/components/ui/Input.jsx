
// components/Input.js
import React from "react";

const Input = ({ type = "text", value, onChange, placeholder, id, name }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      name={name}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
};

export default Input;
