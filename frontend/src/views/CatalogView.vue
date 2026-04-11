<template>
  <div class="catalog">
    <!-- Hero -->
    <header class="catalog__hero">
      <h1 class="catalog__hero-title">Descubre tu próxima lectura</h1>
      <p class="catalog__hero-sub">Más de {{ books.length }} títulos esperando por ti</p>

      <!-- Buscador -->
      <div class="catalog__search-wrap">
        <input
          v-model="query"
          class="catalog__search"
          type="text"
          placeholder="🔍  Buscar por título, autor o género…"
        />
      </div>

      <!-- Filtro género -->
      <div class="catalog__filters">
        <button
          v-for="g in availableGenres"
          :key="g"
          :class="['catalog__genre-chip', activeGenre === g ? 'catalog__genre-chip--active' : '']"
          @click="activeGenre = activeGenre === g ? '' : g"
        >{{ g }}</button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="catalog__state">
      <span class="spinner"></span> Cargando libros…
    </div>

    <!-- Error -->
    <div v-else-if="error" class="catalog__state catalog__state--error">
      ⚠️ {{ error }}
    </div>

    <!-- Grid -->
    <section v-else class="catalog__grid">
      <BookCard
        v-for="book in filtered"
        :key="book.id"
        :book="book"
        @edit="openEdit"
        @delete="handleDelete"
      />
      <p v-if="filtered.length === 0" class="catalog__empty">
        No se encontraron libros con ese criterio.
      </p>
    </section>

    <!-- Modal edición rápida -->
    <BookModal
      v-if="showModal"
      :book="editing"
      :is-editing="!!editing"
      @close="showModal = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BookCard  from "../components/BookCard.vue";
import BookModal from "../components/BookModal.vue";
import { useBooks } from "../infrastructure/composables/useBooks.js";

const { books, error, loading, fetchAll, create, update, remove } = useBooks();

const query       = ref("");
const activeGenre = ref("");
const showModal   = ref(false);
const editing     = ref(null);

const availableGenres = computed(() => {
  const set = new Set(books.value.map(b => b.genre).filter(Boolean));
  return [...set].sort();
});

const filtered = computed(() => {
  const q = query.value.toLowerCase();
  return books.value.filter(b => {
    const matchQuery = !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      (b.genre || "").toLowerCase().includes(q);
    const matchGenre = !activeGenre.value || b.genre === activeGenre.value;
    return matchQuery && matchGenre;
  });
});

function openEdit(book) {
  editing.value  = book;
  showModal.value = true;
}

async function handleSave(data) {
  if (editing.value) {
    await update(editing.value.id, data);
  } else {
    await create(data);
  }
  showModal.value = false;
  editing.value   = null;
}

async function handleDelete(id) {
  if (confirm("¿Eliminar este libro?")) await remove(id);
}

onMounted(fetchAll);
</script>

<style scoped>
.catalog { min-height: calc(100vh - 64px); }

.catalog__hero {
  background: linear-gradient(135deg, #2c1a0e 0%, #7c3f00 100%);
  padding: 3rem 2rem 2.5rem;
  text-align: center;
  color: #fff5e6;
}

.catalog__hero-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  margin: 0 0 0.4rem;
  color: #f5d9a8;
}
.catalog__hero-sub {
  color: #c8a96e;
  font-size: 1rem;
  margin: 0 0 1.5rem;
}

.catalog__search-wrap { max-width: 520px; margin: 0 auto 1.2rem; }
.catalog__search {
  width: 100%;
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-family: inherit;
  background: rgba(255,245,230,0.95);
  color: #2c1a0e;
  outline: none;
  box-sizing: border-box;
}
.catalog__search:focus { box-shadow: 0 0 0 3px rgba(245,217,168,0.5); }

.catalog__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 720px;
  margin: 0 auto;
}
.catalog__genre-chip {
  padding: 0.3rem 0.8rem;
  border: 1.5px solid rgba(245,217,168,0.4);
  border-radius: 50px;
  background: transparent;
  color: #f5d9a8;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
}
.catalog__genre-chip:hover { background: rgba(245,217,168,0.15); }
.catalog__genre-chip--active {
  background: #f5d9a8;
  color: #2c1a0e;
  border-color: #f5d9a8;
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.catalog__state {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.1rem;
  color: #7c5c3e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}
.catalog__state--error { color: #c0392b; }

.catalog__empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #b08060;
  padding: 3rem;
}

.spinner {
  display: inline-block;
  width: 20px; height: 20px;
  border: 3px solid #d4a96a;
  border-top-color: #7c3f00;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
