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
  position: relative;
  background: linear-gradient(135deg, #1e1108 0%, #4a2600 50%, #7c3f00 100%);
  padding: 3.5rem 2rem 3rem;
  text-align: center;
  color: #fff5e6;
  overflow: hidden;
}
.catalog__hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(245, 217, 168, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.catalog__hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(245, 217, 168, 0.3), transparent);
}

.catalog__hero-title {
  position: relative;
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #f5d9a8;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.01em;
}
.catalog__hero-sub {
  position: relative;
  color: #c8a96e;
  font-size: 1rem;
  margin: 0 0 1.75rem;
  letter-spacing: 0.01em;
}

.catalog__search-wrap { position: relative; max-width: 520px; margin: 0 auto 1.25rem; }
.catalog__search {
  width: 100%;
  padding: 0.8rem 1.4rem;
  border: 2px solid transparent;
  border-radius: 50px;
  font-size: 1rem;
  font-family: inherit;
  background: rgba(255, 248, 238, 0.96);
  color: #2c1a0e;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.catalog__search::placeholder { color: #a08060; }
.catalog__search:focus {
  border-color: rgba(245, 217, 168, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(245, 217, 168, 0.25);
}

.catalog__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 720px;
  margin: 0 auto;
}
.catalog__genre-chip {
  padding: 0.3rem 0.85rem;
  border: 1.5px solid rgba(245, 217, 168, 0.35);
  border-radius: 50px;
  background: transparent;
  color: #e8c990;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
  letter-spacing: 0.01em;
}
.catalog__genre-chip:hover {
  background: rgba(245, 217, 168, 0.12);
  border-color: rgba(245, 217, 168, 0.55);
  color: #f5d9a8;
}
.catalog__genre-chip--active {
  background: #f5d9a8;
  color: #2c1a0e;
  border-color: #f5d9a8;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
