import React, { useState, useEffect } from 'react';
import { css } from 'emotion/macro';
import Main from '../structure/Main';
import { getMenu } from '../data/iceCreamData';
import { Link } from 'react-router-dom';

const menuStyle = css`
  list-style: none;
  max-width: 60%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 2em;
  a {
    color: #282c34;
    &:focus {
      outline: 2px solid #282c34;
      outline-offset: 0.3em;
    }

    &.add-more {
      font-weight: bold;
      font-size: 2em;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        max-width: 7em;
      }
      span {
        font-weight: bold;
        font-size: 3em;
      }
    }
  }
`;

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu().then(menuData => {
      setMenu(menuData);
    });
  }, []);

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <div className={menuStyle}>
        <ul>
          {menu.map(({ id, iceCream, price }) => (
            <li key={id}>
              <img src={iceCream.image} alt="" />
              <h3>
                <Link to={`/menu-items/${id.toString()}`}>{iceCream.name}</Link>
              </h3>
              <span>
                {price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </li>
          ))}
        </ul>
        <Link to="/ice-creams" className="add-more">
          Add more frozen goodness
        </Link>
      </div>
    </Main>
  );
};

export default Menu;
