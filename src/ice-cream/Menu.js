import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import { getMenu } from '../data/iceCreamData';

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
                {menu.map(({ id, iceCream, price }) => (
                  <IceCreamCard
                    key={id}
                    id={id}
                    to={`/menu-items/${id.toString()}`}
                    heading={iceCream.name}
                    image={iceCream.image}
                    callToAction="Select to edit"
                  >
                    <span>{`$${price}`}</span>
                  </IceCreamCard>
                ))}
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
