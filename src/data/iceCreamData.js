import axios from 'axios';

export const getIceCreams = () => {
  return axios.get('/api/menu/stock-ice-creams').then(response => {
    return response.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  });
};

export const getIceCream = id => {
  return axios
    .get(`/api/menu/stock-ice-creams/${id.toString()}`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

export const getMenu = () => {
  return axios.get('/api/menu').then(response => {
    return response.data.sort((a, b) => {
      if (a.iceCream.name < b.iceCream.name) {
        return -1;
      }
      if (a.iceCream.name > b.iceCream.name) {
        return 1;
      }
      return 0;
    });
  });
};

export const getMenuItem = id => {
  return axios
    .get(`/api/menu/${id}`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

export const postMenuItem = menuItem => {
  return axios
    .post('/api/menu', menuItem)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw err;
    });
};

export const putMenuItem = menuItem => {
  return axios
    .put(`/api/menu/${menuItem.id.toString()}`, menuItem)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

export const deleteMenuItem = id => {
  return axios.delete(`/api/menu/${id.toString()}`);
};
