import React from "react";
import styled from "styled-components";

const CartItemContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 1fr;
`;

const CartItem = ({ item, quantity, maxQuantity, modifyQuantity }) => {
  const { product, imageUrl, price } = item;
  const { increaseQuantity, decreaseQuantity, setQuantity } = modifyQuantity;
  return (
    <div>
      <img src={imageUrl} alt={product} />
      <h2>{product}</h2>
      <p>Quantity:</p>
      <button onClick={decreaseQuantity}>-</button>
      <input
        type="number"
        min="0"
        max={maxQuantity}
        value={quantity}
        onChange={setQuantity}
      />
      <button onClick={increaseQuantity}>+</button>
      <p>£{price}</p>
    </div>
  );
};

export default CartItem;
