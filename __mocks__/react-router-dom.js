import React from 'react';

export const Link = ({ children, to }) =>
  typeof to === 'string' ? (
    <a href={to}>{children}</a>
  ) : (
    <a href={to.pathname}>
      {children}
      {to.state && <span>{JSON.stringify(to.state)}</span>}
    </a>
  );

export const NavLink = ({ children, to }) =>
  typeof to === 'string' ? (
    <a href={to}>{children}</a>
  ) : (
    <a href={to.pathname}>
      {children}{to.state && <span>{JSON.stringify(to.state)}</span>}
    </a>
  );
