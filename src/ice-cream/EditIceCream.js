import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import IceCream from './IceCream';
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';

const EditIceCream = ({ match, history }) => {
  const [menuItem, setMenuItem] = useState({});

  useEffect(() => {
    let didCancel = false;
    getMenuItem(match.params.menuItemId)
      .then(item => {
        if (!didCancel) {
          setMenuItem(item);
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
  }, [match.params.menuItemId, history]);

  const onSubmitHandler = updatedItem => {
    putMenuItem({ id: menuItem.id, ...updatedItem }).then(() => {
      history.push('/', { focus: true });
    });
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then(() => {
      history.replace('/', { focus: true });
    });
  };

  return (
    <Main headingText="Update this beauty">
      <IceCream
        iceCream={menuItem.iceCream}
        price={menuItem.price}
        onDelete={onDeleteHandler}
        onSubmit={onSubmitHandler}
      />
    </Main>
  );
};

export default EditIceCream;
