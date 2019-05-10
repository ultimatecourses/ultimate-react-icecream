import React, { useState, useEffect } from 'react';
import { getIceCream } from '../data/iceCreamData';

const EditIceCream = ({ iceCreamId, isAdd }) => {
  const [iceCream, setIceCream] = useState({});
  useEffect(() => {
    getIceCream(iceCreamId).then(iceCream => {
      setIceCream(iceCream);
    });
  }, []);
  return <img src={iceCream.image} alt="" />;
};

export default EditIceCream;
