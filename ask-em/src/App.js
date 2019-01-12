import React, { Component } from "react";
import Navigation from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import AddSurveys from "./components/AddSurveys";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <AddSurveys />
          <Route path="/AddSurveys" Component={AddSurveys} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
