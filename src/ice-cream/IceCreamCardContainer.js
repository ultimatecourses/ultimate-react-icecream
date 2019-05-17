import React from 'react';
import { css } from 'emotion/macro';

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 2em;
  list-style: none;
  margin: 0 1em;
  padding: 1em 0;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const IceCreamCardContainer = ({ children }) => (
  <ul className={containerStyle}>
    {React.Children.map(children, card => (
      <li>{card}</li>
    ))}
  </ul>
);

export default IceCreamCardContainer;
