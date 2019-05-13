import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import IceCream from './IceCream';
import { getMenuItem, putMenuItem } from '../data/iceCreamData';

const EditIceCream = ({ match, history }) => {
  const [menuItem, setMenuItem] = useState({});

  useEffect(() => {
    getMenuItem(match.params.menuItemId).then(item => {
      setMenuItem(item);
    });
  }, [match.params.menuItemId]);

  const onSubmitHandler = updatedItem => {
    putMenuItem({ id: menuItem.id, ...updatedItem }).then(() => {
      history.push('/');
    });
  };

  return (
    <Main headingText="Update this beauty">
      <IceCream
        iceCream={menuItem.iceCream}
        price={menuItem.price}
        onSubmit={onSubmitHandler}
      />
    </Main>
  );
};

export default EditIceCream;
