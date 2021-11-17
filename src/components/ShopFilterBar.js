import React from "react";
import styled from "styled-components";

const OptionsBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  position: relative;
  margin: 0 auto 30px;
  padding: 0 10px;
  max-width: 1500px;

  @media (min-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1000px) {
    display: flex;
    justify-content: space-between;
  }

  :before,
  :after {
    position: absolute;
    content: "";
    width: 90%;
    height: 4px;
    background: red;
    margin-left: 5%;
  }

  :after {
    bottom: -10px;
  }

  :before {
    top: -10px;
  }
`;

const Label = styled.label`
  margin-right: 5px;
`;

const FilterType = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 10px;
`;

const ShopFilterBar = ({
  changeCategory,
  isGrid,
  toggleView,
  hideOOS,
  toggleHideOOS,
  viewOrder,
  changeOrder,
}) => {
  return (
    <OptionsBar id="optionsbar">
      <FilterType id="choosecategory">
        <Label htmlFor="productcategory">Category:</Label>
        <select
          id="productcategory"
          onChange={(e) => changeCategory(e.target.value)}
          style={{ width: "100px" }}
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
      </FilterType>
      <FilterType id="toggleview">
        <Label htmlFor="chooseview">View:</Label>
        <div>
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
            style={{ marginLeft: "20px" }}
          />
          List
        </div>
      </FilterType>
      <FilterType id="toggleoos">
        <Label htmlFor="hideoos">Hide out of stock:</Label>
        <input
          type="checkbox"
          defaultChecked={hideOOS}
          onChange={(e) => toggleHideOOS(e.target.checked)}
        />
      </FilterType>
      <FilterType id="chooseorder">
        <Label htmlFor="productorder">Order:</Label>
        <select
          id="productorder"
          value={viewOrder}
          onChange={(e) => changeOrder(e.target.value)}
          style={{ width: "70%" }}
        >
          <option value="defaultOrder">Default</option>
          <option value="ascendingPrice" name="order">
            Price (ascending)
          </option>
          <option value="descendingPrice" name="order">
            Price (descending)
          </option>
        </select>
      </FilterType>
    </OptionsBar>
  );
};

export default ShopFilterBar;
