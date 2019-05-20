import React from 'react';
import FocusLink from '../structure/FocusLink';
import iceCream from '../assets/img/ultimate-ice-cream.svg';
import { css } from 'emotion/macro';

const headerStyle = css`
  position: relative;
  text-align: center;
  padding-top: 3em;

  h1 {
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-family: 'kathen', sans-serif;
    font-size: 2em;
    text-shadow: 0.05em 0.05em #000;

    img {
      margin-right: 0.5em;
    }
  }

  nav {
    padding: 0.3em;
    max-width: 70em;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
    border-radius: 7em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    a {
      color: #a84a7a;
      border: 2px solid transparent;
      border-radius: 6em;
      padding: 0.5em;
      font-size: 1.2em;
      &:first-of-type {
        margin-left: 1em;
      }

      &.active {
        //background: #0a1bab;
      }
      &:focus {
        outline: 2px solid transparent;
        border: 2px solid #a84a7a;
      }
    }

    .add-more {
      color: #ffffff;
      background-color: #5c4268;

      &:focus:not(:active) {
        background-color: #ffffff;
        color: #5c4268;
      }
    }
  }
`;

const Header = () => (
  <header className={headerStyle}>
    <h1>
      <img src={iceCream} alt="" />
      Ultimate Ice Cream
    </h1>
    <nav>
      <FocusLink to="/" activeClassName="active" exact>
        Menu
      </FocusLink>
      <FocusLink to="/ice-creams" className="add-more">
        Add more frozen goodness
      </FocusLink>
    </nav>
  </header>
);

export default Header;
