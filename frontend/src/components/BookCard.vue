<template>
  <article class="book-card">
    <div class="book-card__cover">
      <img
        v-if="book.cover_url"
        :src="book.cover_url"
        :alt="book.title"
        @error="imgError = true"
      />
      <div v-else class="book-card__cover-placeholder">
        <span>📖</span>
      </div>
    </div>

    <div class="book-card__body">
      <span v-if="book.genre" class="book-card__genre">{{ book.genre }}</span>
      <h3 class="book-card__title">{{ book.title }}</h3>
      <p class="book-card__author">{{ book.author }}</p>
      <p class="book-card__isbn">ISBN: {{ book.isbn }}</p>

      <div class="book-card__footer">
        <div class="book-card__meta">
          <span class="book-card__price">${{ book.price.toLocaleString("es-CO") }}</span>
          <span :class="['book-card__stock', book.stock === 0 ? 'book-card__stock--out' : '']">
            {{ book.stock === 0 ? "Sin stock" : `${book.stock} disponibles` }}
          </span>
        </div>
        <div class="book-card__actions">
          <AppButton icon="✏️" label="Editar"   variant="ghost"  @click="$emit('edit', book)" />
          <AppButton icon="🗑️" label="Eliminar" variant="danger" @click="$emit('delete', book.id)" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";
import AppButton from "./AppButton.vue";

defineProps({
  book: { type: Object, required: true },
});
defineEmits(["edit", "delete"]);
const imgError = ref(false);
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  background: #fffaf4;
  border: 1px solid #e8d5b7;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(124, 63, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(124, 63, 0, 0.14);
}

.book-card__cover {
  width: 100%;
  height: 200px;
  background: #f0e0c8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.book-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.book-card__cover-placeholder {
  font-size: 4rem;
  opacity: 0.4;
}

.book-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.book-card__genre {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #a0522d;
  background: #fce8cc;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  align-self: flex-start;
}

.book-card__title {
  font-family: "Playfair Display", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c1a0e;
  margin: 0.2rem 0 0;
  line-height: 1.3;
}

.book-card__author {
  font-size: 0.88rem;
  color: #7c5c3e;
  margin: 0;
  font-style: italic;
}

.book-card__isbn {
  font-size: 0.75rem;
  color: #b08060;
  margin: 0;
}

.book-card__footer {
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid #e8d5b7;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.book-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-card__price {
  font-size: 1.15rem;
  font-weight: 700;
  color: #7c3f00;
}

.book-card__stock {
  font-size: 0.78rem;
  color: #4caf50;
  font-weight: 600;
}
.book-card__stock--out { color: #c0392b; }

.book-card__actions {
  display: flex;
  gap: 0.5rem;
}
.book-card__actions .btn { flex: 1; justify-content: center; font-size: 0.82rem; padding: 0.4rem 0.6rem; }
</style>
