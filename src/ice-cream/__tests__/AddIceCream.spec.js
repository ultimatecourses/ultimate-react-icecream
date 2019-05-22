jest.mock('../../structure/Main');

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import AddIceCream from '../AddIceCream';

describe('AddIceCream', function() {
  it('should render', function() {
    const mockLocation = { search: '?iceCreamId=5' };
    const { debug } = render(<AddIceCream location={mockLocation} />);

    debug();
  });
});
