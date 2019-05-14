import React, { useEffect, useCallback, useState } from 'react';
import Main from '../structure/Main';
import IceCream from './IceCream';
import { getIceCream, postMenuItem } from '../data/iceCreamData';

const AddIceCream = ({ location, history }) => {
  const [iceCream, setIceCream] = useState({});

  const getIceCreamId = useCallback(() => location.search.split('=')[1], [
    location.search,
  ]);

  useEffect(() => {
    let didCancel = false;
    getIceCream(getIceCreamId())
      .then(iceCreamResponse => {
        if (!didCancel) {
          setIceCream(iceCreamResponse);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && !didCancel) {
          history.replace('/', { focus: true });
        }
      });
    return () => {
      didCancel = true;
    };
  }, [getIceCreamId, history]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem)
      .then(() => {
        history.push('/', { focus: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
    </Main>
  );
};

export default AddIceCream;
