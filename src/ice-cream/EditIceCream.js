import React, { useState, useEffect, useRef } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import { getMenuItem, putMenuItem, deleteMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import IceCreamImage from './IceCreamImage';
import ErrorContainer from './ErrorContainer';
import useUniqueIds from '../hooks/useUniqueIds';
import useValidation from '../hooks/useValidation';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../utils/validators';

const EditIceCream = ({ match, history }) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {},
  });
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

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [descriptionError, descriptionErrorProps] = useValidation(
    menuItem.description,
    descriptionErrorId,
    hasSubmitted,
    validateDescription,
    true
  );

  const [quantityError, quantityErrorProps] = useValidation(
    menuItem.quantity,
    quantityErrorId,
    hasSubmitted,
    validateQuantity,
    false,
    menuItem.inStock
  );

  const [priceError, priceErrorProps] = useValidation(
    menuItem.price,
    priceErrorId,
    hasSubmitted,
    validatePrice,
    true
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getMenuItem(match.params.menuItemId)
      .then(({ id, price, inStock, quantity, description, iceCream }) => {
        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          });
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace('/', { focus: true });
        }
      });
  }, [match.params.menuItemId, history]);

  const onChangeHandler = e => {
    let newMenuItemData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== '0';
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuItemData.quantity = '0';
    }

    setMenuItem(newMenuItemData);
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
      const { id, price, inStock, quantity, description, iceCream } = menuItem;
      const submitItem = {
        id,
        iceCream: { id: iceCream.id },
        price: parseFloat(price),
        inStock,
        quantity: parseInt(quantity),
        description,
      };

      putMenuItem(submitItem).then(() => {
        history.push('/', { focus: true });
      });
    }
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then(() => {
      history.replace('/', { focus: true });
    });
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMsg="Loading ice cream."
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div>
            <div className="form-container">
              <dl>
                <dt>Name :</dt>
                <dd>{menuItem.iceCream.name}</dd>
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
                    value={menuItem.description}
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
                    checked={menuItem.inStock}
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
                    value={menuItem.quantity}
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
                    value={menuItem.price}
                    {...priceErrorProps}
                  />
                </ErrorContainer>
                <div className="button-container">
                  <button className="ok" type="submit">
                    Save
                  </button>
                  <button
                    className="warning"
                    type="button"
                    onClick={onDeleteHandler}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default EditIceCream;
