import React from 'react';
import PropTypes from 'prop-types';

const ErrorContainer = ({ children, errorText, hasSubmitted, errorId }) => (
  <div className={errorText && hasSubmitted ? 'error' : null}>
    {children}
    <div className="error-wrapper">
      {errorText && hasSubmitted && <span id={errorId}>{errorText}</span>}
    </div>
  </div>
);

ErrorContainer.propTypes = {
  children: PropTypes.node.isRequired,
  errorText: PropTypes.string,
  hasSubmitted: PropTypes.bool.isRequired,
  errorId: PropTypes.string.isRequired,
};

export default ErrorContainer;
