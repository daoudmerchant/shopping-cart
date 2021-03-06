import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  display: grid;
  grid-template-areas: "image image" "name name" "stock price";
  border: 1px solid grey;
  border-radius: 10px;

  :hover {
    box-shadow: -7px 5px 15px -1px rgba(0, 0, 0, 0.44);
    background-color: rgb(255, 233, 232);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-areas: "image name stock price";
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: minmax(120px, 1fr);
  align-items: center;
  margin: 0 10px;
  & > * {
    margin: 0 5px;
  }
`;

const ItemImg = styled.img`
  max-width: 100%;
  grid-area: image;
`;

const ProductName = styled.p`
  grid-area: name;
`;

const StockStatus = styled.p`
  grid-area: stock;
`;

const Price = styled.p`
  grid-area: price;
`;

const ListItem = ({ item, isGrid, isOdd }) => {
  const ItemContainer = isGrid ? Tile : Row;
  const { product, imageUrl, inStock } = item;
  const priceText = item.lowestPrice
    ? `From £${item.lowestPrice}`
    : `£${item.price}`;
  const stockTextStyle = !inStock
    ? { color: "black", opacity: "50%" }
    : { color: "green" };
  const imageStyle = {
    opacity: !inStock ? "50%" : "1",
    margin: isGrid ? "15px auto 0" : "5px auto",
    maxHeight: isGrid ? "200px" : "100px",
  };
  const itemBackgroundColor = !isGrid && isOdd ? "rgb(255, 233, 232)" : null;
  return (
    <ItemContainer
      style={{ cursor: "pointer", backgroundColor: itemBackgroundColor }}
    >
      <ItemImg src={imageUrl} alt={product} style={imageStyle} />
      <ProductName>{product}</ProductName>
      <StockStatus style={stockTextStyle}>
        {inStock ? "In Stock" : "Out of Stock"}
      </StockStatus>
      <Price>{priceText}</Price>
    </ItemContainer>
  );
};

export default ListItem;
