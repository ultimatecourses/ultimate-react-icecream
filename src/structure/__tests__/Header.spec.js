import React from 'react';
import { render } from 'react-testing-library';
import Header from '../Header';
import 'jest-dom/extend-expect';

describe('Header', () => {
  it('should render', () => {
    const { container } = render(<Header />);
    const img = container.firstChild.querySelector('header > h1 > img');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', 'ultimate-ice-cream.svg');

    const allAnchors = container.firstChild.querySelectorAll('nav a');
    expect(allAnchors[0]).toHaveAttribute('href', '/');
    expect(allAnchors[1]).toHaveAttribute('href', '/ice-creams');

    const navContainer = container.firstChild.querySelector('nav');
    expect(navContainer).toMatchSnapshot();
  });
});
