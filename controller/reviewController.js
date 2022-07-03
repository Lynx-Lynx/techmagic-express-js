const books = require('../models/booksList');

const checkIfReviewExists = (req, res, next) => {
  const bookId = req.id;
  const reviewId = req.params.id;

  const review = books.find(book => String(book.id) === bookId).reviews.find(review => String(review.id) === reviewId);

  if (!review) {
    return next({ status: 404, message: "Review not found" });
  }

  req.review = review;
  next();
}

module.exports = checkIfReviewExists;