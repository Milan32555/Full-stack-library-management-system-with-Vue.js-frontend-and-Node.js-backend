export default class Book {
  constructor({ id, title, author, isbn, price, stock, genre, cover_url }) {
    if (!title)  throw new Error("Title is required");
    if (!author) throw new Error("Author is required");
    if (!isbn)   throw new Error("ISBN is required");
    if (price == null || Number(price) < 0) throw new Error("Price must be >= 0");
    if (stock == null || !Number.isInteger(Number(stock)) || Number(stock) < 0)
      throw new Error("Stock must be an integer >= 0");

    this.id        = id;
    this.title     = title;
    this.author    = author;
    this.isbn      = isbn;
    this.price     = Number(price);
    this.stock     = Number(stock);
    this.genre     = genre || null;
    this.cover_url = cover_url || null;
  }
}
