const books = require('../models/booksList');

const checkIfBookExists = (req, res, next) => {
  const bookId = req.params.id;
  const book = books.find(book => String(book.id) === bookId);

  if (!book) {
    return next({ status: 404, message: "Book not found" });
  }

  req.book = book;
  next();
}

module.exports = checkIfBookExists;