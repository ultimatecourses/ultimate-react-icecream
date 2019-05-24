import AddIceCream from '../AddIceCream';

jest.mock('../../structure/Main');
jest.mock('../../data/iceCreamData');

import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  cleanup,
} from 'react-testing-library';
import IceCreams from '../IceCreams';
import { getIceCreams } from '../../data/iceCreamData';

describe('AddIceCream', () => {
  afterEach(cleanup);

  it('should render and load data', async () => {
    getIceCreams.mockResolvedValueOnce([
      { id: 0, name: 'Stripey Madness', image: 'ice-cream-0.svg' },
      { id: 1, name: 'Cherry Blast', image: 'ice-cream-1.svg' },
      { id: 2, name: 'Cookie Tower of Power', image: 'ice-cream-2.svg' },
    ]);

    jest.useFakeTimers();
    const { container } = render(<IceCreams />);
    jest.runTimersToTime(400);
    expect(container.firstChild.querySelector('p.loading')).toHaveTextContent(
      'Loading the stock list.'
    );
    jest.useRealTimers();

    const list = await waitForElement(() =>
      container.firstChild.querySelector('ul')
    );

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

    expect(
      container.firstChild.querySelector('p.visually-hidden')
    ).toHaveTextContent('Loading stock list complete.');
  });

  it('should safely unmount', async () => {
    const originalErrofn = global.console.error;

    getIceCreams.mockResolvedValueOnce([
      { id: 0, name: 'Stripey Madness', image: 'ice-cream-0.svg' },
      { id: 1, name: 'Cherry Blast', image: 'ice-cream-1.svg' },
      { id: 2, name: 'Cookie Tower of Power', image: 'ice-cream-2.svg' },
    ]);

    const { unmount } = render(<IceCreams />);
    global.console.error = jest.fn();
    await unmount();
    expect(global.console.error).not.toHaveBeenCalled();
    global.console.error = originalErrofn;
  });

  it('should render text if the colleciton is empty', async () => {
    getIceCreams.mockResolvedValueOnce([]);

    const { container } = render(<IceCreams />);

    const placeholder = await waitForElement(() =>
      container.firstChild.querySelector('p:not(.visually-hidden)')
    );

    expect(placeholder).toHaveTextContent('Your menu is fully stocked!');
  });
});
