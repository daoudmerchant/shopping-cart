import React, { useState } from "react";
import styled from "styled-components";
import CartIcon from "./CartIcon";

const Header = () => {
  const HeaderBar = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  const [currentSearch, updateCurrentSearch] = useState("");
  const handleSubmit = (e) => {
    // handle submit search
    e.preventDefault();
  };
  return (
    <HeaderBar>
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
    </HeaderBar>
  );
};

export default Header;
