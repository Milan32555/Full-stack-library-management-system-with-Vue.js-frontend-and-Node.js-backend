import Book from "../../domain/entities/Book.js";

export default class UpdateBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id, data) {
    const existing = await this.bookRepository.findById(id);
    if (!existing) throw new Error(`Book with id "${id}" not found`);

    const updated = new Book({ ...existing, ...data, id });
    return await this.bookRepository.save(updated);
  }
}
