import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import User from './components/User';
import ModifyUser from './components/ModifyUser';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';
import Vendors from './components/Vendors';
import Sales from './components/Sales';
import CreateVendor from './components/CreateVendor';
import PageNotFound from './components/PageNotFound';
import Stock from './components/Stock';
import Output from './components/Output';
import './css/style.css';
import ChangePass from './components/ChangePass';
import CreateUser from './components/CreateUser';

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          localStorage.getItem('auth') ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
          <Route path="/" exact component={User} />
          <Route path="/login" component={User} />
          <ProtectedRoute path="/addUser" component={CreateUser} />
          <ProtectedRoute path="/changePass" component={ChangePass} />
          <ProtectedRoute path="/modifyUser" component={ModifyUser} />
          <ProtectedRoute path='/sales' component={Sales} />
          <ProtectedRoute path="/products" component={Products} />
          <ProtectedRoute path="/create/product" component={CreateProduct} />
          <ProtectedRoute path="/product/edit/:id" component={CreateProduct} />
          <ProtectedRoute path="/product/stock" component={Stock} />
          <ProtectedRoute path="/create/vendor" component={CreateVendor} />
          <ProtectedRoute path="/vendor/edit/:id" component={CreateVendor} />
          <ProtectedRoute path="/vendors" component={Vendors} />
          <ProtectedRoute path="/output" component={Output} />
          <Route component={PageNotFound} />
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
