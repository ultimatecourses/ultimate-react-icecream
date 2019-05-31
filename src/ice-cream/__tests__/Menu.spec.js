jest.mock('../../structure/Main');
jest.mock('../../structure/LoaderMessage');
jest.mock('../IceCreamImage');
jest.mock('../../data/iceCreamData');

import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import Menu from '../Menu';
import { getMenu } from '../../data/iceCreamData';

const mockData = [
  {
    id: 1,
    iceCream: { id: 1, name: 'Cherry Blast' },
    inStock: true,
    quantity: 20,
    price: 1.51,
    description:
      'Blast your taste buds into fruity space with this vanilla and cherry bomb',
  },
  {
    id: 2,
    iceCream: { id: 15, name: 'Catastrophe' },
    inStock: false,
    quantity: 0,
    price: 1.64,
    description: 'A feline strawberry cranium, what could possibly go wrong?',
  },
  {
    id: 3,
    iceCream: { id: 10, name: 'Snowman Godfather' },
    inStock: true,
    quantity: 30,
    price: 1.5,
    description: "You'll lose your head over this inverted whisky-vanilla cone",
  },
];

describe('Menu', () => {
  afterEach(cleanup);

  it('should render and load data', async () => {
    getMenu.mockResolvedValueOnce(mockData);

    const { container, getByTestId } = render(<Menu />);

    const heading = await waitForElement(() =>
      container.firstChild.querySelector('h2')
    );

    expect(heading).toHaveTextContent(
      'Rock your taste buds with one of these!'
    );

    expect(getByTestId('loaderMessage')).toHaveTextContent(
      'Loading menu.-Loading menu complete.'
    );

    const list = container.firstChild.querySelector('ul');

    const listItems = list.querySelectorAll('li section');
    expect(listItems.length).toBe(3);
    expect(listItems[0].querySelector('img')).toHaveAttribute(
      'src',
      'ice-cream-1.svg'
    );
    expect(listItems[0].querySelector('div.content')).toHaveTextContent(
      '$1.5120 in stockBlast your taste buds into fruity space with this vanilla and cherry bomb'
    );
    const firstAnchor = listItems[0].querySelector('h3 a');
    expect(firstAnchor).toHaveAttribute('href', '/menu-items/1');
    expect(firstAnchor).toHaveTextContent('Cherry Blast');
    expect(listItems[1].querySelector('img')).toHaveAttribute(
      'src',
      'ice-cream-15.svg'
    );
    expect(listItems[1].querySelector('div.content')).toHaveTextContent(
      '$1.64Currently out of stock!A feline strawberry cranium, what could possibly go wrong?'
    );
    const secondAnchor = listItems[1].querySelector('h3 a');
    expect(secondAnchor).toHaveAttribute('href', '/menu-items/2');
    expect(secondAnchor).toHaveTextContent('Catastrophe');
    expect(listItems[2].querySelector('img')).toHaveAttribute(
      'src',
      'ice-cream-10.svg'
    );
    expect(listItems[2].querySelector('div.content')).toHaveTextContent(
      "$1.5030 in stockYou'll lose your head over this inverted whisky-vanilla cone"
    );
    const thirdAnchor = listItems[2].querySelector('h3 a');
    expect(thirdAnchor).toHaveAttribute('href', '/menu-items/3');
    expect(thirdAnchor).toHaveTextContent('Snowman Godfather');
  });

  it('should safely unmount', async () => {
    const originalErrofn = global.console.error;

    getMenu.mockResolvedValueOnce(mockData);

    const { unmount } = render(<Menu />);
    global.console.error = jest.fn();
    await unmount();
    expect(global.console.error).not.toHaveBeenCalled();
    global.console.error = originalErrofn;
  });

  it('should render text if the collection is empty', async () => {
    getMenu.mockResolvedValueOnce([]);

    const { container } = render(<Menu />);

    const placeholder = await waitForElement(() =>
      container.firstChild.querySelector('p:not(.visually-hidden)')
    );

    expect(placeholder).toHaveTextContent('Your menu is empty! The sadness!!');
  });
});
