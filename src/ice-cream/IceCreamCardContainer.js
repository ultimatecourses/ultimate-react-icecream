import React from 'react';
import { css } from 'emotion/macro';
import PropTypes from 'prop-types';

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 2em;
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 700px) {
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

IceCreamCardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IceCreamCardContainer;
