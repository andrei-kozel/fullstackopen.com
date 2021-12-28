import React from "react";
import { Input } from "../Input";

export const Filter = ({ filter, handler }) => {
  return (
    <div>
      filter shown with: <Input value={filter} handler={handler} />
    </div>
  );
};
