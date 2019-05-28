import React, { useEffect, useState } from 'react';

const IceCreamImage = ({ iceCreamId }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    setSrc(
      require(`../assets/img/ice-cream/ice-cream-${iceCreamId.toString()}.svg`)
    );
  }, [iceCreamId]);

  return <img src={src} alt="" />;
};

export default IceCreamImage;
