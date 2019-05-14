import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import cornerstoneWoff from './assets/fonts/cornerstone.woff';
import cornerstoneWoff2 from './assets/fonts/cornerstone.woff2';
import { Global, css } from '@emotion/core';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import IceCreams from './ice-cream/IceCreams';
import EditIceCream from './ice-cream/EditIceCream';
import AddIceCream from './ice-cream/AddIceCream';

const globalStyle = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    color: #333;
    background: #23292d;
    -webkit-font-smoothing: antialiased;
    font: 300 16px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    display: flex;
  }
  #root {
    width: 100%;
  }
  a {
    &:hover {
      text-decoration: none;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: normal;
    font-family: 'cornerstone', serif;
    padding: 0;
    margin: 0;
  }

  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }

  @font-face {
    font-family: 'cornerstone';
    src: url(${cornerstoneWoff2}) format('woff2'),
      url(${cornerstoneWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  .btn {
    display: inline-block;
    padding: 10px 15px;
    margin: 0;
    outline: 0;
    border: 0;
    border-radius: 3px;
    font-size: 16px;
    font-family: 'cornerstone', serif;
    cursor: pointer;

    &:focus {
      outline: 2px solid #282c34;
      outline-offset: 0.3rem;
    }

    &:hover {
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }
  .btn__ok {
    background: #0f8261;
    color: #fff;
  }
  .btn__ok:hover {
    background: #0a523c;
  }
  .btn__warning {
    background: #ab131c;
    color: #fff;
  }
  .btn__warning:hover {
    background: #880c14;
  }
`;

const App = () => {
  return (
    <Router>
      <Global styles={globalStyle} />
      <Header />
      <Switch>
        <Route path="/" component={Menu} exact />
        <Route path="/ice-creams" component={IceCreams} exact />
        <Route path="/menu-items/add" component={AddIceCream} exact />
        <Route path="/menu-items/:menuItemId" component={EditIceCream} exact />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
