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
    getIceCream(getIceCreamId()).then(iceCreamResponse => {
      setIceCream(iceCreamResponse);
    });
  }, [getIceCreamId]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => {
      history.push('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
    </Main>
  );
};

export default AddIceCream;
