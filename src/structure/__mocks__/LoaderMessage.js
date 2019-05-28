import React from 'react';
import PropTypes from 'prop-types';

const LoaderMessage = ({ loadingMsg, doneMsg }) => (
  <span data-testid="loaderMessage">
    {loadingMsg}-{doneMsg}
  </span>
);

LoaderMessage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoaderMessage;
