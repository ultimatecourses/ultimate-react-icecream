import React from 'react';
import { css } from 'emotion/macro';
import FocusLink from '../structure/FocusLink';

const headerStyle = css`
  position: relative;
  text-align: center;
  padding-top: 3em;

  h1 {
    color: #ffffff;
    font-family: 'kathen', sans-serif;
    font-size: 3em;
    text-shadow: 0.05em 0.05em #000;
    @media screen and (max-width: 600px) {
      font-size: 4em;
    }
  }

  nav {
    max-width: 70em;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
      padding: 15px 35px;
      font-size: 2em;
      &.active {
        background: #0a1bab;
      }
      &:focus {
        outline: 2px solid #ffffff;
      }
    }
  }
`;

const Header = () => (
  <header className={headerStyle}>
    <h1>Ultimate Ice Cream</h1>
    <nav>
      <FocusLink to="/" activeClassName="active" exact>
        Menu
      </FocusLink>
    </nav>
  </header>
);

export default Header;
