import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import { getMenu } from '../data/iceCreamData';
import { css } from 'emotion/macro';

const cardContentStyle = css`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }

  p.price {
    font-weight: bold;
    font-size: 1.7em;
  }

  p.stock {
    font-size: 1.2em;
    font-style: italic;
    &.out {
      color: #ab131c;
    }
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
