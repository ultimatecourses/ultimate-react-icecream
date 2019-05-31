import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FocusLink from '../FocusLink';

describe('FocusLink', () => {
  afterEach(cleanup);

  it('should render as a Link with string to', () => {
    const { container } = render(
      <FocusLink className="demo-class" to="/demo/path">
        Click me
      </FocusLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as a Link with object to', () => {
    const { container } = render(
      <FocusLink
        className="demo-class"
        to={{ pathname: '/demo/path', search: '?id=1' }}
      >
        Click me
      </FocusLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as a Link and merge router state', () => {
    const { queryByText } = render(
      <FocusLink
        className="demo-class"
        to={{ pathname: '/demo/path', state: { someKey: 'someVal' } }}
      >
        Click me
      </FocusLink>
    );

    expect(
      queryByText('{"someKey":"someVal","focus":true}')
    ).toBeInTheDocument();
  });

  it('should render as a NavLink with string to', () => {
    const { container } = render(
      <FocusLink
        className="demo-class"
        to="/demo/path"
        activeClassName="active"
      >
        Click me
      </FocusLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as a NavLink with object to', () => {
    const { container } = render(
      <FocusLink
        className="demo-class"
        to={{ pathname: '/demo/path', search: '?id=1' }}
        activeClassName="active"
      >
        Click me
      </FocusLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as a NavLink and merge router state', () => {
    const { queryByText } = render(
      <FocusLink
        className="demo-class"
        activeClassName="active"
        to={{ pathname: '/demo/path', state: { someKey: 'someVal' } }}
      >
        Click me
      </FocusLink>
    );

    expect(
      queryByText('{"someKey":"someVal","focus":true}')
    ).toBeInTheDocument();
  });
});
