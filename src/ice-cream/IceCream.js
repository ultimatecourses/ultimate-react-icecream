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
import { css } from 'emotion/macro';
import PropTypes from 'prop-types';

const formStyle = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1em;
  font-weight: 400;
  border: 1px solid rgba(32, 33, 36, 0.12);
  background-clip: padding-box;
  border-radius: 1em;

  .image-container {
    display: flex;
    background-color: #f8f8f8;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    border-right: 1px solid rgba(32, 33, 36, 0.1);

    img {
      flex: 1;
      align-self: center;
      justify-self: center;
      margin-left: 2em;
      margin-right: 2em;
    }
  }

  .form-container {
    background-color: #ffffff;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    padding: 2em;

    form {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 1rem;
      grid-row-gap: 0;

      label {
        justify-self: right;
        align-self: start;
        color: rgba(64, 49, 71, 0.8);
        line-height: 2.375em;
      }

      textarea {
        resize: vertical;
      }

      .checkbox-wrapper {
        min-height: 3em;

        // custom
        display: flex;
      }

      input[type='checkbox'] {
        cursor: pointer;
        outline: 0;
        margin: 1.175em 0px;
        z-index: 5;

        // custom
        opacity: 0;
        position: absolute;

        & + .checkbox-wrapper-checked {
          display: inline-block;
          width: auto;

          padding-left: 2rem;
          position: relative;

          &:before,
          &:after {
            display: inline-block;
            position: absolute;
          }

          &:before {
            content: '';
            border: 1px solid #8b9099;
            border-radius: 3px;
            display: inline-block;
            height: 1.125em;
            width: 1.125em;
            left: 0;
            top: 8px;
            transition: 0.2s box-shadow ease-in-out;
          }

          &:after {
            border-bottom: 2px solid;
            border-left: 2px solid;
            content: none;
            display: inline-block;
            height: 5px;
            left: 4px;
            top: 13px;
            width: 10px;
            transform: rotate(-45deg);
          }
        }

        &:checked + .checkbox-wrapper-checked:after {
          content: '';
          color: #fff;
        }

        &:checked + .checkbox-wrapper-checked:before {
          background: rgba(64, 49, 71, 1);
          border-color: rgba(64, 49, 71, 1);
        }

        &:focus:not(:active) + .checkbox-wrapper-checked:before {
          outline: 2px solid transparent;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #8b9099;
        }
      }

      input:not([type='checkbox']),
      select,
      textarea {
        width: 100%;
        justify-self: left;
        align-self: center;
        background: #fff;
        border: 1px solid #8b9099;
        border-radius: 6px;
        color: rgba(32, 33, 36, 1);
        font-size: 1rem;
        line-height: 2.25em;
        min-width: 10rem;
        padding: 0 0.75em;
        vertical-align: baseline;
        font-family: 'geomanist', sans-serif;
        transition: box-shadow 0.2s ease-in-out;
      }

      select {
        border-radius: 6px;
        height: 36px;
      }

      input:not([type='checkbox']),
      textarea,
      select {
        box-shadow: none;
        outline: 2px solid transparent;

        &:focus {
          outline: 2px solid transparent;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #8b9099;
        }
      }

      .button-container {
        grid-column: 2;
        min-width: 10rem;
        justify-self: left;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1em;

        button {
          display: inline-block;
          padding: 0 1em;
          line-height: 2em;
          margin: 0;
          outline: 0;
          border: 0;
          border-radius: 5em;
          font-size: 1rem;
          cursor: pointer;
          font-family: 'geomanist', sans-serif;
          transition: box-shadow 0.2s ease-in-out;

          &:focus {
            outline: 2px solid transparent;
          }
        }

        .ok {
          background-color: #0f8261;
          color: #fff;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);

          &:focus:not(:active) {
            box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15), 0 0 0 2px #ffffff,
              0 0 0 4px #0f8261;
          }

          &:active {
            box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.15);
          }
        }

        .warning {
          background: #ab131c;
          color: #fff;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);

          &:focus:not(:active) {
            box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15), 0 0 0 2px #ffffff,
              0 0 0 4px #ab131c;
          }

          &:active {
            box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.15);
          }
        }
      }

      .error {
        input,
        select,
        textarea {
          border: 1px solid #d8474f;
          background-color: rgba(216, 71, 79, 0.07);

          &:focus {
            box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(216, 71, 79, 1);
          }
        }
      }

      .error-wrapper {
        min-height: 2em;
        padding-top: 0.2em;
        padding-bottom: 0.5em;

        span {
          color: #ab131c;
        }
      }
    }

    dl {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 1rem;
      margin-bottom: 1rem;
      margin-top: 0;
      line-height: 2.375em;

      dt {
        justify-self: right;
        align-self: start;
        color: rgba(64, 49, 71, 0.8);
      }

      dd {
        justify-self: left;
        align-self: center;
        margin: 0;
        text-align: left;
      }
    }
  }

  @media screen and (max-width: 880px) {
    grid-template-columns: 1fr;

    font-size: 1em;

    .image-container {
      border-radius: 1em 1em 0 0;
      display: flex;
      justify-content: center;
      max-width: 100vw;
      padding-top: 2em;
      padding-bottom: 2em;

      img {
        max-width: 10em;
      }
    }

    .form-container {
      border-radius: 0 0 1em 1em;
      max-width: 100vw;

      form .error .error-wrapper > span {
        font-size: 0.8rem;
      }
    }
  }
`;

const IceCream = ({
  iceCream,
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
    <div className={formStyle}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div>
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
    </div>
  );
};

IceCream.propTypes = {
  iceCream: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  price: PropTypes.number,
  quantity: PropTypes.number,
  inStock: PropTypes.bool,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default IceCream;
