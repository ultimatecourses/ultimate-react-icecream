import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import EditIceCream from './ice-cream/EditIceCream';
import './styles/ice-cream.scss';

const App = () => {
  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Switch>
        <Route path="/" component={Menu} exact />
        <Route path="/menu-items/:menuItemId" component={EditIceCream} exact />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
