import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import geomanistBookWoff from './assets/fonts/geomanist/geomanist-book.woff';
import geomanistBookWoff2 from './assets/fonts/geomanist/geomanist-book.woff2';
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
  @font-face {
    font-family: 'geomanist';
    src: url(${geomanistBookWoff2}) format('woff2'),
      url(${geomanistBookWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'cornerstone';
    src: url(${cornerstoneWoff2}) format('woff2'),
      url(${cornerstoneWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

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
    background: #ff71ba;
    font-family: 'geomanist', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    padding: 0;
    margin: 0;
  }

  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }

  .visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .skip-link {
    padding: 6px;
    position: absolute;
    top: -40px;
    left: 0px;
    color: white;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-bottom-right-radius: 8px;
    background: #5c4268;
    transition: top 1s ease-out;
    z-index: 100;

    &:focus {
      position: absolute;
      left: 0px;
      top: 0px;
      outline-color: transparent;
      transition: top 0.1s ease-in;
    }
  }
`;

const App = () => {
  return (
    <Router>
      <Global styles={globalStyle} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
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
