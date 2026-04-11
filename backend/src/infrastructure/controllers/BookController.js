import { v4 as uuidv4 } from "uuid";

export default class BookController {
  constructor({ createBook, getAllBooks, getBookByIsbn, deleteBook, updateBook }) {
    this.createBook    = createBook;
    this.getAllBooks    = getAllBooks;
    this.getBookByIsbn = getBookByIsbn;
    this.deleteBook    = deleteBook;
    this.updateBook    = updateBook;
  }

  async create(req, res) {
    try {
      const id   = uuidv4();
      const book = await this.createBook.execute({ id, ...req.body });
      res.status(201).json(book);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const books = await this.getAllBooks.execute();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByIsbn(req, res) {
    try {
      const book = await this.getBookByIsbn.execute(req.params.isbn);
      res.status(200).json(book);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const book = await this.updateBook.execute(req.params.id, req.body);
      res.status(200).json(book);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await this.deleteBook.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}
