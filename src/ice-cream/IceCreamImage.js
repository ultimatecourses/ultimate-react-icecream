import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({ iceCreamId }) => {
  return (
    iceCreamId !== null &&
    iceCreamId !== undefined && (
      <img
        src={`${
          process.env.PUBLIC_URL
        }/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
        alt=""
      />
    )
  );
};

IceCreamImage.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
};

export default IceCreamImage;
