jest.mock('../structure/Header', () => () => <span>Header</span>);
jest.mock('../structure/Footer', () => () => <span>Footer</span>);

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  afterEach(cleanup);

  it('should render the app root', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
