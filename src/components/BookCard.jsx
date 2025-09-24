import React, { useState } from 'react';
import styles from './BookCard.module.css';

const BookCard = ({ book, navigateTo }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imgError, setImgError] = useState(false);

  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
  const formattedDate = new Date(book.date).toLocaleDateString();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const description = book.descriptions || '';
  const words = description.split(' ');
  const isLongDescription = words.length > 100;
  const shortDesc = isLongDescription ? words.slice(0, 100).join(' ') + '...' : description;

  const NoCover = () => (
    <div className={styles.noCover}>
      No cover available for <br /> "{book.book_name}"
    </div>
  );

  return (
    <div className={styles.bookCard}>
      <div className={styles.bookHeader}>
        <h2 className={styles.bookTitle}>{book.book_name} - BY {book.author}</h2>
        <div className={styles.bookMeta}>
          <strong>DATE READ:</strong> {formattedDate}.{' '}
          <strong>HOW STRONGLY I RECOMMEND IT:</strong> {book.recommendation}/10
        </div>
      </div>
      <div className={styles.bookContentWrapper}>
        {book.isbn && !imgError ? (
          <img 
            src={coverUrl} 
            alt={`${book.book_name} cover`} 
            className={styles.bookCover}
            onError={() => setImgError(true)}
          />
        ) : (
          <NoCover />
        )}
        <div className={styles.bookTextContent}>
          <div className={styles.bookDescription}>
            {showFullDescription ? description : shortDesc}
          </div>
          {isLongDescription && (
            <button onClick={toggleDescription} className={styles.toggleDescription}>
              {showFullDescription ? 'Show less' : 'Show more'}
            </button>
          )}
          <div className={styles.bookNotes}>
            <button onClick={() => navigateTo('book-notes', book.id)} className={styles.notesLink}>
              <strong>Read my notes</strong>
            </button>
            , or go to the Amazon page for details and reviews.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;