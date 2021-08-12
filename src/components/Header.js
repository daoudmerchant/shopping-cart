import React, { useState } from "react";
import styled from "styled-components";

const HeaderBar = styled.header`
  display: grid;
  grid-template-areas: "logo basket" "search search";
  align-items: center;

  @media (min-width: 760px) {
    grid-template-areas: "logo search search basket";
  }
`;

const Logo = styled.h1`
  grid-area: logo;
`;

const SearchBar = styled.form`
  grid-area: search;
`;

const CartIcon = styled.p`
  grid-area: basket;
`;

const Header = ({ submitSearch }) => {
  const [currentSearch, updateCurrentSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit search
    submitSearch(e.target.firstChild.value);
  };
  return (
    <HeaderBar>
      <Logo id="logo">CoolShop</Logo>
      <SearchBar id="search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentSearch}
          onChange={(e) => updateCurrentSearch(e.target.value)}
        />
        <button type="submit">Submit</button>
      </SearchBar>
      <CartIcon>Basket</CartIcon>
    </HeaderBar>
  );
};

export default Header;
