import React from 'react';
import FocusLink from '../structure/FocusLink';
import IceCreamImage from './IceCreamImage';
import PropTypes from 'prop-types';

const IceCreamCard = ({ iceCreamId, heading, to, history, children }) => {
  const onItemClickHandler = () => {
    history.push(to, { focus: true });
  };

  const onLinkClickHandler = e => {
    //This is done to avoid the click handler of the <section>
    //firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <section
      className="card"
      onClick={() => {
        onItemClickHandler();
      }}
    >
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      focus: PropTypes.bool,
    }),
  ]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  children: PropTypes.node,
};

export default IceCreamCard;
