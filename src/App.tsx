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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-header">
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
