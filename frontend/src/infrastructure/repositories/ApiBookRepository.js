import BookRepository from "../../domain/repositories/BookRepository.js";

const BASE_URL = import.meta.env.VITE_API_URL;

export default class ApiBookRepository extends BookRepository {
  async save(book) {
    const res = await fetch(`${BASE_URL}/books`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(book),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al crear libro");
    }
    return res.json();
  }

  async findAll() {
    const res = await fetch(`${BASE_URL}/books`);
    if (!res.ok) throw new Error("Error al cargar libros");
    return res.json();
  }

  async findByIsbn(isbn) {
    const res = await fetch(`${BASE_URL}/books/${isbn}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Error al buscar libro");
    return res.json();
  }

  async update(id, data) {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al actualizar libro");
    }
    return res.json();
  }

  async delete(id) {
    const res = await fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar libro");
  }
}
