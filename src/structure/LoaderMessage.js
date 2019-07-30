import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LoaderMessage = ({ loadingMsg, doneMsg, isLoading }) => {
  const isLoadingPreviousValue = useRef(null);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  useEffect(() => {
    let loadingMessageDelay;
    let doneMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true);
        doneMessageDelay = setTimeout(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }
    isLoadingPreviousValue.current = isLoading;
    return () => {
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
    };
  }, [isLoading]);

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMsg}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMsg}</p>}
    </div>
  );
};

LoaderMessage.propTypes = {
  loadingMsg: PropTypes.string.isRequired,
  doneMsg: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default LoaderMessage;
