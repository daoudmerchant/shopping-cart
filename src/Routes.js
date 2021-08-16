import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Main from "./components/Main";
import ItemPage from "./components/ItemPage";
import Cart from "./components/Cart";
import inventory from "./inventory";

import { makeUrlFriendly } from "./helpers/format";

const Routes = () => {
  // cart logic
  const [cart, setCart] = useState([]);

  // pass search text from Header to sibling Main
  const [search, setSearch] = useState("");
  const [justSearched, setJustSearched] = useState(false);
  const submitSearch = (string) => {
    setJustSearched(true);
    setSearch(string);
  };
  const resetSearch = () => setJustSearched(false);

  return (
    <Router basename={`${process.env.PUBLIC_URL}/shopping-cart/`}>
      <Header
        cartQuantity={cart.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0
        )}
        submitSearch={submitSearch}
        resetSearch={resetSearch}
        useHistory
      />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Main
              searchText={justSearched && search}
              resetSearch={resetSearch}
            />
          )}
        />
        {inventory.map((item) => {
          return (
            <Route
              exact
              path={`/${makeUrlFriendly(item.product)}`}
              key={`route${item.id}`}
              component={() => <ItemPage item={item} setCart={setCart} />}
            />
          );
        })}
        <Route
          path="/cart"
          component={() => (
            <Cart cart={cart} setCart={setCart} resetSearch={resetSearch} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
