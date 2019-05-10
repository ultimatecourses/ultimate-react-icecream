import React from 'react';
import { css } from 'emotion/macro';

const mainStyle = css`
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  background: #f2fff8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h2 {
    padding: 2em;
    text-align: center;
    font-size: 2em;
  }
`;

const Main = ({ headingText, headingLevel = 2, children }) => {
  const H = `h${headingLevel.toString()}`;
  return (
    <main className={mainStyle}>
      <H>{headingText}</H>
      {children}
    </main>
  );
};
export default Main;
