import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import  Navbar  from "./components/mainLayout/Navbar"
import UserInventory from './components/UserInventory/index'
import Home from './components/Home/Index'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* <Navbar/> */}
        <div className="App-header">
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path='/' exact component={Home}></Route>
            <Route path='/inventariousuario' exact component={UserInventory}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
