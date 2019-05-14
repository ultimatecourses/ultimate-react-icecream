const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 5000;

const iceCreams = [
  { id: 0, name: 'Stripey Madness' },
  { id: 1, name: 'Cherry Blast' },
  { id: 2, name: 'Cookie Tower of Power' },
  { id: 3, name: 'Inverted Stoplight' },
  { id: 4, name: 'Roswell Crash' },
  { id: 5, name: 'Arctic Rainbow' },
  { id: 6, name: 'Chocolate Hat' },
  { id: 7, name: 'Strawberry Jerry' },
  { id: 8, name: 'Mint Stack' },
  { id: 9, name: 'Cookie on a Stick' },
  { id: 10, name: 'Snowman Godfather' },
  { id: 11, name: 'Choco Mirror Ball' },
  { id: 12, name: 'Hearty Treat' },
  { id: 13, name: 'Strawberry Valentine' },
  { id: 14, name: "Stick 'o Lime" },
  { id: 15, name: 'Catastrophe' },
  { id: 16, name: 'Purple People Eater' },
  { id: 17, name: 'Strawberry Pine Tree' },
  { id: 18, name: 'It Blue My Mind' },
  { id: 19, name: 'Pistachio Satellite' },
  { id: 20, name: 'I Come in Peace' },
  { id: 21, name: 'Castle in the Sky' },
  { id: 22, name: 'Young Faithful' },
  { id: 23, name: 'Old Faithful' },
  { id: 24, name: 'Raspberry Pi' },
  { id: 25, name: 'Powerball' },
  { id: 26, name: 'Shaken and Whipped' },
  { id: 27, name: 'Sundae Everyday' },
  { id: 28, name: 'Toxic Sludge' },
];

let menuData = [
  { id: 1, iceCream: { id: 1, name: 'Cherry Blast' }, price: '1.51' },
  { id: 2, iceCream: { id: 15, name: 'Catastrophe' }, price: '1.64' },
  { id: 3, iceCream: { id: 10, name: 'Snowman Godfather' }, price: '1.50' },
  { id: 4, iceCream: { id: 4, name: 'Roswell Crash' }, price: '1.82' },
  { id: 5, iceCream: { id: 27, name: 'Sundae Everyday' }, price: '2.98' },
  { id: 6, iceCream: { id: 21, name: 'Castle in the Sky' }, price: '2.19' },
  { id: 7, iceCream: { id: 24, name: 'Raspberry Pi' }, price: '1.29' },
];

const getAvailableStock = () =>
  iceCreams.filter(
    iceCream =>
      menuData.find(menuItem => menuItem.iceCream.id === iceCream.id) ===
      undefined
  );

app.get('/api/menu/stock-ice-creams', (req, res) => {
  res.send(getAvailableStock());
});

app.get('/api/menu/stock-ice-creams/:id', (req, res) => {
  const iceCream = getAvailableStock().find(
    iceCream => iceCream.id === parseInt(req.params.id, 10)
  );
  if (iceCream) {
    res.send(iceCream);
  } else {
    res.status(404);
    res.send({ error: 'Ice cream not found' });
  }
});

app.get('/api/menu', (req, res) => {
  res.send(menuData);
});

app.post('/api/menu', (req, res) => {
  const { price, iceCream } = req.body;
  const newMenuItem = {
    id: menuData.reduce((prev, cur) => (cur.id > prev ? cur.id : prev), 0) + 1,
    iceCream: {
      ...iceCreams.find(item => item.id === parseInt(iceCream.id, 10)),
    },
    price,
  };
  menuData.push(newMenuItem);

  res.send(newMenuItem);
});

app.get('/api/menu/:id', (req, res) => {
  const menuItem = menuData.find(
    item => item.id === parseInt(req.params.id),
    10
  );
  if (menuItem) {
    res.send(menuItem);
  } else {
    res.status(404);
    res.send('Menu item does not exist');
  }
});

app.put('/api/menu/:id', (req, res) => {
  const intId = parseInt(req.params.id, 10);
  const { price, iceCream } = req.body;

  const updatedItem = {
    id: intId,
    iceCream: {
      ...iceCreams.find(item => item.id === parseInt(iceCream.id, 10)),
    },
    price,
  };
  menuData = menuData.map(menuItem => {
    if (menuItem.id === parseInt(req.params.id, 10)) {
      return updatedItem;
    }
    return menuItem;
  });

  res.send(updatedItem);
});

app.delete('/api/menu/:id', (req, res) => {
  menuData = menuData.filter(
    menuItem => menuItem.id !== parseInt(req.params.id, 10)
  );
  res.status(204);
  res.send();
});

app.listen(port, () =>
  console.log(`Project ICE server listening on port ${port}!`)
);
