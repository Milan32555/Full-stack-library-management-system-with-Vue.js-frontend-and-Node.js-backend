export default class Book {
  constructor({ id, title, author, isbn, price, stock, genre, cover_url }) {
    if (!title)  throw new Error("El título es requerido");
    if (!author) throw new Error("El autor es requerido");
    if (!isbn)   throw new Error("El ISBN es requerido");
    if (price == null || Number(price) < 0) throw new Error("El precio debe ser >= 0");
    if (stock == null || !Number.isInteger(Number(stock)) || Number(stock) < 0)
      throw new Error("El stock debe ser un entero >= 0");

    this.id        = id;
    this.title     = title;
    this.author    = author;
    this.isbn      = isbn;
    this.price     = Number(price);
    this.stock     = Number(stock);
    this.genre     = genre     || null;
    this.cover_url = cover_url || null;
  }
}
