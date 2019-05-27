import React from 'react';

const Main = ({ headingText, headingLevel = 2, children }) => {
  const H = `h${headingLevel}`;
  return (
    <main>
      <H>{headingText}</H>
      {children}
    </main>
  );
};

export default Main;
