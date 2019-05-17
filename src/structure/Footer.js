import React from 'react';
import { css } from 'emotion/macro';

const footerStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0 0 4px 4px;
  color: #fff;
  padding: 10px;
  text-align: center;
  span {
    margin: 0;
    font-family: 'kathen', sans-serif;
    text-shadow: 0.05em 0.05em #000000;
    font-weight: 600;
  }
`;

const Footer = () => (
  <footer className={footerStyle}>
    <span>© Ultimate Ice Cream</span>
  </footer>
);

export default Footer;
