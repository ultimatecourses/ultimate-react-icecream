jest.mock('../../structure/Main');
jest.mock('../../structure/LoaderMessage');
jest.mock('../IceCreamImage');
jest.mock('../../data/iceCreamData');

import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import IceCreams from '../IceCreams';
import { getIceCreams } from '../../data/iceCreamData';

const mockData = [
  { id: 0, name: 'Stripey Madness' },
  { id: 1, name: 'Cherry Blast' },
  { id: 2, name: 'Cookie Tower of Power' },
];

describe('IceCreams', () => {
  afterEach(cleanup);

  it('should render and load data', async () => {
    getIceCreams.mockResolvedValueOnce(mockData);

    const { container, getByTestId } = render(<IceCreams />);

    const heading = await waitForElement(() =>
      container.firstChild.querySelector('h2')
    );

    expect(heading).toHaveTextContent('Choose your poison and enjoy!');

    expect(getByTestId('loaderMessage')).toHaveTextContent(
      'Loading the stock list.-Loading stock list complete.'
    );

    const list = container.firstChild.querySelector('ul');

    const listItems = list.querySelectorAll('li section');
    expect(listItems.length).toBe(3);
    expect(listItems[0].querySelector('img')).toHaveAttribute(
      'src',
      'ice-cream-0.svg'
    );
    const firstAnchor = listItems[0].querySelector('h3 a');
    expect(firstAnchor).toHaveAttribute('href', '/menu-items/add?iceCreamId=0');
    expect(firstAnchor).toHaveTextContent('Stripey Madness');
    expect(listItems[1].querySelector('img')).toHaveAttribute(
      'src',
      'ice-cream-1.svg'
    );
    const secondAnchor = listItems[1].querySelector('h3 a');
    expect(secondAnchor).toHaveAttribute(
      'href',
      '/menu-items/add?iceCreamId=1'
    );
    expect(secondAnchor).toHaveTextContent('Cherry Blast');
    expect(listItems[2].querySelector('img')).toHaveAttribute(
      'src',
      'ice-cream-2.svg'
    );
    const thirdAnchor = listItems[2].querySelector('h3 a');
    expect(thirdAnchor).toHaveAttribute('href', '/menu-items/add?iceCreamId=2');
    expect(thirdAnchor).toHaveTextContent('Cookie Tower of Power');
  });

  it('should safely unmount', async () => {
    const originalErrofn = global.console.error;

    getIceCreams.mockResolvedValueOnce(mockData);

    const { unmount } = render(<IceCreams />);
    global.console.error = jest.fn();
    await unmount();
    expect(global.console.error).not.toHaveBeenCalled();
    global.console.error = originalErrofn;
  });

  it('should render text if the collection is empty', async () => {
    getIceCreams.mockResolvedValueOnce([]);

    const { container } = render(<IceCreams />);

    const placeholder = await waitForElement(() =>
      container.firstChild.querySelector('p:not(.visually-hidden)')
    );

    expect(placeholder).toHaveTextContent('Your menu is fully stocked!');
  });
});
