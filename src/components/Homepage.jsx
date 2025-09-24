import React from 'react';
import BookCard from './BookCard'; 
import styles from './Homepage.module.css';

const Homepage = ({ books, navigateTo }) => {
  return (
    <div className={styles.container}>
      <section className={styles.subheader}>
        <p>Welcome to <strong> Books Heaven </strong>—a curated list of books I’ve explored, complete with ratings, notes, and recommendations! Here’s what you’ll find:</p>
        <p><strong> 📊 Ratings (1-10): </strong>Each book comes with my personal rating (10 = life-changing, 1 = not for me). These reflect how much I enjoyed or learned from them.</p>
        <p><strong> 📝 Detailed Notes: </strong> I’ve included key takeaways, favorite quotes, and reflections—click "Read my notes" to dive deeper.</p>
        <p><strong> 🔍 Sort & Filter: </strong></p>
        <ul>
          <li><strong>By Title (A-Z)</strong></li>
          <li><strong>By Date (Newest to Oldest)</strong></li>
          <li><strong>By Rating (Best First)</strong></li>
        </ul>
      </section>
      <hr className={styles.divider} />
      <h1 className={styles.pageTitle}>BOOKS I'VE READ</h1>

      <section className={styles.booksContainer}>
        {books.length > 0 ? (
          <div className={styles.bookList}>
            {books.map(book => (
              <BookCard key={book.id} book={book} navigateTo={navigateTo} />
            ))}
          </div>
        ) : (
          <p>No books found in the collection.</p>
        )}
      </section>
    </div>
  );
};

export default Homepage;