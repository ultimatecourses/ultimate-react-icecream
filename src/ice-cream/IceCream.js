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

const IceCream = ({ iceCream = {}, price = '', onDelete, onSubmit }) => {
  const priceInput = useRef(null);
  const [error, setError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [internalPrice, setInternalPrice] = useState('');

  useEffect(() => {
    setInternalPrice(price);
  }, [price]);

  useEffect(() => {
    if (!internalPrice) {
      setError('You must enter a price');
      return;
    }
    const regex = /^[0-9]+(\.[0-9][0-9])$/;
    if (!regex.test(internalPrice.trim())) {
      setError('Please enter a valid price');
      return;
    }
    setError('');
  }, [internalPrice]);

  const onSubmitHandler = e => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!error) {
      onSubmit({ iceCream: { id: iceCream.id }, price: internalPrice });
    } else {
      priceInput.current.focus();
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
        <label htmlFor="iceCreamPrice">
          Price: <span aria-hidden="true">*</span>
        </label>
        <div className={error && hasSubmitted ? 'error' : null}>
          <input
            id="iceCreamPrice"
            type="text"
            aria-required="true"
            aria-invalid={error && hasSubmitted}
            aria-describedby={error && hasSubmitted ? 'errorId' : null}
            ref={priceInput}
            onChange={e => {
              setInternalPrice(e.target.value);
            }}
            value={internalPrice}
          />
          {error && hasSubmitted && <span id="errorId">{error}</span>}
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
