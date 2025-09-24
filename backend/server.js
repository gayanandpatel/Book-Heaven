// server.js

// FIX 1: Changed all 'import' statements to 'require' for CommonJS consistency.
const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // This is fine, but Vercel injects env vars automatically.

const app = express();
app.use(cors());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // It's also a good practice to add SSL for production databases
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

// FIX 2: Removed the top-level db.connect().
// The pg library will handle connecting when a query is made.
db.connect(); 

app.use(bodyParser.urlencoded({ extended: true }));

// --- API ENDPOINTS ---
// (Your API endpoint code for "/api/books" and "/api/books/:id" is fine and requires no changes)

app.get("/api/books", async (req, res) => {
  try {
    const sortBy = req.query.sort || 'best';
    const searchQuery = req.query.search || '';
    
    let orderBy;
    switch(sortBy) {
        case 'title':
            orderBy = 'book_name ASC';
            break;
        case 'newest':
            orderBy = 'date DESC';
            break;
        case 'best':
        default:
            orderBy = 'recommendation DESC, book_name ASC';
    }

    let query = `SELECT id, book_name, author, isbn, descriptions, date, recommendation FROM books`;
    const params = [];
    
    if (searchQuery) {
        query += ` WHERE book_name ILIKE $1 OR author ILIKE $1 OR descriptions ILIKE $1`;
        params.push(`%${searchQuery}%`);
    }
    
    query += ` ORDER BY ${orderBy}`;

    const result = await db.query(query, params);
    res.json(result.rows);

  } catch (err) {
      console.error("Database error in /api/books:", err);
      res.status(500).json({ error: "Internal Server Error: Could not load books." });
  }
});

app.get("/api/books/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const query = `
            SELECT 
                b.id, b.book_name, b.author, b.isbn, b.date, b.recommendation,
                n.note, n.created_at
            FROM books b
            LEFT JOIN notes n ON b.id = n.book_id
            WHERE b.id = $1;
        `;
        
        const result = await db.query(query, [bookId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Book not found." });
        }
        
        const bookDetails = {
            id: result.rows[0].id,
            book_name: result.rows[0].book_name,
            author: result.rows[0].author,
            isbn: result.rows[0].isbn,
            date: result.rows[0].date,
            recommendation: result.rows[0].recommendation,
            notes: []
        };
        
        result.rows.forEach(row => {
            if (row.note !== null) {
                bookDetails.notes.push({
                    note: row.note,
                    created_at: row.created_at
                });
            }
        });
        
        res.json(bookDetails);

    } catch (err) {
        console.error(`Database error in /api/books/${req.params.id}:`, err);
        res.status(500).json({ error: "Internal Server Error: Could not load book notes." });
    }
});


// FIX 3: Removed ALL app.listen() blocks. This is essential for Vercel.
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// This is the only line needed at the end for Vercel to use the file.
module.exports = app;