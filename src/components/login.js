import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  const userName = () => {
    localStorage.setItem("name", name);
  };
  return (
    <div>
      <div className="form-group">
        <input placeholder="İsim" onChange={(e) => setName(e.target.value)} />
      </div>
      <Link to={"/todo"}>
        <button type="button" onClick={userName} className="todo__add">
          Ekle
        </button>
      </Link>
    </div>
  );
}
