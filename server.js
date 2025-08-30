const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = {
  'user1': { stars: 100, upgrades: [] },
};

app.post('/api/buy-upgrade', (req, res) => {
  const { upgradeType, cost, userId } = req.body;
  if (!users[userId]) return res.status(404).json({ success: false, message: 'User not found' });

  const user = users[userId];
  if (user.stars < cost) return res.status(400).json({ success: false, message: 'Not enough stars' });

  user.stars -= cost;
  user.upgrades.push(upgradeType);
  res.json({ success: true, stars: user.stars, upgrades: user.upgrades });
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); });
