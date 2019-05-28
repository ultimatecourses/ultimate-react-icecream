import React from 'react';

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

export default IceCreamImage;
