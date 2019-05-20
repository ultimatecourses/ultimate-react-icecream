import React, { useState, useEffect, useRef } from 'react';
import { css } from 'emotion/macro';

const formStyle = css`
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  font-size: 1.5em;

  form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 3rem;
    padding-bottom: 3rem;

    label {
      justify-self: right;
      align-self: start;
    }

    input {
      width: 100%;
      justify-self: left;
      align-self: center;
      background-color: #fff;
      border: 1px solid #cdcdcd;
      border-radius: 0.125rem;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.12);
      color: #111;
      font-size: 1.5rem;
      font-weight: 300;
      line-height: 1.8rem;
      min-width: 10rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      vertical-align: baseline;
      outline: 0;

      &:focus {
        outline: 2px solid #282c34;
        outline-offset: 0.2rem;
      }
    }

    .btn-container {
      grid-column: 2;
      min-width: 10rem;
      justify-self: right;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2em;

      .single-button {
        grid-column: 2;
      }
    }

    .error {
      span {
        color: #ab131c;
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
    grid-gap: 3rem;
    margin-bottom: 3rem;

    dt {
      justify-self: right;
      align-self: start;
    }

    dd {
      justify-self: left;
      align-self: center;
      margin: 0;
      text-align: left;

      img {
        min-width: 10rem;
      }
    }
  }
`;

const IceCream = ({
  iceCream = {},
  data = {
    price: 0,
    quantity: 0,
    inStock: true,
    description: '',
  },
  onDelete,
  onSubmit,
}) => {
  const priceInput = useRef(null);
  const descriptionTextarea = useRef(null);
  const [error, setError] = useState({
    price: '',
    description: '',
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [internalData, setInternalData] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
  });

  useEffect(() => {
    const { price, inStock, quantity, description } = data;
    setInternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    });
  }, [data, data.price, data.quantity, data.inStock, data.description]);

  useEffect(() => {
    let errorObj = {
      price: '',
      description: '',
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

    setError(errorObj);
  }, [internalData.price, internalData.description]);

  const setDataValue = e => {
    setInternalData({
      ...internalData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!error.price && !error.description) {
      onSubmit({
        iceCream: { id: iceCream.id },
        price: parseFloat(internalData.price),
        inStock: internalData.inStock,
        quantity: parseInt(internalData.quantity),
        description: internalData.description,
      });
    } else {
      error.description
        ? descriptionTextarea.current.focus()
        : priceInput.current.focus();
    }
  };

  return (
    <div className={formStyle}>
      <dl>
        <dt>Name:</dt>
        <dd>{iceCream.name}</dd>
        {iceCream.image && (
          <>
            <dt>Picture:</dt>
            <dd>
              <img
                src={iceCream.image}
                alt={`${iceCream.name} product splash`}
              />
            </dd>
          </>
        )}
      </dl>
      <form noValidate onSubmit={onSubmitHandler}>
        <label htmlFor="iceCreamDescription">
          Description: <span aria-hidden="true">*</span>
        </label>
        <div className={error.description && hasSubmitted ? 'error' : null}>
          <textarea
            id="iceCreamDescription"
            name="description"
            aria-required="true"
            rows="10"
            aria-invalid={error.description && hasSubmitted}
            aria-describedby={
              error.description && hasSubmitted ? 'errorId' : null
            }
            ref={descriptionTextarea}
            onChange={setDataValue}
            value={internalData.description}
          />
          {error && hasSubmitted && (
            <span id="errorId">{error.description}</span>
          )}
        </div>
        <label htmlFor="iceCreamInStock">In Stock:</label>
        <input
          type="checkbox"
          name="inStock"
          onChange={setDataValue}
          checked={internalData.inStock}
        />
        <label htmlFor="iceCreamQuantity">Quantity:</label>
        <select
          id="iceCreamQuantity"
          name="quantity"
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
        <label htmlFor="iceCreamPrice">
          Price: <span aria-hidden="true">*</span>
        </label>
        <div className={error.price && hasSubmitted ? 'error' : null}>
          <input
            id="iceCreamPrice"
            type="number"
            step="0.01"
            name="price"
            aria-required="true"
            aria-invalid={error.price && hasSubmitted}
            aria-describedby={error.price && hasSubmitted ? 'errorId' : null}
            ref={priceInput}
            onChange={setDataValue}
            value={internalData.price}
          />
          {error && hasSubmitted && <span id="errorId">{error.price}</span>}
        </div>
        <div className="btn-container">
          <button
            className={`btn btn__ok${onDelete ? '' : ' single-button'}`}
            type="submit"
          >
            Save
          </button>
          {onDelete && (
            <button
              className="btn btn__warning"
              type="button"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default IceCream;
