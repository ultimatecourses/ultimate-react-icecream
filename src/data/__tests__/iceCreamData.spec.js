import {
  getMenu,
  getIceCreams,
  deleteMenuItem,
  putMenuItem,
  postMenuItem,
  getIceCream,
  getMenuItem,
} from '../iceCreamData';
import axios from 'axios';

afterEach(() => {
  axios.get.mockClear();
  axios.post.mockClear();
  axios.put.mockClear();
  axios.delete.mockClear();
});

describe('getMenu', () => {
  const mockMenuData = [
    {
      id: 5,
      iceCream: { id: 27, name: 'Sundae Everyday' },
      inStock: false,
      quantity: 0,
      price: 2.98,
      description: 'Hazelnut and vanilla, chocolate and cherries',
    },
    {
      id: 6,
      iceCream: { id: 21, name: 'Castle in the Sky' },
      inStock: true,
      quantity: 50,
      price: 2.19,
      description: 'A floating stronghold of vanilla, chocolate and pistachio',
    },
    {
      id: 10,
      iceCream: { id: 28, name: 'Castle in the Sky' },
      inStock: true,
      quantity: 20,
      price: 1.19,
      description:
        'Another floating stronghold of vanilla, chocolate and pistachio',
    },
    {
      id: 7,
      iceCream: { id: 24, name: 'Raspberry Pi' },
      inStock: true,
      quantity: 20,
      price: 1.29,
      description: 'Chocolate electricity on a motherboard of raspberry',
    },
  ];

  it('should fetch and sort the menu data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMenuData });

    const data = await getMenu();

    expect(axios.get).toHaveBeenCalledWith('/api/menu');

    expect(data).toEqual([
      {
        description:
          'A floating stronghold of vanilla, chocolate and pistachio',
        iceCream: { id: 21, name: 'Castle in the Sky' },
        id: 6,
        inStock: true,
        price: 2.19,
        quantity: 50,
      },
      {
        description:
          'Another floating stronghold of vanilla, chocolate and pistachio',
        iceCream: { id: 28, name: 'Castle in the Sky' },
        id: 10,
        inStock: true,
        price: 1.19,
        quantity: 20,
      },
      {
        description: 'Chocolate electricity on a motherboard of raspberry',
        iceCream: { id: 24, name: 'Raspberry Pi' },
        id: 7,
        inStock: true,
        price: 1.29,
        quantity: 20,
      },
      {
        description: 'Hazelnut and vanilla, chocolate and cherries',
        iceCream: { id: 27, name: 'Sundae Everyday' },
        id: 5,
        inStock: false,
        price: 2.98,
        quantity: 0,
      },
    ]);
  });
});

describe('getIceCream', () => {
  it('should get an ice cream', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 13, name: 'yum' } });

    const iceCream = await getIceCream(13);

    expect(axios.get).toHaveBeenCalledWith('/api/menu/stock-ice-creams/13');
    expect(iceCream).toEqual({ id: 13, name: 'yum' });
  });

  it('should pass through api errors', async () => {
    let error = null;

    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    try {
      await getIceCream(13);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual({ response: { status: 404 } });
  });
});

describe('getIceCreams', () => {
  const mockIceCreamsData = [
    { id: 4, name: 'Roswell Crash' },
    { id: 5, name: 'Arctic Rainbow' },
    { id: 6, name: 'Chocolate Hat' },
    { id: 7, name: 'Strawberry Jerry' },
    { id: 8, name: 'Chocolate Hat' },
  ];

  it('should fetch and sort the ice creams data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockIceCreamsData });

    const data = await getIceCreams();

    expect(axios.get).toHaveBeenCalledWith('/api/menu/stock-ice-creams');

    expect(data).toEqual([
      { id: 5, name: 'Arctic Rainbow' },
      { id: 6, name: 'Chocolate Hat' },
      { id: 8, name: 'Chocolate Hat' },
      { id: 4, name: 'Roswell Crash' },
      { id: 7, name: 'Strawberry Jerry' },
    ]);
  });
});

describe('deleteMenuItem', () => {
  it('should delete a menu item', async () => {
    await deleteMenuItem(12);

    expect(axios.delete).toHaveBeenCalledWith('/api/menu/12');
  });
});

describe('getMenuItem', () => {
  it('should get a menu item', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 23, someField: 10 } });

    const menuItem = await getMenuItem(23);

    expect(axios.get).toHaveBeenCalledWith('/api/menu/23');
    expect(menuItem).toEqual({ id: 23, someField: 10 });
  });

  it('should pass through api errors', async () => {
    let error = null;

    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    try {
      await getMenuItem(23);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual({ response: { status: 404 } });
  });
});

describe('putMenuItem', () => {
  it('should save an updated menu item', async () => {
    axios.put.mockResolvedValueOnce({ data: { id: 23, someOtherField: 10 } });

    const updated = await putMenuItem({ id: 23 });

    expect(axios.put).toHaveBeenCalledWith('/api/menu/23', { id: 23 });
    expect(updated).toEqual({ id: 23, someOtherField: 10 });
  });

  it('should pass through api errors', async () => {
    let error = null;

    axios.put.mockRejectedValueOnce({ response: { status: 404 } });

    try {
      await putMenuItem({ id: 23 });
    } catch (e) {
      error = e;
    }

    expect(error).toEqual({ response: { status: 404 } });
  });
});

describe('postMenuItem', () => {
  it('should save a new menu item', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 23, someField: 10 } });

    const posted = await postMenuItem({ someField: 10 });

    expect(axios.post).toHaveBeenCalledWith('/api/menu', { someField: 10 });
    expect(posted).toEqual({ id: 23, someField: 10 });
  });

  it('should pass through api errors', async () => {
    let error = null;

    axios.post.mockRejectedValueOnce({ response: { status: 409 } });

    try {
      await postMenuItem({ someField: 10 });
    } catch (e) {
      error = e;
    }

    expect(error).toEqual({ response: { status: 409 } });
  });
});
