const booksService = require('../services/books');
const createError = require('http-errors');

exports.getBooks = async (req, res) => {
   const books = await booksService.getBooks();
   res.set('Cache-Control', 'max-age=30'); // Using client cache
   res.json({success: true, data: books});
}

exports.getBookById = async (req, res, next) => {
   let bookId = parseInt(req.params.id); // We are sure here by using validator that we have a valid number, we can parseInt
   const books = await booksService.getBookById(bookId);
   if (books && books.length === 1) {
      res.json({success: true, data: books[0]});
   } else {
      next(createError(404, "no book found for this id"));
   }
}

exports.addBook = async (req, res, next) => {
   if (req.body && req.body.title && req.body.date) {
      const bookCreated = await booksService.addBook(req.body.title, req.body.date);
      if (bookCreated) {
         res.status(201).json({success: true, id: bookCreated.id});
      } else {
         next(createError(400, "Error when creating this book, verify your args"));
      }
   } else {
      next(createError(400, "Cannot add this book, make sure all args has been sent"));
   }
}

exports.deleteBookById = async (req, res, next) => {
   if (req.params.id) {
      const id = parseInt(req.params.id);
      const books = await booksService.getBookById(id);
      if (books.length === 1) {
         const nbOfDeletion = await booksService.deleteBookById(id);
         if (nbOfDeletion === 1) {
            res.json({success: true});
         } else {
            next(createError(500, 'Unknown error when trying to delete this book, maybe it\'s already deleted'));
         }
      } else {
         next(createError(404, `The book with id '${id}' doesn't exists, it cannot be deleted`));
      }
   } else {
      next(createError(400, "The bookId is required"));
   }
}