import React from 'react';

const ErrorContainer = ({ children, errorText, hasSubmitted, errorId }) => (
  <div className={errorText && hasSubmitted ? 'error' : null}>
    {children}
    <div className="error-wrapper">
      {errorText && hasSubmitted && <span id={errorId}>{errorText}</span>}
    </div>
  </div>
);

export default ErrorContainer;
