const router = require('express').Router();
const books = require('../models/booksList');
const reviews = require('./reviews');
const checkBook = require('../controller/bookController');

router.use('/:id/reviews', (req, res, next) => {
  req.id = req.params.id;
  next()
}, reviews);

//get list of all books
router.get('/', (req, res, next) => res.json({ books: books}));

router.get('/:id', checkBook, (req, res, next) => {
  try {
    res.json(req.book);
  } catch(err) {
      next(err);
  }
});

//add a book
router.post('/', (req, res, next) => {
  const bookName = req.body.title;
  const book = { id: books.length + 1, title: bookName, reviews: [] };
  books.push(book);
  res.json(book);
});

//update book title
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const newBookTitle = req.body.title;
  books.find(book => String(book.id) === id).title = newBookTitle;
  res.json({ title: newBookTitle });
});

module.exports = router;