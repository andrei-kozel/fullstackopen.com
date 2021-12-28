import React from "react";

export const Input = ({ value, handler }) => {
  return <input value={value} onChange={handler} />;
};
