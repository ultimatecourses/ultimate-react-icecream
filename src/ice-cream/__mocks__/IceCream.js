import React from 'react';

const IceCream = ({ iceCream, onSubmit }) => (
  <div>
    <span>{iceCream.name}</span>
    <button
      onClick={() => {
        onSubmit();
      }}
    />
  </div>
);
