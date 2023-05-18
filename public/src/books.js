function findAuthorById(authors, id) {
  return authors.find((author => author.id === id));
}

function findBookById(books, id) {
  return books.find((book => book.id === id));
}

function partitionBooksByBorrowedStatus(books) {
  const [borrowedBooks, returnedBooks] = books.reduce(
    ([borrowed, returned], book) =>
      book.borrows[0].returned ? [borrowed, [...returned, book]] : [[...borrowed, book], returned],
    [[], []]
  );
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map(({ id, returned }) => ({ ...accounts.find(acc => acc.id === id), returned })).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
