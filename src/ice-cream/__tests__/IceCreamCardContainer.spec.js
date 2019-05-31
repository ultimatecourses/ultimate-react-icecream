import React from 'react';
import { render, cleanup } from '@testing-library/react';
import IceCreamCardContainer from '../IceCreamCardContainer';

describe('IceCreamCardContainer', () => {
  afterEach(cleanup);

  it('should render', () => {
    const IceCreamCard = ({ name }) => <span>{name}</span>;
    const mockData = [
      { id: 1, name: 'Todd' },
      { id: 2, name: 'Niels' },
      { id: 3, name: 'Almero' },
    ];

    const { container } = render(
      <IceCreamCardContainer>
        {mockData.map(item => (
          <IceCreamCard key={item.id} name={item.name} />
        ))}
      </IceCreamCardContainer>
    );

    const listItems = container.firstChild.querySelectorAll('ul li');
    expect(listItems.length).toBe(3);
    expect(listItems[0]).toContainHTML('<span>Todd</span>');
    expect(listItems[1]).toContainHTML('<span>Niels</span>');
    expect(listItems[2]).toContainHTML('<span>Almero</span>');
  });
});
