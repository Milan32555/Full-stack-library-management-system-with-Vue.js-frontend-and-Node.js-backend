import Book from "../../domain/entities/Book.js";

export class CreateBook {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const book = new Book(data);
    return await this.repo.save(book);
  }
}

export class GetAllBooks {
  constructor(repo) { this.repo = repo; }
  async execute() { return await this.repo.findAll(); }
}

export class GetBookByIsbn {
  constructor(repo) { this.repo = repo; }
  async execute(isbn) { return await this.repo.findByIsbn(isbn); }
}

export class UpdateBook {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) { return await this.repo.update(id, data); }
}

export class DeleteBook {
  constructor(repo) { this.repo = repo; }
  async execute(id) { return await this.repo.delete(id); }
}
