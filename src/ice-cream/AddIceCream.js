import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import { getIceCream, postMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';

const AddIceCream = ({ location, history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iceCream, setIceCream] = useState({});

  useEffect(() => {
    let isMounted = true;
    getIceCream(location.search.split('=')[1])
      .then(iceCreamResponse => {
        if (isMounted) {
          setIceCream(iceCreamResponse);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted) {
          history.replace('/', { focus: true });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [history, location.search]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => {
      history.push('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMsg="Loading ice cream."
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
};

AddIceCream.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default AddIceCream;
