import React from 'react';

export const Link = ({ children, to }) =>
  typeof to === 'string' ? (
    <a href={to}>{children}</a>
  ) : (
    <a href={`${to.pathname}${to.search ? to.search : ''}`}>
      {children}
      {to.state && <span>{JSON.stringify(to.state)}</span>}
      <span data-testid="linkType">Link</span>
    </a>
  );

export const NavLink = ({ children, to }) =>
  typeof to === 'string' ? (
    <a href={to}>{children}</a>
  ) : (
    <a href={`${to.pathname}${to.search ? to.search : ''}`}>
      {children}
      {to.state && <span>{JSON.stringify(to.state)}</span>}
      <span data-testid="linkType">NavLink</span>
    </a>
  );

export const withRouter = component => component;

export const Switch =({children}) => <div data-testid="switch">{children}</div>;

export const Route = ({path, component}) => {
  return <><span>{component.name}</span><span>{path}</span></>
}

export const Redirect = ({to}) => <span>Redirect to {to}</span>;

export const BrowserRouter = ({children}) => <div data-testid="router">{children}</div>
