import SupabaseBookRepository from "../repositories/SupabaseBookRepository.js";
import CreateBook   from "../../application/usecases/CreateBook.js";
import GetAllBooks  from "../../application/usecases/GetAllBooks.js";
import GetBookByIsbn from "../../application/usecases/GetBookByIsbn.js";
import DeleteBook   from "../../application/usecases/DeleteBook.js";
import UpdateBook   from "../../application/usecases/UpdateBook.js";
import BookController from "../controllers/BookController.js";

// 1. Repository
const repository = new SupabaseBookRepository();

// 2. Use cases
const createBook    = new CreateBook(repository);
const getAllBooks    = new GetAllBooks(repository);
const getBookByIsbn = new GetBookByIsbn(repository);
const deleteBook    = new DeleteBook(repository);
const updateBook    = new UpdateBook(repository);

// 3. Controller
const bookController = new BookController({
  createBook,
  getAllBooks,
  getBookByIsbn,
  deleteBook,
  updateBook,
});

export { bookController };
