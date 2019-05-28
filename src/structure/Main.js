import React, { useRef, useLayoutEffect } from 'react';
import { css } from 'emotion/macro';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const mainStyle = css`
  max-width: 63.75em;
  margin-left: auto;
  margin-right: auto;
  min-height: 40em;
  padding-top: 2em;
  padding-bottom: 2em;
  outline: 0;

  .main-heading {
    font-family: 'cornerstone', sans-serif;
    padding: 1rem 0 2rem;
    color: #313030;
    font-size: 1.8em;
    outline: 0;
    text-align: center;
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
    <main className={mainStyle} tabIndex="-1" id="main">
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream</title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  );
};

Main.propTypes = {
  headingText: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      focus: PropTypes.bool,
    }),
  }).isRequired,
};

export default withRouter(Main);
