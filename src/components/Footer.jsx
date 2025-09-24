import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <strong>
        Copyright © {new Date().getFullYear()} by Gayanand. All rights reserved.
      </strong>
    </footer>
  );
};

export default Footer;
