jest.mock('../IceCreamImage');

import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import IceCream from '../IceCream';

describe('IceCream', () => {
  afterEach(cleanup);

  it('should render empty', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };
    const { container, getByLabelText, queryByText, getByAltText } = render(
      <IceCream onSubmit={jest.fn()} iceCream={mockIceCream} />
    );

    expect(getByAltText('')).toHaveAttribute('src', 'ice-cream-1.svg');

    expect(container.querySelector('dl dt')).toHaveTextContent('Name :');
    expect(container.querySelector('dl dd')).toHaveTextContent(
      'Chocolate Surprise'
    );

    expect(getByLabelText('Description* :').value).toBe('');
    expect(getByLabelText('In Stock :').checked).toBe(true);
    expect(getByLabelText('Quantity :').value).toBe('0');
    expect(getByLabelText('Price* :').value).toBe('0.00');

    expect(queryByText('Save')).toBeInTheDocument();
    expect(queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should render with incoming data', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };
    const { container, getByLabelText, getByAltText } = render(
      <IceCream
        onSubmit={jest.fn()}
        iceCream={mockIceCream}
        quantity={20}
        description="A short description"
        price={1.2}
        inStock={true}
      />
    );

    expect(getByAltText('')).toHaveAttribute('src', 'ice-cream-1.svg');

    expect(container.querySelector('dl dt')).toHaveTextContent('Name :');
    expect(container.querySelector('dl dd')).toHaveTextContent(
      'Chocolate Surprise'
    );

    expect(getByLabelText('Description* :').value).toBe('A short description');
    expect(getByLabelText('In Stock :').checked).toBe(true);
    expect(getByLabelText('Quantity :').value).toBe('20');
    expect(getByLabelText('Price* :').value).toBe('1.20');
  });

  it('should validate description', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const { container, getByLabelText, getByText } = render(
      <IceCream onSubmit={jest.fn()} iceCream={mockIceCream} />
    );

    jest.useFakeTimers();

    fireEvent.click(getByText('Save'));

    const descriptionTextarea = getByLabelText('Description* :');

    jest.runAllTimers();

    expect(document.activeElement).toEqual(descriptionTextarea);

    jest.useRealTimers();

    expect(
      container.firstChild.querySelector(
        `[id="${descriptionTextarea.getAttribute('aria-describedby')}"]`
      )
    ).toHaveTextContent('You must enter a description');

    fireEvent.change(descriptionTextarea, {
      target: { value: 'A short description' },
    });

    expect(descriptionTextarea).not.toHaveAttribute('aria-describedby');
  });

  it('should validate quantity', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const { container, getByLabelText, getByText } = render(
      <IceCream
        onSubmit={jest.fn()}
        iceCream={mockIceCream}
        description="Demo description"
      />
    );

    jest.useFakeTimers();

    fireEvent.click(getByText('Save'));

    jest.runAllTimers();

    const quantitySelect = getByLabelText('Quantity :');

    expect(document.activeElement).toEqual(quantitySelect);

    jest.useRealTimers();

    expect(
      container.firstChild.querySelector(
        `[id="${quantitySelect.getAttribute('aria-describedby')}"]`
      )
    ).toHaveTextContent('An in stock item should have a quantity');

    fireEvent.change(quantitySelect, {
      target: { value: '20' },
    });

    expect(quantitySelect).not.toHaveAttribute('aria-describedby');
  });

  it('should validate price', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const { container, getByLabelText, getByText } = render(
      <IceCream
        onSubmit={jest.fn()}
        iceCream={mockIceCream}
        description="Demo description"
        inStock={true}
        quantity={20}
      />
    );

    jest.useFakeTimers();

    fireEvent.click(getByText('Save'));
    jest.runAllTimers();

    const priceInput = getByLabelText('Price* :');

    expect(document.activeElement).toEqual(priceInput);

    jest.useRealTimers();

    expect(
      container.firstChild.querySelector(
        `[id="${priceInput.getAttribute('aria-describedby')}"]`
      )
    ).toHaveTextContent('You must enter a price');

    fireEvent.change(priceInput, {
      target: { value: '1.1' },
    });

    expect(
      container.firstChild.querySelector(
        `[id="${priceInput.getAttribute('aria-describedby')}"]`
      )
    ).toHaveTextContent('Please enter a valid price');

    fireEvent.change(priceInput, {
      target: { value: '1.13' },
    });

    expect(priceInput).not.toHaveAttribute('aria-describedby');
  });

  it('should assist the user when setting "in stock" and "quantity"', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const { getByLabelText } = render(
      <IceCream
        onSubmit={jest.fn()}
        iceCream={mockIceCream}
        inStock={true}
        quantity={20}
      />
    );

    const inStockCheckBox = getByLabelText('In Stock :');
    const quantitySelect = getByLabelText('Quantity :');

    fireEvent.click(inStockCheckBox);

    expect(inStockCheckBox.checked).toBe(false);
    expect(quantitySelect.value).toBe('0');

    fireEvent.change(quantitySelect, { target: { value: '20' } });

    expect(inStockCheckBox.checked).toBe(true);
    expect(quantitySelect.value).toBe('20');
  });

  it('should not focus when there is no error', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const { getByText } = render(
      <IceCream
        onSubmit={jest.fn()}
        iceCream={mockIceCream}
        description="Demo description"
        inStock={true}
        quantity={20}
        price={1.1}
      />
    );

    const saveButton = getByText('Save');
    saveButton.focus();

    jest.useFakeTimers();

    fireEvent.click(saveButton);

    jest.runAllTimers();

    jest.useRealTimers();

    expect(document.activeElement).toEqual(saveButton);
  });

  it('should submit data', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const mockSubmitFn = jest.fn();
    const { getByText } = render(
      <IceCream
        onSubmit={mockSubmitFn}
        iceCream={mockIceCream}
        description="Demo description"
        inStock={true}
        quantity={20}
        price={1.1}
      />
    );

    fireEvent.click(getByText('Save'));

    expect(mockSubmitFn).toHaveBeenCalledWith({
      description: 'Demo description',
      iceCream: { id: 1 },
      inStock: true,
      price: 1.1,
      quantity: 20,
    });
  });

  it('should fire onDelete if present', () => {
    const mockIceCream = {
      id: 1,
      name: 'Chocolate Surprise',
    };

    const mockDeleteFn = jest.fn();
    const { getByText } = render(
      <IceCream
        onSubmit={jest.fn()}
        onDelete={mockDeleteFn}
        iceCream={mockIceCream}
        description="Demo description"
        inStock={true}
        quantity={20}
        price={1.1}
      />
    );

    fireEvent.click(getByText('Delete'));

    expect(mockDeleteFn).toHaveBeenCalled();
  });
});
