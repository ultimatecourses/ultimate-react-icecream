import React, { useRef, useLayoutEffect } from 'react';
import { css } from 'emotion/macro';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

const mainStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  min-height: 40em;
  padding-top: 2em;
  padding-bottom: 2em;

  .main-heading {
    font-family: 'kathen', sans-serif;
    padding: 1rem;
    color: #ffffff;
    font-size: 1.8em;
    text-shadow: 0.05em 0.05em #000;
    outline: 0;
  }
`;

const Main = ({ headingText, headingLevel = 2, children, location }) => {
  const heading = useRef(null);
  const H = `h${headingLevel}`;

  useLayoutEffect(() => {
    if (location.state && location.state.focus) {
      heading.current.focus();
    }
    window.scrollTo(0, 0);
  }, [location.state]);

  return (
    <main className={mainStyle}>
      <Helmet>
        <title>{headingText} | The ICE Project</title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  );
};
export default withRouter(Main);
