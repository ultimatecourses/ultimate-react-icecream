import React, { useEffect, useState, useRef } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import { getIceCream, postMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';

const AddIceCream = ({ location, history }) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [iceCream, setIceCream] = useState({});

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getIceCream(location.search.split('=')[1])
      .then(item => {
        if (isMounted.current) {
          setIceCream(item);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace('/', { focus: true });
        }
      });
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
