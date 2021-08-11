// packages
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// tools
import organise from "../helpers/organise";

// resources
import inventory from "../inventory";

// components
import ShopFilterBar from "./ShopFilterBar";
import ListItem from "./ListItem";

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

const RowTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;

  max-width: 1800px;
`;

const Main = () => {
  // initialise state
  const defaultView = {
    category: "all",
    hideOOS: false,
    order: "defaultOrder",
    inventory: inventory.map((item, i) => {
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
    }),
  };

  const [currentView, setCurrentView] = useState(defaultView);
  const [isGrid, setIsGrid] = useState(true);
  const toggleView = (e) => {
    const gridIsSelected = e.target.value === "grid" ? true : false;
    setIsGrid(gridIsSelected);
  };

  const getCategoryView = (category) => {
    return {
      ...defaultView,
      category,
      inventory: organise.filterBy.category(defaultView.inventory, category),
    };
  };

  const filterOOS = (thisView) => {
    return {
      ...thisView,
      hideOOS: true,
      inventory: organise.filterBy.inStock(thisView.inventory),
    };
  };

  const reorderInventory = (thisView, order) => {
    return {
      ...thisView,
      order,
      inventory: organise.orderBy[order](thisView.inventory),
    };
  };

  const changeCategory = (category) => {
    let nextView = category === "all" ? defaultView : getCategoryView(category);
    if (currentView.hideOOS) {
      nextView = filterOOS(nextView);
    }
    if (currentView.order !== "defaultOrder") {
      nextView = reorderInventory(nextView, currentView.order);
    }
    setCurrentView(nextView);
  };

  const toggleHideOOS = (doHideOOS) => {
    if (doHideOOS) {
      setCurrentView((prevView) => {
        return filterOOS(prevView);
      });
    } else {
      setCurrentView((prevView) => {
        let nextView =
          prevView.category === "all"
            ? defaultView
            : getCategoryView(prevView.category);
        if (prevView.order !== "defaultOrder") {
          nextView = reorderInventory(nextView, prevView.order);
        }
        return nextView;
      });
    }
  };

  const changeOrder = (order) => {
    setCurrentView((prevView) => {
      return reorderInventory(prevView, order);
    });
  };

  const ItemContainer = isGrid ? TileGrid : RowTable;

  return (
    <div>
      <h1>Nintendo Switch</h1>
      <ShopFilterBar
        changeCategory={changeCategory}
        isGrid={isGrid}
        toggleView={toggleView}
        hideOOS={currentView.hideOOS}
        toggleHideOOS={toggleHideOOS}
        viewOrder={currentView.order}
        changeOrder={changeOrder}
      />
      <ItemContainer>
        {currentView.inventory.map((item, i) => {
          return (
            <ListItem
              key={`item${item.id}`}
              isGrid={isGrid}
              item={item}
              isOdd={i % 2 !== 0}
            />
          );
        })}
      </ItemContainer>
    </div>
  );
};

export default Main;
