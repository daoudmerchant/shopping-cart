import React, { useState } from "react";
import styled from "styled-components";

const CartItemContainer = styled.div`
  display: grid;
  grid-template-areas:
    "image name name"
    "image stock price"
    "image quantity remove";
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 2fr repeat(2, 1fr);
  border: 1px solid black;
  border-radius: 5px;
  height: 200px;
`;

const CartItemImage = styled.img`
  grid-area: image;
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

const CartItemName = styled.h2`
  grid-area: name;
`;

const CartItemStock = styled.p`
  grid-area: stock;
`;

const CartItemQuantity = styled.div`
  grid-area: quantity;
  display: flex;
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
`;

const CartItemPrice = styled.p`
  grid-area: price;
`;

const CartItemRemove = styled.button`
  grid-area: remove;
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
        <p>Quantity:</p>
        <button onClick={() => decreaseQuantity(index)}>-</button>
        <CartItemQuantityInput
          type="number"
          min="0"
          value={currentQuantity}
          onChange={(e) => setCurrentQuantity(e.target.value)}
          onBlur={() => {
            if (currentQuantity < 0) {
              // minus number (why did they do that??)
              removeItem();
            }
            setQuantity(index, Number(currentQuantity));
          }}
        />
        <button onClick={() => increaseQuantity(index)}>+</button>
      </CartItemQuantity>
      <CartItemRemove onClick={removeItem}>Remove</CartItemRemove>
    </CartItemContainer>
  );
};

export default CartItem;
