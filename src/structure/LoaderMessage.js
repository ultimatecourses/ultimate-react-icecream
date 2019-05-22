import React, { useState, useLayoutEffect, useRef } from 'react';
import { css } from 'emotion/macro';

const loaderMessageStyle = css`
  .loading {
    font-size: 3em;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin: 0;
    padding-bottom: 3em;
  }
`;

const LoaderMessage = ({ loadingMsg, doneMsg, isLoading }) => {
  const isLoadingPreviousValue = useRef(null);
  const loadingMessageDelay = useRef(null);
  const doneMessageDelay = useRef(null);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  useLayoutEffect(() => {
    if (isLoading) {
      loadingMessageDelay.current = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true);
        doneMessageDelay.current = setTimeout(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }
    isLoadingPreviousValue.current = isLoading;
    return () => {
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
      clearTimeout(loadingMessageDelay.current);
      clearTimeout(doneMessageDelay.current);
    };
  }, [isLoading]);

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className={loaderMessageStyle}
    >
      {showLoadingMessage && <p className="loading">{loadingMsg}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMsg}</p>}
    </div>
  );
};

export default LoaderMessage;
