jest.mock('../../structure/Main');
jest.mock('../../data/iceCreamData');

import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  cleanup,
} from 'react-testing-library';
import AddIceCream from '../AddIceCream';
import { getIceCream, postMenuItem } from '../../data/iceCreamData';

describe('AddIceCream', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render and load data', async () => {
    getIceCream.mockResolvedValueOnce({
      id: 3,
      name: 'Inverted Stoplight',
      image: 'icecream.svg',
    });

    const mockLocation = { search: '?iceCreamId=5' };
    jest.useFakeTimers();
    const { container } = render(<AddIceCream location={mockLocation} />);
    jest.runTimersToTime(400);
    expect(container.firstChild.querySelector('p.loading')).toHaveTextContent(
      'Loading ice cream'
    );
    jest.useRealTimers();
    const img = await waitForElement(() =>
      container.firstChild.querySelector('img')
    );
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', 'icecream.svg');
    expect(container.firstChild.querySelector('dl dd')).toHaveTextContent(
      'Inverted Stoplight'
    );

    expect(container.firstChild.querySelector('p.loading')).toBeNull();
    expect(
      container.firstChild.querySelector('p.visually-hidden')
    ).toHaveTextContent('Ice cream loaded');
  });

  it('should save a new ice-cream on submit', async () => {
    getIceCream.mockResolvedValueOnce({
      id: 3,
      name: 'Inverted Stoplight',
      image: 'icecream.svg',
    });

    const mockLocation = { search: '?iceCreamId=5' };
    const mockHistory = { push: jest.fn() };
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
