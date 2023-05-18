function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
   return accounts.sort((accountA, accountB) => accountA.name.last < accountB.name.last ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let count = 0;
  
  for (const book of books) {
    const borrowList = book.borrows;
    for (const borrow of borrowList) {
      if (borrow.id === accountId) {
        count++;
      }
    }
  }
  
  return count;
}

const getBooksPossessedByAccount = (account, books, authors) =>
  books
    .filter(({ borrows }) => {
      const [lastBorrow] = borrows;
      return lastBorrow.id === account.id && !lastBorrow.returned;
    })
    .map((book) => ({ ...book, author: authors.find(({ id }) => id === book.authorId) }));

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
