const express = require('express');
const router = express.Router();

// Example route (you can add more as needed)
router.get('/status', (req, res) => {
  res.send('Game server is running');
});

module.exports = router;
