import { useState, useEffect } from 'react';

const useValidation = (
  value,
  errorId,
  showError,
  validatorFn,
  isRequired,
  compareValue = null
) => {
  const [error, setError] = useState('');

  useEffect(() => {
    setError(validatorFn(value, compareValue));
  }, [value, compareValue, validatorFn]);

  return [
    error,
    {
      'aria-describedby': error && showError ? errorId : null,
      'aria-invalid': error && showError ? 'true' : 'false',
      'aria-required': isRequired ? 'true' : null,
      required: isRequired,
    },
  ];
};

export default useValidation;
