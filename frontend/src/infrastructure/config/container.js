import ApiBookRepository from "../repositories/ApiBookRepository.js";
import {
  CreateBook,
  GetAllBooks,
  GetBookByIsbn,
  UpdateBook,
  DeleteBook,
} from "../../application/usecases/index.js";

const repository = new ApiBookRepository();

export const createBook    = new CreateBook(repository);
export const getAllBooks    = new GetAllBooks(repository);
export const getBookByIsbn = new GetBookByIsbn(repository);
export const updateBook    = new UpdateBook(repository);
export const deleteBook    = new DeleteBook(repository);
