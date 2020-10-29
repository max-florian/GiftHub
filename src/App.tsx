import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import {Header} from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import UserInventory from './components/UserInventory/index'
import Home from './components/Home/Index'
import Inventory from './components/Catalog/Compra/index'
import TransactionLogUser from './components/TransactionLog/User/index'
import TransactionAdmin from './components/TransactionLog/Admin/index'
import InventoryAdmin from './components/Catalog/Admin'

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
            <Route path='/home' exact component={Home}></Route>
            <Route path='/inventariousuario' exact component={UserInventory}></Route>
            <Route path='/carrocompra' exact component={Inventory}></Route>
            <Route path='/transactionlog' exact component={TransactionLogUser}></Route>
            <Route path='/transactionadmin' exact component={TransactionAdmin}></Route>
            <Route path='/catalogoadmin' exact component={InventoryAdmin}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
