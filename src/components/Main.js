import React, { useState } from "react";
import inventory from "../inventory";
import styled from "styled-components";

const OptionsBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = () => {
  // initialise state

  const [isGrid, setIsGrid] = useState(true);
  const toggleView = (e) => {
    const gridIsSelected = e.target.value === "grid" ? true : false;
    setIsGrid(gridIsSelected);
  };

  const storefrontInventory = inventory.map((item) => {
    if (!item.options) {
      return item;
    }
    item.imageUrl = item.options[0].imageUrl;
    let hasMultiplePrices = false;
    const lowestPriceItem = item.options.reduce((prevOption, thisOption) => {
      if (thisOption.price !== prevOption.price) {
        hasMultiplePrices = true;
      }
      return thisOption.price < prevOption.price ? thisOption : prevOption;
    });
    hasMultiplePrices
      ? (item.lowestPrice = lowestPriceItem.price)
      : (item.price = lowestPriceItem.price);
    item.inStock = item.options.some((option) => option.inStock);
    delete item.options;
    return item;
  });

  return (
    <div>
      <h1>Nintendo Switch</h1>
      {/* Extract form in to component if necessary */}
      <OptionsBar>
        <div id="choosecategory">
          <label htmlFor="productcategory">Category:</label>
          <select id="productcategory">
            <option defaultValue="all" name="category">
              All
            </option>
            <option value="consoles" name="category">
              Consoles
            </option>
            <option value="games" name="category">
              Games
            </option>
            <option value="accessories" name="category">
              Accessories
            </option>
          </select>
        </div>
        <div id="toggleoos">
          <label htmlFor="hideoos">Hide out of stock:</label>
          <input type="checkbox" />
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
    </div>
  );
};

export default Main;
