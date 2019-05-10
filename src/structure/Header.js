import React from 'react';
import { css } from 'emotion/macro';
import { NavLink } from 'react-router-dom';

const headerStyle = css`
  position: relative;
  text-align: center;
  padding-top: 3em;

  h1 {
    color: #ffffff;
    font-size: 7em;

    @media screen and (max-width: 600px) {
      font-size: 4em;
    }
  }

  nav {
    max-width: 70em;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px 4px 0 0;
    background: #0054d1;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
      padding: 15px 35px;
      font-family: 'cornerstone', serif;
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
    <h1>The ICE Project</h1>
    <nav>
      <NavLink to="/" activeClassName="active">
        Menu
      </NavLink>
    </nav>
  </header>
);

export default Header;
