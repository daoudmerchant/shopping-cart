import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

const HeaderBar = styled.header`
  display: grid;
  grid-template-areas: "logo basket" "search search";
  align-items: center;
  background-color: rgb(197, 51, 45);
  color: white;

  @media (min-width: 760px) {
    grid-template-areas: "logo search search basket";
  }
`;

const Logo = styled.h1`
  grid-area: logo;
  @media (min-width: 760px) {
    text-align: left;
    margin-left: 20px;
  }
`;

const SearchBar = styled.form`
  grid-area: search;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 1rem;
  margin-right: 10px;

  ::active {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 1rem;
`;

const CartIcon = styled.div`
  grid-area: basket;
  margin: 0 20px 0 0;
  height: 100%;
`;

const Header = ({ submitSearch, resetSearch, cartQuantity }) => {
  let history = useHistory();
  const [currentSearch, updateCurrentSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit search
    const searchText = e.target.firstChild.value;
    submitSearch(searchText);
    history.push("/");
  };
  return (
    <HeaderBar>
      <Link to="/" onClick={resetSearch}>
        <Logo id="logo">TheSwitchZone</Logo>
      </Link>
      <SearchBar id="search" onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={currentSearch}
          onChange={(e) => updateCurrentSearch(e.target.value)}
        />
        <SearchButton type="submit">Submit</SearchButton>
      </SearchBar>
      <NavLink
        to="/cart"
        activeStyle={{ backgroundColor: "white", color: "rgb(197, 51, 45)" }}
      >
        <CartIcon>{`Cart: ${cartQuantity}`}</CartIcon>
      </NavLink>
    </HeaderBar>
  );
};

export default Header;
