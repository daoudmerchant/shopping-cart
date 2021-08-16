import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// helpers
import { roundPrice } from "../helpers/format";

// components
import CartItem from "./CartItem";

const EmptyCart = styled.div`
  margin-top: 50px;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1200px;
  margin: 20px;

  @media (min-width: 1240px) {
    margin: 20px auto;
  }
`;

const EmptyCartButton = styled.button`
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  // only applies under 630px
  grid-area: 2 / 1 / span 1 / span 1;
  @media (min-width: 630px) {
    margin: 0 auto 0 0;
    width: auto;
  }
`;

const CartTotal = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
  margin-bottom: 20px;

  & > p {
    margin-right: 1rem;
  }

  @media (min-width: 630px) {
    display: flex;
    justify-content: center;
  }
`;

const GoToCheckout = styled.button`
  padding: 0 2rem;
  border: 2px solid rgb(197, 51, 45);
`;

const Cart = ({ cart, setCart, resetSearch }) => {
  const modifyQuantity = (() => {
    const deleteItem = (index) => {
      setCart((prevCart) => {
        return prevCart.filter((item, i) => {
          if (index !== i) {
            return item;
          }
          return false;
        });
      });
    };
    const increaseQuantity = (index) => {
      setCart((prevCart) => {
        return prevCart.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      });
    };
    const decreaseQuantity = (index) => {
      setCart((prevCart) => {
        const currentQuantity = prevCart[index].quantity;
        if (currentQuantity === 1) {
          // quantity becomes 0 - delete item
          deleteItem(index);
        }
        return prevCart.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
      });
    };
    const setQuantity = (index, quantity) => {
      if (quantity === 0) {
        // delete item
        deleteItem(index);
      } else {
        setCart((prevCart) => {
          return prevCart.map((item, i) => {
            if (index === i) {
              return {
                ...item,
                quantity,
              };
            }
            return item;
          });
        });
      }
    };
    return {
      increaseQuantity,
      decreaseQuantity,
      setQuantity,
    };
  })();
  const totalCost = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
  const totalItems = cart.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );
  return (
    <div>
      {cart.length ? (
        <CartContainer>
          {cart.map((item, i) => (
            <CartItem
              item={item}
              index={i}
              key={`cartitem${i}`}
              modifyQuantity={modifyQuantity}
            />
          ))}
          <CartTotal>
            <EmptyCartButton onClick={() => setCart([])}>
              Empty Cart
            </EmptyCartButton>
            <p>{`Subtotal (${totalItems} item${
              totalItems > 1 ? "s" : ""
            }):`}</p>
            <p>{`£${roundPrice(totalCost)}`}</p>
            <GoToCheckout
              onClick={() =>
                alert("Feel free to 'check out' the rest of my projects :)")
              }
            >
              To Checkout
            </GoToCheckout>
          </CartTotal>
        </CartContainer>
      ) : (
        <EmptyCart>
          <p style={{ marginBottom: "20px" }}>Your cart is empty!</p>
          <Link to="/">
            <button onClick={resetSearch}>Back to shop</button>
          </Link>
        </EmptyCart>
      )}
    </div>
  );
};

export default Cart;
