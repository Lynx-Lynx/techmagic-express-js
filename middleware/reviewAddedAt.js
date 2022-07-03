const books = require('../models/booksList');

const reviewAddedAt = (req, res, next) => {
  const now = new Date().toISOString().slice(0, 10);
  console.log(`Review was added on: ${now}`);
  next();
}

module.exports = reviewAddedAt;