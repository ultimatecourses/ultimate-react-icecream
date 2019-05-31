jest.mock('../../structure/FocusLink');
jest.mock('../IceCreamImage');

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IceCreamCard } from '../IceCreamCard';

describe('IceCreamCard', () => {
  afterEach(cleanup);

  it('should render without content', () => {
    const { container } = render(
      <IceCreamCard
        iceCreamId={5}
        heading="Test card heading"
        history={{ push: jest.fn() }}
        to="/demo/path"
      />
    );
    const img = container.firstChild.querySelector('section img');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', 'ice-cream-5.svg');

    const anchor = container.firstChild.querySelector('section h3 > a');
    expect(anchor).toHaveAttribute('href', '/demo/path');
    expect(anchor).toHaveTextContent('Test card heading');
  });

  it('should render with content', () => {
    const { container } = render(
      <IceCreamCard
        iceCreamId={5}
        heading="Test card heading"
        history={{ push: jest.fn() }}
        to="/demo/path"
      >
        <p>I am some text content</p>
      </IceCreamCard>
    );

    const paragraph = container.firstChild.querySelector('section p');
    expect(paragraph).toHaveTextContent('I am some text content');
  });

  it('should navigate on container click', () => {
    const mockHistory = {
      push: jest.fn(),
    };

    const { getByText } = render(
      <IceCreamCard
        iceCreamId={5}
        heading="Test card heading"
        history={mockHistory}
        to="/demo/path"
      >
        <p>Content</p>
      </IceCreamCard>
    );

    fireEvent.click(getByText('Content'));
    expect(mockHistory.push).toHaveBeenCalledWith('/demo/path');
  });

  it('should not double navigate on anchor click', () => {
    const mockHistory = {
      push: jest.fn(),
    };

    const { getByText } = render(
      <IceCreamCard
        iceCreamId={5}
        heading="Test card heading"
        history={mockHistory}
        to="/demo/path"
      />
    );

    fireEvent.click(getByText('Test card heading'));
    expect(mockHistory.push).not.toHaveBeenCalled();
  });
});
