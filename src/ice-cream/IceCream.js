import React, { useState, useEffect, useRef } from 'react';
import ErrorContainer from './ErrorContainer';
import IceCreamImage from './IceCreamImage';
import useUniqueIds from '../hooks/useUniqueIds';
import useValidation from '../hooks/useValidation';
import {
  validatePrice,
  validateQuantity,
  validateDescription,
} from '../utils/validators';
import PropTypes from 'prop-types';

const IceCream = ({
  iceCream = {},
  price = 0,
  quantity = 0,
  inStock = true,
  description = '',
  onDelete,
  onSubmit,
}) => {
  const [
    descriptionId,
    descriptionErrorId,
    stockId,
    quantityId,
    quantityErrorId,
    priceId,
    priceErrorId,
  ] = useUniqueIds(7);

  const formRef = useRef(null);

  const [internalData, setInternalData] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [descriptionError, descriptionErrorProps] = useValidation(
    internalData.description,
    descriptionErrorId,
    hasSubmitted,
    validateDescription,
    true
  );

  const [quantityError, quantityErrorProps] = useValidation(
    internalData.quantity,
    quantityErrorId,
    hasSubmitted,
    validateQuantity,
    false,
    internalData.inStock
  );

  const [priceError, priceErrorProps] = useValidation(
    internalData.price,
    priceErrorId,
    hasSubmitted,
    validatePrice,
    true
  );

  useEffect(() => {
    setInternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    });
  }, [price, quantity, inStock, description]);

  const onChangeHandler = e => {
    let newInternalData = {
      ...internalData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newInternalData.inStock = e.target.value !== '0';
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newInternalData.quantity = '0';
    }

    setInternalData(newInternalData);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setHasSubmitted(true);

    if (descriptionError || quantityError || priceError) {
      setTimeout(() => {
        const errorControl = formRef.current.querySelector(
          '[aria-invalid="true"]'
        );
        errorControl.focus();
      });
    } else {
      onSubmit({
        iceCream: { id: iceCream.id },
        price: parseFloat(internalData.price),
        inStock: internalData.inStock,
        quantity: parseInt(internalData.quantity),
        description: internalData.description,
      });
    }
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="form-container">
        <dl>
          <dt>Name :</dt>
          <dd>{iceCream.name}</dd>
        </dl>
        <form noValidate onSubmit={onSubmitHandler} ref={formRef}>
          <label htmlFor={descriptionId}>
            Description<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            errorText={descriptionError}
            errorId={descriptionErrorId}
            hasSubmitted={hasSubmitted}
          >
            <textarea
              id={descriptionId}
              name="description"
              rows="3"
              onChange={onChangeHandler}
              value={internalData.description}
              {...descriptionErrorProps}
            />
          </ErrorContainer>
          <label htmlFor={stockId}>In Stock :</label>
          <div className="checkbox-wrapper">
            <input
              id={stockId}
              type="checkbox"
              name="inStock"
              onChange={onChangeHandler}
              checked={internalData.inStock}
            />
            <div className="checkbox-wrapper-checked" />
          </div>
          <label htmlFor={quantityId}>Quantity :</label>
          <ErrorContainer
            errorText={quantityError}
            errorId={quantityErrorId}
            hasSubmitted={hasSubmitted}
          >
            <select
              id={quantityId}
              name="quantity"
              onChange={onChangeHandler}
              value={internalData.quantity}
              {...quantityErrorProps}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </ErrorContainer>
          <label htmlFor={priceId}>
            Price<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            errorText={priceError}
            errorId={priceErrorId}
            hasSubmitted={hasSubmitted}
          >
            <input
              id={priceId}
              type="number"
              step="0.01"
              name="price"
              onChange={onChangeHandler}
              value={internalData.price}
              {...priceErrorProps}
            />
          </ErrorContainer>
          <div className="button-container">
            <button className="ok" type="submit">
              Save
            </button>
            {onDelete && (
              <button className="warning" type="button" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

IceCream.propTypes = {
  iceCream: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  price: PropTypes.number,
  quantity: PropTypes.number,
  inStock: PropTypes.bool,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default IceCream;
