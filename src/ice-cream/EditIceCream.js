import React, { useState, useEffect, useRef } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import { getMenuItem, putMenuItem } from '../data/iceCreamData';
import PropTypes from 'prop-types';
import IceCreamImage from './IceCreamImage';
import useUniqueIds from '../hooks/useUniqueIds';
import '../styles/forms-spacer.scss';

const EditIceCream = ({ match, history }) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {},
  });
  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
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
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form noValidate onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>
                Description<span aria-hidden="true">*</span> :
              </label>
              <textarea
                id={descriptionId}
                name="description"
                rows="3"
                onChange={onChangeHandler}
                value={menuItem.description}
              />
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
              <select
                id={quantityId}
                name="quantity"
                onChange={onChangeHandler}
                value={menuItem.quantity}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <label htmlFor={priceId}>
                Price<span aria-hidden="true">*</span> :
              </label>
              <input
                id={priceId}
                type="number"
                step="0.01"
                name="price"
                onChange={onChangeHandler}
                value={menuItem.price}
              />
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
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
