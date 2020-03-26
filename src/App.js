import React from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './components/User'
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import './css/style.css';
import CreateProduct from './components/CreateProduct';
import Vendors from './components/Vendors';
import Sales from './components/Sales';
import CreateVendor from './components/CreateVendor';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
          <Route path="/" exact component={User} /> {/* List */}
          <Route path="/login" component={User} />
          {/* <Route path="/register" component={User} /> */} {/* RegisterUser */}
          <Route path="/sales" component={Sales} />
          <Route path="/products" component={Products} />
          <Route path="/create/product" component={CreateProduct} />
          <Route path="/product/edit/:id" component={CreateProduct} />
          <Route path="/create/vendor" component={CreateVendor} />
          <Route path="/vendor/edit/:id" component={CreateVendor} />
          <Route path="/vendors" component={Vendors} />
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
