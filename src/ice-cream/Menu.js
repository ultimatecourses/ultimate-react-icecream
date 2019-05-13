import React, { useState, useEffect } from 'react';
import { css } from 'emotion/macro';
import Main from '../structure/Main';
import { getMenu } from '../data/iceCreamData';
import FocusLink from '../structure/FocusLink';

const menuStyle = css`
  list-style: none;
  max-width: 60%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 2em;

  @media screen and (max-width: 600px) {
    max-width: 80%;
  }

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

      @media screen and (max-width: 600px) {
        display: block;
      }

      h3 {
        margin-left: 1em;
        margin-right: 1em;
      }

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
                <FocusLink to={`/menu-items/${id.toString()}`}>
                  {iceCream.name}
                </FocusLink>
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
        <FocusLink to="/ice-creams" className="add-more">
          Add more frozen goodness
        </FocusLink>
      </div>
    </Main>
  );
};

export default Menu;
