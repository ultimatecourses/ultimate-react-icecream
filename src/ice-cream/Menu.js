import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import { getMenu } from '../data/iceCreamData';
import PropTypes from 'prop-types';

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMenu().then(menuData => {
      if (isMounted) {
        setMenu(menuData);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMsg="Loading menu."
        doneMsg="Loading menu complete."
        isLoading={isLoading}
      />
      {menu.length > 0 ? (
        <IceCreamCardContainer>
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => (
              <IceCreamCard
                key={id.toString()}
                iceCreamId={iceCream.id}
                to={`/menu-items/${id.toString()}`}
                heading={iceCream.name}
                history={history}
              >
                <div className="card-content">
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
      ) : (
        !isLoading && <p>Your menu is empty! The sadness!!</p>
      )}
    </Main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Menu;
