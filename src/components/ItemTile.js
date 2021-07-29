import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  display: grid;
  grid-template-areas: "image image" "name name" "stock price";
  border: 1px solid grey;
  border-radius: 10px;
`;

const ItemImg = styled.img`
  max-height: 200px;
  max-width: 100%;
  margin: 15px auto 0;
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

const ItemTile = ({ item }) => {
  const { product, imageUrl, inStock } = item;
  const priceText = item.lowestPrice
    ? `From £${item.lowestPrice}`
    : `£${item.price}`;
  const stockTextStyle = !inStock ? { color: "black", opacity: "50%" } : null;
  const stockImageStyle = !inStock ? { opacity: "50%" } : null;
  return (
    <Tile>
      <ItemImg src={imageUrl} alt={product} style={stockImageStyle} />
      <ProductName>{product}</ProductName>
      <StockStatus style={stockTextStyle}>
        {inStock ? "In Stock" : "Out of Stock"}
      </StockStatus>
      <Price>{priceText}</Price>
    </Tile>
  );
};

export default ItemTile;
