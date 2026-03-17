const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

router.get('/', chefController.getChefs);
router.post('/', chefController.createChef);
router.put('/:id', chefController.updateChef);
router.patch('/:id', chefController.updateChef);
router.delete('/:id', chefController.deleteChef);

module.exports = router;
