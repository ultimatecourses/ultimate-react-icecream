import React, { useState, useEffect, useRef } from 'react';
import { css } from 'emotion/macro';

const formStyle = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-weight: bold;
  font-size: 1.5em;

  .image-container {
    display: flex;
    background-color: #f8f8f8;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;

    img {
      flex: 1;
      align-self: center;
      justify-self: center;
      margin-left: 0.5em;
      margin-right: 0.5em;
    }
  }

  .form-container {
    background-color: #ffffff;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    padding: 2em;

    form {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 1rem;

      label {
        justify-self: right;
        align-self: start;
      }

      textarea {
        resize: vertical;
      }

      input[type='checkbox'] {
        width: 2.2em;
        height: 2.2em;
        cursor: pointer;
        margin-bottom: 1.9em;
      }

      input:not([type='checkbox']),
      select,
      textarea {
        width: 100%;
        justify-self: left;
        align-self: center;
        background-color: #fff;
        border: 1px solid #f23794;
        border-radius: 0.5rem;
        color: #111;
        font-size: 1.3rem;
        font-weight: 300;
        line-height: 1.5rem;
        min-width: 10rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        vertical-align: baseline;
      }

      input,
      textarea,
      select {
        outline: 0;
        &:focus {
          outline: 2px solid transparent;
          box-shadow: 0 0 2px 4px rgba(242, 55, 148, 1);
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
          padding: 0.2em 1em;
          margin: 0;
          outline: 0;
          border: 2px solid transparent;
          border-radius: 5em;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;

          &:focus {
            outline: 2px solid transparent;
          }

          &:hover {
            transform: scale(1.1);
            transition: all 0.2s ease-in-out;
          }
        }
        .ok {
          background-color: #0f8261;
          color: #fff;

          &:focus:not(:hover) {
            border: 2px solid #0f8261;
            background-color: #ffffff;
            color: #0f8261;
          }

          &:hover {
            background-color: #0a523c;
          }
        }
        .warning {
          background: #ab131c;
          color: #fff;

          &:focus:not(:hover) {
            border: 2px solid #ab131c;
            background-color: #ffffff;
            color: #ab131c;
          }

          &:hover {
            background-color: #880c14;
          }
        }
      }

      .error-wrapper {
        min-height: 1.3em;
      }
      .error {
        span {
          color: #ab131c;
          font-size: 1.3rem;
        }

        input {
          border: 1px solid #ab131c;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.12);
        }
      }
    }

    dl {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 1rem;
      margin-bottom: 1rem;
      margin-top: 0;

      dt {
        justify-self: right;
        align-self: start;
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
  iceCream = {},
  price = 0,
  quantity = 0,
  inStock = true,
  description = '',
  onDelete,
  onSubmit,
}) => {
  let refs = {
    price: useRef(null),
    quantity: useRef(null),
    description: useRef(null),
  };

  const [internalData, setInternalData] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
  });
  const [error, setError] = useState({
    description: '',
    quantity: '',
    price: '',
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setInternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    });
  }, [price, quantity, inStock, description]);

  useEffect(() => {
    let errorObj = {
      description: '',
      quantity: '',
      price: '',
    };

    const regex = /^[0-9]+(\.[0-9][0-9])$/;

    if (!internalData.price || internalData.price === '0.00') {
      errorObj.price = 'You must enter a price';
    } else if (!regex.test(internalData.price.trim())) {
      errorObj.price = 'Please enter a valid price';
    }

    if (!internalData.description) {
      errorObj.description = 'You must enter a description';
    }

    if (internalData.inStock && internalData.quantity === '0') {
      errorObj.quantity = 'An in stock item should have a quantity';
    }

    setError(errorObj);
  }, [internalData]);

  const setDataValue = e => {
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

    const errorNames = Object.keys(error).filter(name => error[name]);
    setHasSubmitted(true);

    if (errorNames.length > 0) {
      refs[errorNames[0]].current.focus();
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
        <img src={iceCream.image} alt="" />
      </div>
      <div>
        <div className="form-container">
          <dl>
            <dt>Name :</dt>
            <dd>{iceCream.name}</dd>
          </dl>
          <form noValidate onSubmit={onSubmitHandler}>
            <label htmlFor="iceCreamDescription">
              Description<span aria-hidden="true">*</span> :
            </label>
            <div className={error.description && hasSubmitted ? 'error' : null}>
              <textarea
                id="iceCreamDescription"
                name="description"
                aria-required="true"
                rows="5"
                aria-invalid={error.description && hasSubmitted}
                aria-describedby={
                  error.description && hasSubmitted ? 'descriptionError' : null
                }
                ref={refs.description}
                onChange={setDataValue}
                value={internalData.description}
              />
              <div className="error-wrapper">
                {error.description && hasSubmitted && (
                  <span id="descriptionError">{error.description}</span>
                )}
              </div>
            </div>
            <label htmlFor="iceCreamInStock">In Stock :</label>
            <input
              id="iceCreamInStock"
              type="checkbox"
              name="inStock"
              onChange={setDataValue}
              checked={internalData.inStock}
            />
            <label htmlFor="iceCreamQuantity">Quantity :</label>
            <div className={error.quantity && hasSubmitted ? 'error' : null}>
              <select
                id="iceCreamQuantity"
                name="quantity"
                ref={refs.quantity}
                aria-invalid={error.quantity && hasSubmitted}
                aria-describedby={
                  error.quantity && hasSubmitted ? 'quantityError' : null
                }
                onChange={setDataValue}
                value={internalData.quantity}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <div className="error-wrapper">
                {error.quantity && hasSubmitted && (
                  <span id="quantityError">{error.quantity}</span>
                )}
              </div>
            </div>
            <label htmlFor="iceCreamPrice">
              Price<span aria-hidden="true">*</span> :
            </label>
            <div className={error.price && hasSubmitted ? 'error' : null}>
              <input
                id="iceCreamPrice"
                type="number"
                step="0.01"
                name="price"
                aria-required="true"
                aria-invalid={error.price && hasSubmitted}
                aria-describedby={
                  error.price && hasSubmitted ? 'errorId' : null
                }
                ref={refs.price}
                onChange={setDataValue}
                value={internalData.price}
              />
              <div className="error-wrapper">
                {error.price && hasSubmitted && (
                  <span id="errorId">{error.price}</span>
                )}
              </div>
            </div>
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

export default IceCream;
