import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";

function App() {
  // pass search text from Header to sibling Main
  const [currentSearch, setCurrentSearch] = useState("");

  return (
    <div className="App">
      <Header submitSearch={setCurrentSearch} />
      <Main searchText={currentSearch} />
    </div>
  );
}

export default App;
