import {
  validateDescription,
  validateQuantity,
  validatePrice,
} from '../validators';

describe('Validator validateDescription', () => {
  it('should return null for a non-empty description', () => {
    expect(validateDescription('a')).toBeNull();
    expect(validateDescription('1')).toBeNull();
    expect(validateDescription('Some description')).toBeNull();
  });

  it('should return a required error message if empty', () => {
    expect(validateDescription('')).toBe('You must enter a description');
    expect(validateDescription(null)).toBe('You must enter a description');
    expect(validateDescription(undefined)).toBe('You must enter a description');
  });
});

describe('Validator validateQuantity', () => {
  it('should return null if quantity is zero string for out of stock items', () => {
    expect(validateQuantity('0', false)).toBeNull();
  });

  it('should return an error message if quantity is zero string for in stock items', () => {
    expect(validateQuantity('0', true)).toBe(
      'An in stock item should have a quantity'
    );
  });
});

describe('Validator validatePrice', () => {
  it('should return null for valid values', () => {
    expect(validatePrice('1.12')).toBeNull();
    expect(validatePrice('1.10')).toBeNull();
    expect(validatePrice('10.98')).toBeNull();
  });

  it('should return a required error message if empty', () => {
    expect(validatePrice('')).toBe('You must enter a price');
    expect(validatePrice(null)).toBe('You must enter a price');
    expect(validatePrice(undefined)).toBe('You must enter a price');
  });

  it('should return an error message for invalid values', () => {
    expect(validatePrice('1')).toBe('Please enter a valid price');
    expect(validatePrice('1.')).toBe('Please enter a valid price');
    expect(validatePrice('1.1')).toBe('Please enter a valid price');
    expect(validatePrice('a')).toBe('Please enter a valid price');
    expect(validatePrice('1.G')).toBe('Please enter a valid price');
    expect(validatePrice('G.12')).toBe('Please enter a valid price');
  });
});
