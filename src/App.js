import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./Components/Auth";
import Dashboard from "./Components/Dashboard";
import Form from "./Components/Form";
import Nav from "./Components/Nav";
import Post from "./Components/Post";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
