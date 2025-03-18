const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticateJWT = require('../middleware/authMiddleware');

router.use(authenticateJWT);

router.post('/create', itemController.createItem);
router.get('/data', itemController.getAllItems);
router.get('/data/:id', itemController.getItemById);
router.put('/data/:id', itemController.updateItem);
router.delete('/data/:id', itemController.deleteItem);

module.exports = router;
