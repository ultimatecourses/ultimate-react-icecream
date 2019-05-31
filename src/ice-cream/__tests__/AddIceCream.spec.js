jest.mock('../../structure/Main');
jest.mock('../../structure/LoaderMessage');
jest.mock('../IceCreamImage');
jest.mock('../../data/iceCreamData');

import React from 'react';
import {
  render,
  waitForElement,
  wait,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import AddIceCream from '../AddIceCream';
import { getIceCream, postMenuItem } from '../../data/iceCreamData';

describe('AddIceCream', () => {
  afterEach(cleanup);

  it('should render and load data', async () => {
    getIceCream.mockResolvedValueOnce({
      id: 3,
      name: 'Inverted Stoplight',
    });

    const mockLocation = { search: '?iceCreamId=5' };
    const mockHistory = { push: jest.fn(), replace: jest.fn() };
    const { container, getByTestId, getByAltText } = render(
      <AddIceCream location={mockLocation} history={mockHistory} />
    );

    const heading = await waitForElement(() =>
      container.firstChild.querySelector('h2')
    );

    expect(heading).toHaveTextContent('Add some goodness to the menu');

    expect(getByTestId('loaderMessage')).toHaveTextContent(
      'Loading ice cream.-Ice cream loaded.'
    );

    expect(getByAltText('')).toHaveAttribute('src', 'ice-cream-3.svg');

    expect(container.firstChild.querySelector('dl dd')).toHaveTextContent(
      'Inverted Stoplight'
    );
  });

  it('should safely unmount', async () => {
    const originalErrofn = global.console.error;

    getIceCream.mockResolvedValueOnce({
      id: 3,
      name: 'Inverted Stoplight',
    });

    const mockLocation = { search: '?iceCreamId=5' };
    const mockHistory = { push: jest.fn(), replace: jest.fn() };
    const { unmount } = render(
      <AddIceCream location={mockLocation} history={mockHistory} />
    );
    global.console.error = jest.fn();
    await unmount();
    expect(global.console.error).not.toHaveBeenCalled();
    global.console.error = originalErrofn;
  });

  it('should render and redirect on 404', async () => {
    getIceCream.mockRejectedValueOnce({ response: { status: 404 } });

    const mockLocation = { search: '?iceCreamId=5' };
    const mockHistory = { replace: jest.fn(), push: jest.fn() };
    render(<AddIceCream location={mockLocation} history={mockHistory} />);
    await wait(() => {
      expect(mockHistory.replace).toHaveBeenCalledWith('/', { focus: true });
    });
  });

  it('should not redirect on other errors', async () => {
    getIceCream.mockRejectedValueOnce({ response: { status: 409 } });

    const mockLocation = { search: '?iceCreamId=5' };
    const mockHistory = { push: jest.fn(), replace: jest.fn() };
    render(<AddIceCream location={mockLocation} history={mockHistory} />);
    await wait(() => {
      expect(mockHistory.replace).not.toHaveBeenCalled();
    });
  });

  it('should save a new ice-cream on submit', async () => {
    getIceCream.mockResolvedValueOnce({
      id: 3,
      name: 'Inverted Stoplight',
    });

    const mockLocation = { search: '?iceCreamId=5' };
    const mockHistory = { push: jest.fn(), replace: jest.fn() };
    const { getByLabelText, getByText } = render(
      <AddIceCream location={mockLocation} history={mockHistory} />
    );
    const descriptionTextarea = await waitForElement(() =>
      getByLabelText('Description* :')
    );
    const quantitySelect = getByLabelText('Quantity :');
    const priceInput = getByLabelText('Price* :');

    fireEvent.change(descriptionTextarea, {
      target: { value: 'This is one cool ice cream' },
    });
    fireEvent.change(quantitySelect, { target: { value: '20' } });
    fireEvent.change(priceInput, { target: { value: '1.45' } });

    const saveButton = getByText('Save');

    await fireEvent.click(saveButton);

    expect(postMenuItem).toHaveBeenCalledWith({
      description: 'This is one cool ice cream',
      iceCream: { id: 3 },
      inStock: true,
      price: 1.45,
      quantity: 20,
    });
    expect(mockHistory.push).toHaveBeenCalledWith('/', { focus: true });
  });
});
