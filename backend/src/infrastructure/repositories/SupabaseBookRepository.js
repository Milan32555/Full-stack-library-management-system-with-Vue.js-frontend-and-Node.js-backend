import BookRepository from "../../domain/repositories/BookRepository.js";
import { supabase }   from "../database/supabase.js";

const TABLE = "books";

export default class SupabaseBookRepository extends BookRepository {
  async save(book) {
    const { data, error } = await supabase
      .from(TABLE)
      .upsert({ ...book }, { onConflict: "id" })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("title", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  async findByIsbn(isbn) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("isbn", isbn)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
  }
}
