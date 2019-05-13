import React, { useRef, useLayoutEffect } from 'react';
import { css } from 'emotion/macro';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

const mainStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  background: #f2fff8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .main-heading {
    padding: 2em;
    text-align: center;
    font-size: 2em;
    outline: 0;
  }
`;

const Main = ({ headingText, headingLevel = 2, children, location }) => {
  const heading = useRef(null);
  const H = `h${headingLevel.toString()}`;

  useLayoutEffect(() => {
    if (location.state && location.state.focus) {
      heading.current.focus();
    }
  });

  console.log(location.state);

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
