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
    font-weight: bold;
    font-family: 'cornerstone', sans-serif;
    font-size: 2.5em;
    text-shadow: 0.05em 0.05em 0 #000;

    img {
      margin-right: 0.5em;
    }
  }

  nav {
    max-width: 63.75em;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3em;

    padding: 0.5em;
    background-color: #ffffff;
    border-radius: 7em;
    border: 1px solid rgba(32, 33, 36, 0.12);
    background-clip: padding-box;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    display: flex;
    align-items: center;

    a {
      position: relative;
      color: #5c4268;
      border: 2px solid transparent;
      border-radius: 6em;
      padding: 0 0.75em;
      font-size: 1em;
      line-height: 2em;
      text-decoration: none;
      transition: box-shadow 0.2s ease-in-out;

      &:hover {
        text-decoration: underline;
      }

      &:nth-child(n + 2) {
        &:before {
          content: '';
          position: absolute;
          left: -2px;
          top: 15%;
          height: 70%;
          width: 1px;
          background: rgba(32, 33, 36, 0.1);
        }
      }

      &.active {
        color: #a84a7a;
      }

      &:focus:not(:active) {
        outline: 2px solid transparent;
        box-shadow: 0 0 0 2px #8b9099;

        &.active {
          box-shadow: 0 0 0 2px #a84a7a;
        }
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
      <FocusLink to="/ice-creams" activeClassName="active">
        Add Ice Cream
      </FocusLink>
    </nav>
  </header>
);

export default Header;
