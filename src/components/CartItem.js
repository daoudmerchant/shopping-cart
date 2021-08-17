import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// helpers
import { makeUrlFriendly, roundPrice } from "../helpers/format";

const CartItemContainer = styled.div`
  position: relative;
  display: grid;
  padding: 20px;
  grid-template-areas:
    "image name name"
    "image name name"
    "image stock price"
    "image quantity remove";
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 2fr repeat(2, 1fr);
  grid-column-gap: 20px;
  border: 1px solid black;
  border-radius: 5px;
  height: 250px;
  margin-bottom: 20px;
`;

const CartItemImage = styled.img`
  grid-area: image;
  max-height: 100%;
  max-width: 100%;

  // TODO: Replace with flex-based solution?
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CartItemName = styled.div`
  grid-area: name;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <Link key={`link${item.id}`} to={`/${makeUrlFriendly(product)}`}>
        <CartItemImage src={imageUrl} alt={product} />
      </Link>
      <CartItemName>
        <h2>{product}</h2>
      </CartItemName>
      <CartItemStock style={stockStyle}>
        {inStock ? "In Stock" : "Out of Stock"}
      </CartItemStock>
      <CartItemPrice>£{roundPrice(price)}</CartItemPrice>
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
            // only allow digit keyboard inputs
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onBlur={() => {
            if (currentQuantity < 0) {
              // minus number (minus key not permitted so only if user pastes in a minus number (why???))
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
