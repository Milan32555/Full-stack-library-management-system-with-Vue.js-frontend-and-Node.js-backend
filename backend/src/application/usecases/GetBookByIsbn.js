export default class GetBookByIsbn {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(isbn) {
    const book = await this.bookRepository.findByIsbn(isbn);
    if (!book) throw new Error(`Book with ISBN "${isbn}" not found`);
    return book;
  }
}
