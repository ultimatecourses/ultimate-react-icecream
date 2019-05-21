import React, { useState, useEffect } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCreamHook';
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';

const EditIceCream = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItem, setMenuItem] = useState({});

  useEffect(() => {
    let didCancel = false;
    getMenuItem(match.params.menuItemId)
      .then(item => {
        if (!didCancel) {
          setMenuItem(item);
          setIsLoading(false);
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
      <LoaderMessage
        loadingMsg="Loading ice cream."
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream
          {...menuItem}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        />
      )}
    </Main>
  );
};

export default EditIceCream;
