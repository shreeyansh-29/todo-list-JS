import React from "react";
import "./list.css";

function ListItems({key, id, value, onSelect}) {
  return (
    <div className="todo_style">
      <button
        onClick={() => {
          onSelect(id);
        }}
        className="delete"
      >
        x
      </button>
      <li key={key}>{value}</li>
    </div>
  );
}

export default ListItems;
