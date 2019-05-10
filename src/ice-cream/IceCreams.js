import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import { getIceCreams } from '../data/iceCreamData';
import { css } from 'emotion/macro';
import { Link } from 'react-router-dom';

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 2em;
  list-style: none;
  margin: 0 1em;
  padding: 1em 0;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0a1bab;
    border-radius: 4px;
    border: 4px solid #58d6ff;
    padding: 1.5em;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus-within {
      transform: scale(1.04);
      transition: all 0.2s ease-in-out;
    }

    a {
      color: #ffffff;
      margin-bottom: 1.5em;

      &:focus {
        outline: 2px solid #ffffff;
        outline-offset: 0.5em;
      }
    }

    .image-container {
      padding: 1em;
      background-color: #ffffff;
      max-width: 30%;
      min-width: 30%;
      border-radius: 5em;
    }

    h2 {
      padding: 0;
      text-align: center;
      color: #ffffff;
    }
  }
`;

const IceCreams = ({ history }) => {
  const [iceCreams, setIceCreams] = useState([]);

  useEffect(() => {
    getIceCreams().then(iceCreams => {
      setIceCreams(iceCreams);
    });
  }, []);

  const onItemClickHandler = id => {
    history.push(`/menu-items/add?id=${id.toString()}`);
  };

  const onLinkClickHandler = e => {
    //This is done to avoid the click handler of the <li>
    //firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <Main headingText="Choose your poison">
      <ul className={containerStyle}>
        {iceCreams.map(({ id, name, image }) => (
          <li
            key={id}
            onClick={() => {
              onItemClickHandler(id);
            }}
          >
            <Link
              to={`/menu-items/add?id=${id.toString()}`}
              onClick={onLinkClickHandler}
            >
              <h2>{name}</h2>
            </Link>
            <div className="image-container">
              <img src={image} alt="" />
            </div>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default IceCreams;
