import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ onSortChange, onSearch, currentSort }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a className={styles.navbarBrand} href="/">
          <img src="/book-heaven.png" alt="Book Heaven Icon" className={styles.logo} />
          <span className={styles.title}>Books Heaven</span>
        </a>
        <div className={styles.navControls}>
          <div className={styles.dropdown}>
            <button className={styles.dropdownToggle} type="button">
              Sort By: {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
            </button>
            <ul className={styles.dropdownMenu}>
              {/* Use onClick to trigger sort function */}
              <li><button className={styles.dropdownItem} onClick={() => onSortChange('best')}>Best</button></li>
              <li><button className={styles.dropdownItem} onClick={() => onSortChange('title')}>Title</button></li>
              <li><button className={styles.dropdownItem} onClick={() => onSortChange('newest')}>Newest</button></li>
            </ul>
          </div>
          <form className={styles.searchForm} role="search" onSubmit={handleSearchSubmit}>
            <input
              className={styles.formControl}
              type="search"
              name="search"
              placeholder="Search for books..."
              aria-label="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;