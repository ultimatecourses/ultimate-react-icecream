import React, { useState, useEffect, useRef } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';

const EditIceCream = ({ match, history }) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [menuItem, setMenuItem] = useState({});

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMenuItem(match.params.menuItemId)
      .then(item => {
        if (isMounted.current) {
          setMenuItem(item);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace('/', { focus: true });
        }
      });
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

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default EditIceCream;
