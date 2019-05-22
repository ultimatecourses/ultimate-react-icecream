import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import { getMenu } from '../data/iceCreamData';
import { css } from 'emotion/macro';

const cardContentStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  p {
    margin: 0;
    color: #403147;
  }

  p.price {
    font-size: 1em;
    position: relative;
    margin-right: 1.125em;
    color: rgba(64, 49, 71, 0.8);

    &:after {
      content: '';
      width: 4px;
      height: 4px;
      position: absolute;
      top: 50%;
      margin-top: -3px;
      right: -0.7em;
      background: rgba(64, 49, 71, 0.4);
      border-radius: 50%;
    }
  }

  p.stock {
    font-size: 1em;
    color: rgba(64, 49, 71, 0.8);

    &.out {
      color: #d8474f;
    }
  }

  p.description {
    width: 100%;
    margin-top: 1em;
    line-height: 1.375em;
    color: rgba(64, 49, 71, 0.9);
    font-size: 0.875em;
  }
`;

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;
    getMenu().then(menuData => {
      if (!didCancel) {
        setMenu(menuData);
        setIsLoading(false);
      }
    });
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMsg="Loading menu."
        doneMsg="Loading menu complete"
        isLoading={isLoading}
      />
      {!isLoading && (
        <div>
          {menu.length > 0 && !isLoading ? (
            <>
              <IceCreamCardContainer>
                {menu.map(
                  ({ id, iceCream, price, description, inStock, quantity }) => (
                    <IceCreamCard
                      key={id}
                      id={id}
                      to={`/menu-items/${id.toString()}`}
                      heading={iceCream.name}
                      image={iceCream.image}
                      callToAction="Select to edit"
                    >
                      <div className={cardContentStyle}>
                        <p className="price">{`$${price.toFixed(2)}`}</p>
                        <p className={`stock${inStock ? '' : ' out'}`}>
                          {inStock
                            ? `${quantity} in stock`
                            : 'Currently out of stock!'}
                        </p>
                        <p className="description">{description}</p>
                      </div>
                    </IceCreamCard>
                  )
                )}
              </IceCreamCardContainer>
            </>
          ) : (
            <p>Your menu is empty! The sadness!!</p>
          )}
        </div>
      )}
    </Main>
  );
};

export default Menu;
