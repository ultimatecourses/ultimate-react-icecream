import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import './styles/ice-cream.scss';

const App = () => {
  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Route path="/" component={Menu} exact />
      <Footer />
    </Router>
  );
};

export default App;
