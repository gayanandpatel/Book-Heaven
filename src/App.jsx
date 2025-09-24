import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Homepage from './components/Homepage.jsx';
import BookNotes from './components/BookNotes.jsx';
import './index.css';


// for local development, this points to the backend server
const API_URL = "http://localhost:3000/api";




const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBookId, setSelectedBookId] = useState(null);
  
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [sortBy, setSortBy] = useState('best');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Updated URL to fetch from /api/books
        const url = new URL(`${API_URL}/books`);
        url.searchParams.append('sort', sortBy);
        if (searchQuery) {
          url.searchParams.append('search', searchQuery);
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch books from the server. Is the backend running?');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, [sortBy, searchQuery]);

  const navigateTo = (page, bookId = null) => {
    setCurrentPage(page);
    setSelectedBookId(bookId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('home');
  };
  
  const renderPage = () => {
    if (isLoading && currentPage === 'home') return <div className="container text-center p-5"><p className="lead">Loading books...</p></div>;
    if (error) return <div className="container alert alert-danger mt-4"><strong>Error:</strong> {error}</div>;

    switch (currentPage) {
      case 'book-notes': {
        return <BookNotes bookId={selectedBookId} navigateTo={navigateTo} />;
      }
      case 'home':
      default:
        return <Homepage books={books} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        onSortChange={setSortBy} 
        onSearch={handleSearch} 
        currentSort={sortBy}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

