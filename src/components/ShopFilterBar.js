import React from "react";
import styled from "styled-components";

const OptionsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 760px) {
    display: flex;
    justify-content: space-between;
  }
`;

const ShopFilterBar = ({
  changeCategory,
  hideOOS,
  toggleHideOOS,
  isGrid,
  toggleView,
}) => {
  return (
    <OptionsBar id="optionsbar">
      <div id="choosecategory">
        <label htmlFor="productcategory">Category:</label>
        <select
          id="productcategory"
          onChange={(e) => changeCategory(e.target.value)}
        >
          <option defaultValue="all" value="all" name="category">
            All
          </option>
          <option value="console" name="category">
            Consoles
          </option>
          <option value="game" name="category">
            Games
          </option>
          <option value="accessory" name="category">
            Accessories
          </option>
        </select>
      </div>
      <div id="toggleview">
        <label htmlFor="chooseview">View:</label>
        <input
          type="radio"
          value="grid"
          name="view"
          checked={isGrid}
          onChange={toggleView}
        />
        Grid
        <input
          type="radio"
          value="list"
          name="view"
          checked={!isGrid}
          onChange={toggleView}
        />
        List
      </div>
      <div id="toggleoos">
        <label htmlFor="hideoos">Hide out of stock:</label>
        <input
          type="checkbox"
          defaultChecked={hideOOS}
          onChange={(e) => toggleHideOOS(e.target.checked)}
        />
      </div>
      <div id="chooseorder">
        <label htmlFor="productorder">Order:</label>
        <select id="productorder">
          <option defaultValue="none">-</option>
          <option value="cheapestfirst" name="order">
            Price (lowest to highest)
          </option>
          <option value="cheapestlast" name="order">
            Price (highest to lowest)
          </option>
        </select>
      </div>
    </OptionsBar>
  );
};

export default ShopFilterBar;
