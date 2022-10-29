import React from 'react'
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
        <Route exact path="/">
            <Redirect to="/todo-list" />
        </Route>
        <Route path="/todo-list/" component={Dashboard} />
        <Route path="/detail/:id" component={ItemList} />
      </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App