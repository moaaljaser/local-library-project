function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => count + (!book.borrows[0].returned ? 1 : 0), 0);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((countMap, book) => {
    const { genre } = book;
    countMap[genre] = (countMap[genre] || 0) + 1;
    return countMap;
  }, {});

  const sortedGenres = Object.entries(genreCounts)
    .map(([genre, count]) => ({ name: genre, count }))
    .sort((a, b) => b.count - a.count);

  return sortedGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
    .map(({ title, borrows }) => ({ name: title, count: borrows.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorMap = books.reduce((acc, { authorId, borrows }) => {
    const author = authors.find((author) => author.id === authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    if (acc[authorName]) {
      acc[authorName] += borrows.length;
    } else {
      acc[authorName] = borrows.length;
    }
    return acc;
  }, {});

  return Object.entries(authorMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

