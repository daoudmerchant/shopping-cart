import React, { useState } from "react";
import styled from "styled-components";

const CartItemContainer = styled.div`
  display: grid;
  padding: 20px;
  position: relative;
  grid-template-areas:
    "image name name"
    "image stock price"
    "image quantity remove";
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 2fr repeat(2, 1fr);
  grid-column-gap: 20px;
  border: 1px solid black;
  border-radius: 5px;
  height: 200px;
  margin-bottom: 20px;

  @media (min-width: 750px) {
  }
`;

const CartItemImage = styled.img`
  grid-area: image;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CartItemName = styled.h2`
  grid-area: name;
`;

const CartItemStock = styled.p`
  grid-area: stock;
`;

const CartItemQuantityButton = styled.button`
  display: block;
  width: 30px;
  height: 30px;
`;

const CartItemQuantity = styled.div`
  grid-area: quantity;
  display: flex;
  align-items: center;

  & > * {
    margin: 5px;
  }
`;

const CartItemQuantityInput = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: calc(100% - 20px);
  max-width: 200px;
  height: 30px;
  padding-left: 0.5rem;
`;

const CartItemPrice = styled.p`
  grid-area: price;
`;

const CartItemRemove = styled.button`
  grid-area: remove;
  margin: 5px 0;
  padding: 0 1rem;
`;

const CartItem = ({ item, index, modifyQuantity }) => {
  const { product, inStock, imageUrl, price, quantity } = item;
  const { increaseQuantity, decreaseQuantity, setQuantity } = modifyQuantity;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const removeItem = () => {
    setQuantity(index, 0);
  };

  const stockStyle = inStock ? { color: "green" } : { opacity: "50%" };

  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={product} />
      <CartItemName>{product}</CartItemName>
      <CartItemStock style={stockStyle}>
        {inStock ? "In Stock" : "Out of Stock"}
      </CartItemStock>
      <CartItemPrice>£{price}</CartItemPrice>
      <CartItemQuantity>
        <CartItemQuantityButton onClick={() => decreaseQuantity(index)}>
          -
        </CartItemQuantityButton>
        <CartItemQuantityInput
          type="number"
          min="0"
          value={currentQuantity}
          onChange={(e) => setCurrentQuantity(e.target.value)}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onBlur={() => {
            if (currentQuantity < 0) {
              // minus number (why did they do that??)
              removeItem();
            }
            setQuantity(index, Number(currentQuantity));
          }}
        />
        <CartItemQuantityButton onClick={() => increaseQuantity(index)}>
          +
        </CartItemQuantityButton>
      </CartItemQuantity>
      <CartItemRemove onClick={removeItem}>Remove</CartItemRemove>
    </CartItemContainer>
  );
};

export default CartItem;
