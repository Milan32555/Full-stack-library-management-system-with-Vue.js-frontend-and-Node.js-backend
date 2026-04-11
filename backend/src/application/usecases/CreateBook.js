import Book from "../../domain/entities/Book.js";

export default class CreateBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute({ id, title, author, isbn, price, stock, genre, cover_url }) {
    const book = new Book({ id, title, author, isbn, price, stock, genre, cover_url });
    return await this.bookRepository.save(book);
  }
}
