import React from "react";
import { Input } from "../Input";

export const PersonForm = ({
  name,
  nameHandler,
  number,
  numberHandler,
  buttonHandler,
}) => {
  return (
    <form>
      <div>
        name: <Input value={name} handler={nameHandler} />
      </div>
      <div>
        number: <Input value={number} handler={numberHandler} />
      </div>
      <div>
        <button type="submit" onClick={buttonHandler}>
          add
        </button>
      </div>
    </form>
  );
};
