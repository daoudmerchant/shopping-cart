import React from "react";
import styled from "styled-components";
import { capitalise } from "../helpers/format";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "image image"
    "name name"
    "category category"
    "stock price"
    "description description"
    "buy buy";
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 1120px) {
    grid-template-areas:
      "image image name name"
      "image image category category"
      "image image stock price"
      "image image description description"
      "image image buy buy";
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  grid-area: image;
  margin: 0 auto;
`;

const ItemName = styled.h2`
  grid-area: name;
`;

const ItemCategory = styled.p`
  grid-area: category;
`;

const ItemStock = styled.p`
  grid-area: stock;
`;

const ItemPrice = styled.p`
  grid-area: price;
`;

const ItemDescription = styled.p`
  grid-area: description;
`;

const AddToBasket = styled.button`
  grid-area: buy;
`;

const ItemPage = ({ item }) => {
  const { product, description, category, imageUrl, price, inStock } = item;
  return (
    <Container>
      <ItemImage src={imageUrl} alt={product} />
      <ItemName>{product}</ItemName>
      <ItemCategory>{`Category: ${capitalise(category)}`}</ItemCategory>
      <ItemStock style={inStock ? { color: "green" } : { opacity: "50%" }}>
        {inStock ? "In Stock" : "Out of Stock"}
      </ItemStock>
      <ItemPrice>{`£${price}`}</ItemPrice>
      <ItemDescription>{description}</ItemDescription>
      <AddToBasket>Add To Basket</AddToBasket>
    </Container>
  );
};

export default ItemPage;
