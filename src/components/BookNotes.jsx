import React, { useState, useEffect } from 'react';
import styles from './BookNotes.module.css';


const API_URL = "http://localhost:3000/api";

const BookNotes = ({ bookId, navigateTo }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) {
          setIsLoading(false);
          setError("No book ID was provided.");
          return;
      };
      
      setIsLoading(true);
      setError(null);

      try {
        
        const response = await fetch(`${API_URL}/books/${bookId}`);
        if (!response.ok) {
          throw new Error(`Could not find the book. It may have been deleted.`);
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchBookDetails();
  }, [bookId]);

  if (isLoading) return <div className={styles.container}><p>Loading notes...</p></div>;
  
  if (error) return (
    <div className={styles.container}>
      <div className="alert alert-danger">Error: {error}</div>
      <button onClick={() => navigateTo('home')} className={styles.backButton}>
        <strong>Back to all books</strong>
      </button>
    </div>
  );

  if (!bookDetails) return null;

  const coverUrl = `https://covers.openlibrary.org/b/isbn/${bookDetails.isbn}-M.jpg`;
  const formattedDate = bookDetails.date ? new Date(bookDetails.date).toLocaleDateString() : 'Not specified';

  return (
    <section className={styles.container}>
      <h1>{bookDetails.book_name} - By {bookDetails.author}</h1>
      <div className={styles.contentGrid}>
        <div className={styles.bookInfoContainer}>
          {bookDetails.isbn && (
            <>
              <div className={styles.bookMeta}>
                <p><strong>ISBN:</strong> {bookDetails.isbn}</p>
                <p><strong>DATE READ:</strong> {formattedDate}</p>
                <p><strong>RECOMMENDATION:</strong> {bookDetails.recommendation}/10</p>
              </div>
              <img
                src={coverUrl}
                alt={`${bookDetails.book_name} cover`}
                className={styles.coverImage}
                onError={(e) => { e.target.onerror = null; e.target.src = '/no-cover.jpg'; }}
              />
            </>
          )}
          <div className={styles.backButtonContainer}>
            <button onClick={() => navigateTo('home')} className={styles.backButton}>
              <strong>Back to all books</strong>
            </button>
          </div>
        </div>
        
        <div className={styles.notesContainer}>
          {bookDetails.notes && bookDetails.notes.length > 0 ? (
            bookDetails.notes.map((note, index) => (
              <div className={styles.noteCard} key={index}>
                <div className={styles.noteContent}>{note.note}</div>
                <div className={styles.noteDate}>
                  <small>{new Date(note.created_at).toLocaleDateString()}</small>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">No notes have been added for this book yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookNotes;

