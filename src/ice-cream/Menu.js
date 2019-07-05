import React, { useState, useEffect } from 'react';
import LoaderMessage from '../structure/LoaderMessage';
import { getMenu } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import IceCreamImage from './IceCreamImage';
import Helmet from 'react-helmet';

const Menu = () => {
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
    <main tabIndex="-1" id="main">
      <Helmet>
        <title>
          Rock your taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
      <LoaderMessage
        loadingMsg="Loading menu."
        doneMsg="Loading menu complete."
        isLoading={isLoading}
      />
      {!isLoading && (
        <div>
          {menu.length > 0 && !isLoading ? (
            <ul className="container">
              {menu.map(
                ({ id, iceCream, price, description, inStock, quantity }) => (
                  <li key={id.toString()}>
                    <section className="card">
                      <div className="image-container">
                        <IceCreamImage iceCreamId={iceCream.id} />
                      </div>
                      <div className="text-container">
                        <h3>{iceCream.name}</h3>
                        <div className="content card-content">
                          <p className="price">{`$${price.toFixed(2)}`}</p>
                          <p className={`stock${inStock ? '' : ' out'}`}>
                            {inStock
                              ? `${quantity} in stock`
                              : 'Currently out of stock!'}
                          </p>
                          <p className="description">{description}</p>
                        </div>
                      </div>
                    </section>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>Your menu is empty! The sadness!!</p>
          )}
        </div>
      )}
    </main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Menu;
