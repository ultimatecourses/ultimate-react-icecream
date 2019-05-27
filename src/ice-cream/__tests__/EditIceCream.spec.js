jest.mock('../../structure/Main');
jest.mock('../../data/iceCreamData');

import React from 'react';
import {
  render,
  waitForElement,
  wait,
  fireEvent,
  cleanup,
} from 'react-testing-library';
import EditIceCream from '../EditIceCream';
import {
  getMenuItem,
  putMenuItem,
  deleteMenuItem,
} from '../../data/iceCreamData';

describe('EditIceCream', () => {
  afterEach(cleanup);

  it('should render and load data', async () => {
    getMenuItem.mockResolvedValueOnce({
      id: 3,
      iceCream: { id: 10, name: 'Snowman Godfather', image: 'icecream.svg' },
      inStock: true,
      quantity: 30,
      price: 1.5,
      description: 'Test description',
    });

    const mockMatch = { params: { menuItemId: 3 } };

    jest.useFakeTimers();
    const { container } = render(<EditIceCream match={mockMatch} />);
    jest.runTimersToTime(400);
    expect(container.firstChild.querySelector('p.loading')).toHaveTextContent(
      'Loading ice cream'
    );
    jest.useRealTimers();
    const img = await waitForElement(() =>
      container.firstChild.querySelector('img')
    );

    expect(container.firstChild.querySelector('h2')).toHaveTextContent(
      'Update this beauty'
    );

    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', 'icecream.svg');
    expect(container.firstChild.querySelector('dl dd')).toHaveTextContent(
      'Snowman Godfather'
    );

    expect(container.firstChild.querySelector('p.loading')).toBeNull();
    expect(
      container.firstChild.querySelector('p.visually-hidden')
    ).toHaveTextContent('Ice cream loaded');
  });

  it('should safely unmount', async () => {
    const originalErrofn = global.console.error;

    getMenuItem.mockResolvedValueOnce({
      id: 3,
      iceCream: { id: 10, name: 'Snowman Godfather', image: 'icecream.svg' },
      inStock: true,
      quantity: 30,
      price: 1.5,
      description: 'Test description',
    });

    const mockMatch = { params: { menuItemId: 3 } };
    const { unmount } = render(<EditIceCream match={mockMatch} />);

    global.console.error = jest.fn();

    await unmount();

    expect(global.console.error).not.toHaveBeenCalled();
    global.console.error = originalErrofn;
  });

  it('should render and redirect on 404', async () => {
    getMenuItem.mockRejectedValueOnce({ response: { status: 404 } });

    const mockMatch = { params: { menuItemId: 3 } };

    const mockHistory = { replace: jest.fn() };
    render(<EditIceCream match={mockMatch} history={mockHistory} />);
    await wait(() => {
      expect(mockHistory.replace).toHaveBeenCalledWith('/', { focus: true });
    });
  });

  it('should not redirect on other errors', async () => {
    getMenuItem.mockRejectedValueOnce({ response: { status: 409 } });

    const mockMatch = { params: { menuItemId: 3 } };

    const mockHistory = { replace: jest.fn() };
    render(<EditIceCream match={mockMatch} history={mockHistory} />);
    await wait(() => {
      expect(mockHistory.replace).not.toHaveBeenCalled();
    });
  });

  it('should save edited values on submit', async () => {
    getMenuItem.mockResolvedValueOnce({
      id: 3,
      iceCream: { id: 10, name: 'Snowman Godfather', image: 'icecream.svg' },
      inStock: true,
      quantity: 30,
      price: 1.5,
      description: 'Test description',
    });

    const mockMatch = { params: { menuItemId: 3 } };
    const mockHistory = { push: jest.fn() };
    const { getByLabelText, getByText } = render(
      <EditIceCream match={mockMatch} history={mockHistory} />
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

    expect(putMenuItem).toHaveBeenCalledWith({
      id: 3,
      description: 'This is one cool ice cream',
      iceCream: { id: 10 },
      inStock: true,
      price: 1.45,
      quantity: 20,
    });
    expect(mockHistory.push).toHaveBeenCalledWith('/', { focus: true });
  });

  it('should delete a menu item', async () => {
    getMenuItem.mockResolvedValueOnce({
      id: 3,
      iceCream: { id: 10, name: 'Snowman Godfather', image: 'icecream.svg' },
      inStock: true,
      quantity: 30,
      price: 1.5,
      description: 'Test description',
    });

    const mockMatch = { params: { menuItemId: 3 } };
    const mockHistory = { replace: jest.fn() };
    const { getByText } = render(
      <EditIceCream match={mockMatch} history={mockHistory} />
    );

    const deleteButton = await waitForElement(() => getByText('Delete'));

    await fireEvent.click(deleteButton);

    expect(deleteMenuItem).toHaveBeenCalledWith(3);
    expect(mockHistory.replace).toHaveBeenCalledWith('/', { focus: true });
  });
});
