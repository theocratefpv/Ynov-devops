const express = require('express'),
      router = express.Router(),
      booksController = require('../controller/books');

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.addBook);
router.delete('/:id', booksController.deleteBookById);

module.exports = router;