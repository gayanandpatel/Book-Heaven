# Booklog: A Personal Reading Bookshelf

A full-stack web application designed to elegantly log, rate, and review your personal reading journey.

**Live Demo:** https://booklog-omega.vercel.app/
---

## Project Overview

Booklog is a digital bookshelf I developed to create a centralized, beautiful, and efficient way to track my reading habits. The goal was to move away from scattered spreadsheets and notes into a single, cohesive application. I designed and built a clean, responsive interface for browsing my book collection, viewing detailed notes, and reflecting on what I've read. The entire application is built from the ground up, featuring a custom REST API connected to a PostgreSQL database and a dynamic React frontend.

---

## Key Features

* **Dynamic Book Collection:** Browse a responsive, card-based layout of all logged books, each displaying its cover, author, and personal rating.
* **Detailed Notes View:** Each book has a dedicated page with comprehensive, timestamped notes, key takeaways, and other metadata, providing a deep dive into my thoughts.
* **External API Integration:** Book covers are dynamically fetched in real-time from the Open Library Covers API using the book's ISBN, with a custom fallback for missing images.
* **Persistent Data Storage:** All book information, ratings, and notes are managed through a custom-built Express.js REST API and stored securely in a PostgreSQL database.
* **Modern, Responsive UI:** The entire frontend was built with React and CSS Modules, focusing on a clean, mobile-first design that provides a seamless experience on any device.

---

## Technologies Used

* **Frontend:** React.js, CSS Modules
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (with the `pg` client for Node.js)
* **APIs:** Open Library Covers API



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
