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
      <div className="form-login">
        <input
          className="form-input"
          placeholder="Adınızı Giriniz..."
          onChange={(e) => setName(e.target.value)}
        />
        <Link to={"/todo"}>
          <button type="button" onClick={userName} className="form-btn">
            Giriş
          </button>
        </Link>
      </div>
    </div>
  );
}
