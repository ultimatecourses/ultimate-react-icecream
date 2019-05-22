import React from 'react';

const FocusLink = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

export default FocusLink;
