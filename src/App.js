import React, { useState, useEffect } from 'react';
import './assets/css/style.css';
import logo from './assets/img/logo.svg';
import { css } from 'emotion/macro';
import IceCream from './ice-cream/IceCream';
import { getMenu } from './data/iceCreamData';

const headerStyle = css`
  position: relative;
  text-align: center;
  padding-top: 3em;

  h1 {
    color: #ffffff;
    font-size: 7em;
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
      font-family: 'cornerstone';
      &.active {
        background: #0a1bab;
      }
    }
  }
`;

const mainStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  background: #f2fff8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h2 {
    padding: 2em;
    text-align: center;
    font-size: 2em;
  }
`;

const footerStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0 0 4px 4px;
  background: #0a1bab;
  color: #fff;
  padding: 10px;
  text-align: center;
  span {
    margin: 0;
    font-weight: 600;
  }
`;

const menuStyle = css`
  list-style: none;
  max-width: 60%;
  margin: 0 auto;
  padding: 0;
  li {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  img {
    max-width: 7em;
  }
  span {
    font-weight: bold;
    font-size: 3em;
  }
`;

const App = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu().then(menuData => {
      setMenu(menuData);
    });
  }, []);

  return (
    <>
      <header className={headerStyle}>
        <h1>The ICE Project</h1>
        <nav>
          <a href="/" className="active">
            Menu
          </a>
        </nav>
      </header>
      <main className={mainStyle}>
        <h2>Rock your taste buds with one of these!</h2>
        <ul className={menuStyle}>
          {menu.map(({ id, iceCream, price }) => (
            <li key={id}>
              <img src={iceCream.image} alt="" />
              <h3>{iceCream.name}</h3>
              <span>
                {price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </li>
          ))}
        </ul>
        <IceCream />
      </main>
      <footer className={footerStyle}>
        <span>© The ICE Project Inc.</span>
      </footer>
    </>
  );
};

export default App;
