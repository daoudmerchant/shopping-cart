import React from "react";
import styled from "styled-components";

// helpers
import { roundPrice } from "../helpers/format";

// components
import CartItem from "./CartItem";

const EmptyCart = styled.div`
  // style
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  margin: 0 auto;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GoToCheckout = styled.button`
  // style
`;

const Cart = ({ cart, setCart }) => {
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
            <CartItem item={item} index={i} modifyQuantity={modifyQuantity} />
          ))}
          <CartTotal>
            <p>{`Subtotal (${totalItems} item${
              totalItems > 1 ? "s" : ""
            }):`}</p>
            <p>{`£${roundPrice(totalCost)}`}</p>
            <GoToCheckout
              onClick={() =>
                alert("I advise you to 'check out' the rest of my projects :)")
              }
            >
              To Checkout
            </GoToCheckout>
          </CartTotal>
        </CartContainer>
      ) : (
        <EmptyCart>
          <p>Your cart is empty!</p>
        </EmptyCart>
      )}
    </div>
  );
};

export default Cart;
