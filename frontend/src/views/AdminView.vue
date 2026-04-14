<template>
  <div class="admin">
    <div class="admin__header">
      <div>
        <h1 class="admin__title">📋 Gestión de Inventario</h1>
        <p class="admin__subtitle">{{ books.length }} libro{{ books.length !== 1 ? "s" : "" }} en el catálogo</p>
      </div>
      <AppButton icon="＋" label="Nuevo libro" @click="openCreate" />
    </div>

    <!-- Estadísticas rápidas -->
    <div class="admin__stats">
      <div class="stat-card">
        <span class="stat-card__val">{{ books.length }}</span>
        <span class="stat-card__label">Títulos</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__val">{{ totalStock }}</span>
        <span class="stat-card__label">Unidades en stock</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__val">${{ avgPrice.toLocaleString("es-CO") }}</span>
        <span class="stat-card__label">Precio promedio</span>
      </div>
      <div class="stat-card stat-card--warn">
        <span class="stat-card__val">{{ outOfStock }}</span>
        <span class="stat-card__label">Sin stock</span>
      </div>
    </div>

    <!-- Barra de búsqueda -->
    <div class="admin__toolbar">
      <input v-model="query" class="admin__search" placeholder="🔍 Buscar por título, autor o ISBN…" />
      <select v-model="filterGenre" class="admin__select">
        <option value="">Todos los géneros</option>
        <option v-for="g in availableGenres" :key="g">{{ g }}</option>
      </select>
    </div>

    <!-- Estado -->
    <div v-if="loading" class="admin__state">
      <span class="spinner"></span> Cargando…
    </div>
    <div v-else-if="error" class="admin__state admin__state--error">⚠️ {{ error }}</div>

    <!-- Tabla -->
    <div v-else class="admin__table-wrap">
      <table class="admin__table">
        <thead>
          <tr>
            <th>Portada</th>
            <th @click="sortBy('title')"   class="sortable">Título {{ sortIcon('title') }}</th>
            <th @click="sortBy('author')"  class="sortable">Autor {{ sortIcon('author') }}</th>
            <th>ISBN</th>
            <th @click="sortBy('genre')"   class="sortable">Género {{ sortIcon('genre') }}</th>
            <th @click="sortBy('price')"   class="sortable">Precio {{ sortIcon('price') }}</th>
            <th @click="sortBy('stock')"   class="sortable">Stock {{ sortIcon('stock') }}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="sorted.length === 0">
            <td colspan="8" class="admin__empty">No hay libros que coincidan.</td>
          </tr>
          <tr v-for="book in sorted" :key="book.id">
            <td>
              <img
                v-if="book.cover_url"
                :src="book.cover_url"
                :alt="book.title"
                class="admin__thumb"
              />
              <span v-else class="admin__thumb-placeholder">📖</span>
            </td>
            <td class="admin__title-cell">{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td class="admin__isbn">{{ book.isbn }}</td>
            <td>
              <span v-if="book.genre" class="admin__genre-badge">{{ book.genre }}</span>
              <span v-else class="admin__na">—</span>
            </td>
            <td class="admin__price">${{ book.price.toLocaleString("es-CO") }}</td>
            <td>
              <span :class="['admin__stock', book.stock === 0 ? 'admin__stock--out' : '']">
                {{ book.stock }}
              </span>
            </td>
            <td class="admin__actions">
              <AppButton icon="✏️" label="Editar"   variant="ghost"  @click="openEdit(book)" />
              <AppButton icon="🗑️" label="Eliminar" variant="danger" @click="handleDelete(book.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <BookModal
      v-if="showModal"
      :book="editing"
      :is-editing="!!editing"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AppButton from "../components/AppButton.vue";
import BookModal from "../components/BookModal.vue";
import { useBooks } from "../infrastructure/composables/useBooks.js";

const { books, error, loading, fetchAll, create, update, remove } = useBooks();

const query        = ref("");
const filterGenre  = ref("");
const showModal    = ref(false);
const editing      = ref(null);
const sortKey      = ref("title");
const sortDir      = ref(1); // 1 asc, -1 desc

const availableGenres = computed(() => {
  const set = new Set(books.value.map(b => b.genre).filter(Boolean));
  return [...set].sort();
});

const filtered = computed(() => {
  const q = query.value.toLowerCase();
  return books.value.filter(b => {
    const mq = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
    const mg = !filterGenre.value || b.genre === filterGenre.value;
    return mq && mg;
  });
});

const sorted = computed(() => {
  return [...filtered.value].sort((a, b) => {
    const av = a[sortKey.value] ?? "";
    const bv = b[sortKey.value] ?? "";
    if (av < bv) return -1 * sortDir.value;
    if (av > bv) return  1 * sortDir.value;
    return 0;
  });
});

const totalStock = computed(() => books.value.reduce((s, b) => s + b.stock, 0));
const avgPrice   = computed(() => books.value.length ? Math.round(books.value.reduce((s, b) => s + b.price, 0) / books.value.length) : 0);
const outOfStock = computed(() => books.value.filter(b => b.stock === 0).length);

function sortBy(key) {
  if (sortKey.value === key) sortDir.value *= -1;
  else { sortKey.value = key; sortDir.value = 1; }
}
function sortIcon(key) {
  if (sortKey.value !== key) return "↕";
  return sortDir.value === 1 ? "↑" : "↓";
}

function openCreate() { editing.value = null; showModal.value = true; }
function openEdit(book) { editing.value = book; showModal.value = true; }
function closeModal() { showModal.value = false; editing.value = null; }

async function handleSave(data) {
  if (editing.value) {
    await update(editing.value.id, data);
  } else {
    await create(data);
  }
  closeModal();
}

async function handleDelete(id) {
  if (confirm("¿Eliminar este libro del catálogo?")) await remove(id);
}

onMounted(fetchAll);
</script>

<style scoped>
.admin {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  min-height: calc(100vh - 64px);
}

.admin__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.admin__title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #2c1a0e;
  margin: 0;
}
.admin__subtitle { color: #7c5c3e; margin: 0.25rem 0 0; font-size: 0.9rem; }

.admin__toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.admin__search, .admin__select {
  padding: 0.6rem 1rem;
  border: 1.5px solid #d4a96a;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  background: #fffaf4;
  color: #2c1a0e;
  outline: none;
}
.admin__search { flex: 1; min-width: 220px; }
.admin__search:focus, .admin__select:focus { border-color: #7c3f00; }

.admin__table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid #e8d5b7;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(124, 63, 0, 0.06);
}

.admin__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.admin__table th {
  background: #2c1a0e;
  color: #f5d9a8;
  padding: 0.9rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}
.admin__table th:first-child { border-radius: 14px 0 0 0; }
.admin__table th:last-child  { border-radius: 0 14px 0 0; }
.admin__table th.sortable { cursor: pointer; user-select: none; transition: background 0.15s; }
.admin__table th.sortable:hover { background: #3d2510; }

.admin__table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f0e0c8;
  color: #2c1a0e;
  vertical-align: middle;
}
.admin__table tbody tr:last-child td { border-bottom: none; }
.admin__table tbody tr { transition: background 0.12s; }
.admin__table tbody tr:hover td { background: #fff5e8; }

.admin__thumb {
  width: 40px;
  height: 56px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}
.admin__thumb-placeholder { font-size: 1.8rem; }
.admin__title-cell { font-weight: 600; color: #2c1a0e; max-width: 200px; }
.admin__isbn { font-size: 0.78rem; color: #b08060; }
.admin__price { font-weight: 700; color: #7c3f00; }
.admin__genre-badge {
  background: #fce8cc;
  color: #a0522d;
  padding: 0.15rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}
.admin__na { color: #c8b09a; }
.admin__stock {
  font-weight: 700;
  color: #2e7d32;
  background: #e8f5e9;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.82rem;
}
.admin__stock--out {
  color: #b83228;
  background: #fdecea;
}
.admin__actions { display: flex; gap: 0.5rem; white-space: nowrap; }
.admin__empty { text-align: center; color: #b08060; padding: 3rem; }

.admin__state {
  text-align: center;
  padding: 4rem;
  color: #7c5c3e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  font-size: 1.1rem;
}
.admin__state--error { color: #c0392b; }

/* Stats */
.admin__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.stat-card {
  background: #fffaf4;
  border: 1px solid #e8d5b7;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: 0 2px 8px rgba(124, 63, 0, 0.05);
  transition: box-shadow 0.18s, transform 0.18s;
}
.stat-card:hover {
  box-shadow: 0 4px 16px rgba(124, 63, 0, 0.1);
  transform: translateY(-2px);
}
.stat-card--warn {
  border-color: #f0a060;
  background: linear-gradient(135deg, #fffaf4, #fff5eb);
}
.stat-card__val {
  font-size: 1.9rem;
  font-weight: 700;
  color: #7c3f00;
  font-family: "Playfair Display", serif;
  line-height: 1;
}
.stat-card--warn .stat-card__val { color: #b85c00; }
.stat-card__label {
  font-size: 0.78rem;
  color: #7c5c3e;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
