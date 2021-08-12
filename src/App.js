import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";

function App() {
  // pass search text from Header to sibling Main
  const [currentSearch, setCurrentSearch] = useState("");

  // cart logic
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Header submitSearch={setCurrentSearch} cart={cart} />
      <Main searchText={currentSearch} setCart={setCart} />
    </div>
  );
}

export default App;
