import React from 'react';
import { render, cleanup } from '@testing-library/react';
import IceCreamImage from '../IceCreamImage';

describe('IceCreamImage', () => {
  afterEach(cleanup);
  it('should load and display the ice cream image', () => {
    const { container } = render(<IceCreamImage iceCreamId={12} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
