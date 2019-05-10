import React, { useState, useEffect } from 'react';
import { getIceCreams } from '../data/iceCreamData';
import { css } from 'emotion/macro';

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  list-style: none;
  margin: 0 1em;
  padding: 1em 0;

  li {
    background-color: #fff;
    text-align: center;
    border-radius: 4px;
    img {
      max-width: 30%;
    }

    h2 {
      text-align: center;
    }
  }
`;

const IceCream = () => {
  const [iceCreams, setIceCreams] = useState([]);

  useEffect(() => {
    getIceCreams().then(iceCreams => {
      setIceCreams(iceCreams);
    });
  }, []);

  return (
    <ul className={containerStyle}>
      {iceCreams.map(({ id, name, image }) => (
        <li key={id}>
          <h2>{name}</h2>
          <img src={image} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default IceCream;
