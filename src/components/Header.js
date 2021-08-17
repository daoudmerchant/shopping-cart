import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

// icon
import cartIcon from "../images/icons/cart-icon.png";

const HeaderBar = styled.header`
  display: grid;
  grid-template-areas: "logo basket" "search search";
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  background-color: rgb(197, 51, 45);
  color: white;
  padding-bottom: 20px;

  @media (min-width: 760px) {
    grid-template-areas: "logo search search basket";
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
  }
`;

const Logo = styled.h1`
  grid-area: logo;
  margin: 0;
  margin-left: 30px;

  @media (min-width: 760px) {
    text-align: left;
    width: 20%;
  }
`;

const SearchBar = styled.form`
  grid-area: search;
  display: flex;
  margin: 20px 30px 0;

  @media (min-width: 760px) {
    margin-top: 0;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  padding-left: 15px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 1rem 0 0 1rem;
  width: 80%;

  ::active {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 0 1rem 1rem 0;
  cursor: pointer;
  width: 20%;

  &&:hover {
    box-shadow: none;
  }
`;

const CartButton = styled.div`
  grid-area: basket;
  position: relative;
  height: 100%;
  justify-content: right;
  margin: 0;
  float: right;
  margin: 0 50px;
`;

const CartIcon = styled.img`
  height: 45px;
  filter: invert(98%) sepia(0%) saturate(0%) hue-rotate(153deg) brightness(105%)
    contrast(102%);
  padding: 10px 0;
  margin: 0 auto;
`;

const CartCount = styled.p`
  text-justify: center;
  font-size: 0.8rem;
  width: 50px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;

  // adjust to fit inside of cart icon
  left: 7px;
  top: 5px;
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
      <Link
        to="/"
        onClick={resetSearch}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Logo id="logo">TheSwitchZone</Logo>
      </Link>
      <SearchBar id="search" onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={currentSearch}
          onChange={(e) => updateCurrentSearch(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchBar>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink
          to="/cart"
          activeStyle={{
            backgroundColor: "rgb(240, 148, 144)",
          }}
        >
          <CartButton>
            <CartIcon src={cartIcon} alt="Cart Icon" />
            <CartCount>{cartQuantity < 100 ? cartQuantity : "99+"}</CartCount>
          </CartButton>
        </NavLink>
      </div>
    </HeaderBar>
  );
};

export default Header;
