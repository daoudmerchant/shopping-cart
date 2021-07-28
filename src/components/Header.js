import React, { useState } from "react";
import CartIcon from "./CartIcon";

const Header = () => {
  const [currentSearch, updateCurrentSearch] = useState("");
  const handleSubmit = (e) => {
    // handle submit search
    e.preventDefault();
  };
  return (
    <header>
      <h1 id="logo">CoolShop</h1>
      <form id="search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentSearch}
          onChange={(e) => updateCurrentSearch(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <CartIcon />
    </header>
  );
};

export default Header;
