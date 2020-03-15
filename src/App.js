import React from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './components/User'
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import './css/style.css';
import CreateProduct from './components/CreateProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
          <Route path="/" exact component={User} /> {/* List */}
          <Route path="/login" component={User} />
          {/* <Route path="/register" component={User} /> */} {/* RegisterUser */}
          <Route path="/sales" component={User} />
          <Route path="/products" component={Products} />
          <Route path="/create/product" component={CreateProduct} />
          <Route path="/edit/:id" component={CreateProduct} />
          <Route path="/vendors" component={User} />
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
