import React from "react";
import "./assets/css/style.css";
import logo from "./assets/img/logo.svg";
import { css } from "emotion/macro";
import Pizza from './pizza/Pizza';

const headerStyle = css`
  width: 100vw;
  position: relative;
  text-align: center;
  padding-top: 3em;

  img {
    width: 4em;
    margin-bottom: 3em;
  }

  nav {
    max-width: 70em;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px 4px 0 0;
    background: #ab131b;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
      padding: 15px 35px;
      font-family: "cornerstone";
      &.active {
        background: #921217;
      }
    }
  }
`;

const mainStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const footerStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0 0 4px 4px;
  background: #0f9675;
  color: #fff;
  padding: 10px;
  text-align: center;
  span {
    margin: 0;
    font-weight: 600;
  }
`;

const mainStyleOld = css`
  .app {
    &__header {
      position: relative;
      text-align: center;
      padding: 35px 0;
    }
    &__logo {
      width: 75px;
    }
    &__nav {
      border-radius: 4px 4px 0 0;
      text-align: center;
      background: #ab131b;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        color: #fff;
        padding: 15px 35px;
        font-family: "cornerstone";
        &.active {
          background: #921217;
        }
      }
    }
    &__content {
      margin: 0 auto 50px;
      background: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 1000px;
      border-radius: 4px;
    }
    &__container {
      padding: 35px;
    }
    &__footer {
      border-radius: 0 0 4px 4px;
      background: #0f9675;
      color: #fff;
      padding: 10px;
      text-align: center;
      p {
        margin: 0;
        font-weight: 600;
      }
    }
  }
`;

function App() {
  return (
    <>
      <header className={headerStyle}>
        <img src={logo} alt="Ultimate Pizza Logo" />
        <nav>
          <a href="/products" className="active">
            Products
          </a>
        </nav>
      </header>
      <main className={mainStyle}>
        <Pizza/>
      </main>
      <footer className={footerStyle}>
        <span>© Ultimate Pizza Inc.</span>
      </footer>
    </>
  );
}

export default App;
