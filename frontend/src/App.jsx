import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch books from Flask API
  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  // Add a new book
  const addBook = () => {
    axios.post("http://localhost:5000/books", { title, author })
      .then(response => setBooks([...books, response.data]));
  };

  // Update a book
  const updateBook = (id) => {
    axios.put(`http://localhost:5000/books/${id}`, { title, author })
      .then(response => setBooks(books.map(book => book.id === id ? response.data : book)));
  };

  // Delete a book
  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)));
  };

  return (
    <div>
      <h1>📚 Book Library</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} 
            <button onClick={() => updateBook(book.id)}>✏️ Edit</button>
            <button onClick={() => deleteBook(book.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" onChange={e => setAuthor(e.target.value)} />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;
