import React from 'react';
import { css } from 'emotion/macro';

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

const Footer = () => (
  <footer className={footerStyle}>
    <span>© The ICE Project Inc.</span>
  </footer>
);

export default Footer;
