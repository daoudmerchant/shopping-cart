// packages
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

// tools
import organise from "../helpers/organise";

// resources
import inventory from "../inventory";

// components
import ShopFilterBar from "./ShopFilterBar";
import ItemTile from "./ItemTile";

const TileGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px;
  margin: 5px auto;

  // TOODO: change / remove max width?
  max-width: 1800px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1800px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Main = () => {
  // initialise state
  const storefrontInventory = inventory.map((item, i) => {
    item.id = i;
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
    const priceType = hasMultiplePrices ? "lowestPrice" : "price";
    item[priceType] = lowestPriceItem.price;
    item.inStock = item.options.some((option) => option.inStock);
    delete item.options;
    return item;
  });

  const [currentView, setCurrentView] = useState(storefrontInventory);
  const [isGrid, setIsGrid] = useState(true);
  const toggleView = (e) => {
    const gridIsSelected = e.target.value === "grid" ? true : false;
    setIsGrid(gridIsSelected);
  };

  return (
    <div>
      <h1>Nintendo Switch</h1>
      <ShopFilterBar isGrid={isGrid} toggleView={toggleView} />
      <TileGrid>
        {currentView.map((item, i) => {
          return <ItemTile key={`item${item.id}`} item={item} />;
        })}
      </TileGrid>
    </div>
  );
};

export default Main;
