import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors"; // Import cors
import { yourUser, yourHost, yourDatabase, yourPassword, yourPort } from "./config.js";

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

const db = new pg.Client({
  user: yourUser,
  host: yourHost,
  database: yourDatabase,
  password: yourPassword,
  port: yourPort,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET / - Fetches all books with sorting and searching
app.get("/", async (req, res) => {
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
    let params = [];
    
    if (searchQuery) {
        query += ` WHERE book_name ILIKE $1 OR author ILIKE $1 OR descriptions ILIKE $1`;
        params.push(`%${searchQuery}%`);
    }
    
    query += ` ORDER BY ${orderBy}`;

    const result = await db.query(query, params);
    
    // CHANGE: Instead of rendering, send JSON data
    res.json(result.rows);

  } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Error loading books" });
  }
});

// GET /notes/:id - Fetches a single book and its notes
app.get("/notes/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        
        const bookQuery = `SELECT id, book_name, author, isbn, date, recommendation FROM books WHERE id = $1`;
        const bookResult = await db.query(bookQuery, [bookId]);
        
        if (bookResult.rows.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        
        const book = bookResult.rows[0];
        
        const notesQuery = `SELECT note, created_at FROM notes WHERE book_id = $1 ORDER BY created_at DESC`;
        const notesResult = await db.query(notesQuery, [bookId]);
        
        // CHANGE: Send a single JSON object containing both book and notes
        res.json({
            ...book,
            notes: notesResult.rows
        });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Error loading book notes" });
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});