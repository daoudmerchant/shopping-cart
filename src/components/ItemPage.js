import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { capitalise } from "../helpers/format";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "image image"
    "name name"
    "category category"
    "stock price"
    "select select"
    "description description"
    "quantity buy";
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 1120px) {
    grid-template-areas:
      "image image name name"
      "image image category category"
      "image image stock price"
      "image image select select"
      "image image description description"
      "image image quantity buy";
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

const ItemOption = styled.select`
  grid-area: select;
`;

const ItemDescription = styled.p`
  grid-area: description;
`;

const ItemQuantity = styled.input`
  grid-area: quantity;
`;

const AddToBasket = styled.button`
  grid-area: buy;
`;

const ItemPage = ({ item, lastItem, setCart }) => {
  const { product, description, category, options } = item;

  const firstOption = options ? options[0] : item;

  const [currentOption, setCurrentOption] = useState(firstOption);
  const [quantity, setQuantity] = useState(1);
  return (
    <Container>
      <ItemImage src={currentOption.imageUrl} alt={product} />
      <ItemName>{product}</ItemName>
      <ItemCategory>{`Category: ${capitalise(category)}`}</ItemCategory>
      <ItemStock
        style={currentOption.inStock ? { color: "green" } : { opacity: "50%" }}
      >
        {currentOption.inStock ? "In Stock" : "Out of Stock"}
      </ItemStock>
      <ItemPrice>{`£${currentOption.price}`}</ItemPrice>
      {item.options && (
        <ItemOption
          value={currentOption.color}
          onChange={(e) => {
            const newOption = options.find(
              (item) => item.color === e.target.value
            );
            setQuantity(1);
            setCurrentOption(newOption);
          }}
        >
          {item.options.map((itemOption, i) => {
            return (
              <option key={`option${i}`} value={itemOption.color} name="color">
                {itemOption.color}
              </option>
            );
          })}
        </ItemOption>
      )}
      <ItemDescription>{description}</ItemDescription>
      <ItemQuantity
        value={quantity}
        type="number"
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
        disabled={!currentOption.inStock}
      />
      <Link to="/cart">
        <AddToBasket
          type="button"
          onClick={() => {
            const itemForBasket = currentOption.product
              ? {
                  ...currentOption,
                  inStock: true,
                  quantity,
                }
              : {
                  product,
                  description,
                  category,
                  inStock: true,
                  color: currentOption.color,
                  imageUrl: currentOption.imageUrl,
                  price: currentOption.price,
                  quantity,
                };
            setCart((prevCart) => {
              let newCart;
              const itemAlreadyAdded = prevCart.findIndex(
                (item) =>
                  item.product === itemForBasket.product &&
                  (!itemForBasket.color || item.color === itemForBasket.color)
              );
              if (itemAlreadyAdded >= 0) {
                // item already in cart
                newCart = prevCart.map((item, i) => {
                  if (i === itemAlreadyAdded) {
                    return {
                      ...item,
                      quantity: item.quantity + itemForBasket.quantity,
                    };
                  }
                  return item;
                });
              } else {
                // new to cart
                newCart = [...prevCart, itemForBasket];
              }
              return newCart;
            });
          }}
          disabled={!currentOption.inStock}
        >
          Add To Basket
        </AddToBasket>
      </Link>
    </Container>
  );
};

export default ItemPage;
