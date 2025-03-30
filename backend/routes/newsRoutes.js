const express = require('express');
const router = express.Router();
const newsController = require('../controllers/taskController');

// CRUD Routes for News Articles
router.get('/', newsController.getNews);
router.post('/', newsController.addNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
