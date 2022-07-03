const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const booksRouter = require('./routes/books');

const PORT = 3000;

app.use(express.json());

app.use('/books', booksRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}...`));