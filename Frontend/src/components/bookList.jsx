import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Firestore configuration
import { collection, getDocs } from 'firebase/firestore';
import './BookList.css'; // Custom CSS for additional styling

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // Number of books per page
  const maxPageButtons = 5; // Limit the number of visible pagination buttons

  // Fetch books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const bookData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookData);
    };

    fetchBooks();
  }, []);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the pagination button range
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Book List</h1>
      <div className="row">
        {currentBooks.map((book) => (
          <div key={book.id} className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Price:</strong> {book.price}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {book.rating}
                </p>
                <p className="card-text">
                  <strong>Availability:</strong> {book.availability}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link prev-next"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index;
            return (
              <li
                key={pageNumber}
                className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link prev-next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookList;
