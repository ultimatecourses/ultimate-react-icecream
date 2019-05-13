import axios from 'axios';

const sortArray = (arr, sortProp) =>
  arr.sort((a, b) => {
    if (a[sortProp] < b[sortProp]) {
      return -1;
    }
    if (a[sortProp] > b[sortProp]) {
      return 1;
    }
    return 0;
  });

export const getIceCreams = () => {
  return axios.get('/api/ice-creams').then(response => {
    const iceCreams = response.data.map(iceCream => ({
      ...iceCream,
      image: require(`../assets/img/ice-cream/ice-cream-${iceCream.id.toString()}.svg`),
    }));

    return sortArray(iceCreams, 'name');
  });
};

export const getIceCream = id => {
  return axios.get(`/api/ice-creams/${id.toString()}`).then(
    response => {
      return {
        ...response.data,
        image: require(`../assets/img/ice-cream/ice-cream-${id.toString()}.svg`),
      };
    },
    err => err
  );
};

export const getMenu = () => {
  return axios.get('/api/menu').then(response => {
    const menuData = response.data.map(({ iceCream, ...rest }) => ({
      ...rest,
      iceCream: {
        ...iceCream,
        image: require(`../assets/img/ice-cream/ice-cream-${iceCream.id.toString()}.svg`),
      },
    }));
    return sortArray(menuData, 'name');
  });
};
