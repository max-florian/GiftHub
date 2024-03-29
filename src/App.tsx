import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Registro from './components/Registro/index';
import Profile from './components/Profile';
import UserInventory from './components/UserInventory/index'
import Home from './components/Home/Index'
import Inventory from './components/Catalog/Compra/index'
import TransactionLogUser from './components/TransactionLog/User/index'
import TransactionAdmin from './components/TransactionLog/Admin/index'
import InventoryAdmin from './components/Catalog/Admin'
import { GlobalStateProvider } from "./hooks/globalState";
import { PagoTarjeta } from './components/PagoTarjeta';

function App() {

  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          {/* <Navbar/> */}
          <div className="App-header">
            <Switch>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="/registro" exact>
                <Registro />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route path='/home' exact component={Home}></Route>
              <Route path='/inventariousuario' exact component={UserInventory}></Route>
              <Route path='/carrocompra' exact component={Inventory}></Route>
              <Route path='/transactionlog' exact component={TransactionLogUser}></Route>
              <Route path='/transactionadmin' exact component={TransactionAdmin}></Route>
              <Route path='/catalogoadmin' exact component={InventoryAdmin}></Route>
              <Route path='/pagoTarjeta' exact component={PagoTarjeta}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
