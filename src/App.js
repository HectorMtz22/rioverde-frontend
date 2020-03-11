import React from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './components/User'
import Header from './components/Header';
import './css/style.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
          <Route path="/" exact component={User} /> {/* List */}
          <Route path="/login" component={User} />
          <Route path="/register" component={User} /> {/* RegisterUser */}
          </Switch>
      </Router>
    </div>
  );
}

export default App;
