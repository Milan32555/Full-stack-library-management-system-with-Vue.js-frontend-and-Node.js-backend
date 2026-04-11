import { ref } from "vue";
import {
  createBook,
  getAllBooks,
  getBookByIsbn,
  updateBook,
  deleteBook,
} from "../config/container.js";

export function useBooks() {
  const books   = ref([]);
  const error   = ref(null);
  const loading = ref(false);

  async function fetchAll() {
    loading.value = true;
    error.value   = null;
    try {
      books.value = await getAllBooks.execute();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function create(data) {
    error.value = null;
    try {
      await createBook.execute(data);
      await fetchAll();
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  }

  async function update(id, data) {
    error.value = null;
    try {
      await updateBook.execute(id, data);
      await fetchAll();
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  }

  async function remove(id) {
    error.value = null;
    try {
      await deleteBook.execute(id);
      await fetchAll();
    } catch (err) {
      error.value = err.message;
    }
  }

  async function findByIsbn(isbn) {
    error.value = null;
    try {
      return await getBookByIsbn.execute(isbn);
    } catch (err) {
      error.value = err.message;
      return null;
    }
  }

  return { books, error, loading, fetchAll, create, update, remove, findByIsbn };
}
