import React from 'react'
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import ItemList from "./component/ItemList";
import Navbar from "./component/Navbar";
import './css/styles.css';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/todo-list/" exact component={Dashboard} />
        <Route path="/detail/:id" exact component={ItemList} />
      </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App