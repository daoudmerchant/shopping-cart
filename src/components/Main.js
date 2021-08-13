// packages
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { makeUrlFriendly } from "../helpers/format";

// tools
import organise from "../helpers/organise";

// resources
import inventory from "../inventory";

// components
import ShopFilterBar from "./ShopFilterBar";
import ListItem from "./ListItem";
import EmptySearch from "./EmptySearch";

const TileGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px;
  margin: 5px auto;

  // TODO: change / remove max width?
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

const Main = ({ searchText }) => {
  // initialise state
  const defaultView = {
    category: "all",
    hideOOS: false,
    order: "defaultOrder",
    isSearch: false,
    inventory: inventory.map((item, i) => {
      let newItem = { ...item };
      newItem.id = i;
      if (!newItem.options) {
        return newItem;
      }
      newItem.imageUrl = newItem.options[0].imageUrl;
      let hasMultiplePrices = false;
      const lowestPriceItem = newItem.options.reduce(
        (prevOption, thisOption) => {
          if (thisOption.price !== prevOption.price) {
            hasMultiplePrices = true;
          }
          return thisOption.price < prevOption.price ? thisOption : prevOption;
        }
      );
      const priceType = hasMultiplePrices ? "lowestPrice" : "price";
      newItem[priceType] = lowestPriceItem.price;
      newItem.inStock = newItem.options.some((option) => option.inStock);
      delete newItem.options;
      return newItem;
    }),
  };

  // set state
  const [currentView, setCurrentView] = useState(defaultView);
  const [isGrid, setIsGrid] = useState(true);
  const [lastSearch, setLastSearch] = useState("");

  // // update if search submitted
  console.log(currentView.isSearch);
  if (searchText && searchText !== lastSearch) {
    // FIX: Search same text second time after changing category
    setLastSearch(searchText);
    const searchRexExp = new RegExp(searchText, "i");
    const searchView = {
      ...defaultView,
      isSearch: true,
      inventory: defaultView.inventory.filter((item) =>
        item.product.match(searchRexExp)
      ),
    };
    setCurrentView(searchView);
  }

  // filter bar functions
  const toggleView = (e) => {
    const gridIsSelected = e.target.value === "grid" ? true : false;
    setIsGrid(gridIsSelected);
  };

  const getCategoryView = (category) => {
    return {
      ...defaultView,
      isSearch: false,
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

  // render conditions
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
      {currentView.inventory.length ? (
        <ItemContainer>
          {currentView.inventory.map((item, i) => {
            return (
              <Link
                key={`link${item.id}`}
                to={`/${makeUrlFriendly(item.product)}`}
              >
                <ListItem
                  isGrid={isGrid}
                  item={item}
                  isOdd={i % 2 !== 0}
                  key={`item${item.id}`}
                />
              </Link>
            );
          })}
        </ItemContainer>
      ) : (
        <EmptySearch />
      )}
    </div>
  );
};

export default Main;
