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

    expect(data).toEqual();
  });
});
