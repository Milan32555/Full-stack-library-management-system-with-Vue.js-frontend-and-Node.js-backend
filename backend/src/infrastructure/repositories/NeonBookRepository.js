import { randomUUID } from "node:crypto";
import BookRepository from "../../domain/repositories/BookRepository.js";
import { getSql } from "../database/neon.js";

export default class NeonBookRepository extends BookRepository {
  async save(book) {
    const sql = getSql();
    const id = book.id ?? randomUUID();

    const rows = await sql`
      insert into books (id, title, author, isbn, price, stock, genre, cover_url)
      values (${id}, ${book.title}, ${book.author}, ${book.isbn}, ${book.price}, ${book.stock}, ${book.genre}, ${book.cover_url})
      on conflict (id) do update set
        title      = excluded.title,
        author     = excluded.author,
        isbn       = excluded.isbn,
        price      = excluded.price,
        stock      = excluded.stock,
        genre      = excluded.genre,
        cover_url  = excluded.cover_url
      returning *
    `;

    return rows[0] ?? null;
  }

  async findAll() {
    const sql = getSql();
    return await sql`select * from books order by title asc`;
  }

  async findByIsbn(isbn) {
    const sql = getSql();
    const rows = await sql`select * from books where isbn = ${isbn} limit 1`;
    return rows[0] ?? null;
  }

  async findById(id) {
    const sql = getSql();
    const rows = await sql`select * from books where id = ${id} limit 1`;
    return rows[0] ?? null;
  }

  async delete(id) {
    const sql = getSql();
    await sql`delete from books where id = ${id}`;
  }
}
