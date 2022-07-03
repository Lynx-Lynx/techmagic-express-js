const router = require('express').Router();
const books = require('../models/booksList');
const checkReview = require('../controller/reviewController');
const reviewAddedAt = require('../middleware/reviewAddedAt');

//get all reviews of a book
router.get('/', (req, res, next) => {
  try {
    const bookId = req.id;
    const reviewsList = books.find(book => String(book.id) === bookId).reviews;
    const reviews = { reviews: reviewsList}
    res.json(reviews);
  } catch(err) {
    next(err);
  } 
});

//get book review by id
router.get('/:id', checkReview, (req, res, next) => {
  try {
    res.json(req.review);;
  } catch(err) {
    next(err);
  }   
});

//add review for a book
router.post('/', reviewAddedAt, (req, res, next) => {
  const bookId = req.id;
  const reviewText = req.body.review;
  const reviewsList = books.find(book => String(book.id) === bookId).reviews;
  const review = { id: reviewsList.length + 1, comment: reviewText };
  books.find(book => String(book.id) === bookId).reviews.push(review);
  res.json(review);
});

//delete book review by id
router.delete('/:id', checkReview, (req, res, next) => {
  const bookId = req.id;
  const reviewId = req.params.id;
  const allReviews = books.find(book => String(book.id) === bookId).reviews;
  const reviewIndex = allReviews.indexOf(allReviews.find(review => String(review.id) === reviewId));
  allReviews.splice(reviewIndex, 1);
  res.json(req.review);
});

module.exports = router;