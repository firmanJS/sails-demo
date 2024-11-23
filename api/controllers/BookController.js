/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Create a new book
  create: async (req, res) => {
    try {
      const { title, author, publishedYear } = req.body;
      const newBook = await Book.create({ title, author, publishedYear }).fetch();
      return res.status(201).json(newBook);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Get all books
  find: async (req, res) => {
    try {
      const books = await Book.find();
      return res.json(books);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Get a single book by ID
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findOne({ id });
      if (!book) return res.status(404).json({ error: 'Book not found' });
      return res.json(book);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Update a book by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, publishedYear } = req.body;
      const updatedBook = await Book.updateOne({ id }).set({ title, author, publishedYear });
      if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
      return res.json(updatedBook);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Delete a book by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.destroyOne({ id });
      if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
      return res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

