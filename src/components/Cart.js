import React from "react";

const Cart = ({ cart }) => {
  return (
    <div>
      {cart.length &&
        cart.map((item) => <p>{`${item.product}: ${item.quantity}`}</p>)}
    </div>
  );
};

export default Cart;
