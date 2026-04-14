<template>
  <article class="book-card">
    <div class="book-card__cover">
      <img
        v-if="book.cover_url && !imgError"
        :src="book.cover_url"
        :alt="book.title"
        @error="imgError = true"
      />
      <div v-else class="book-card__cover-placeholder">
        <span>📖</span>
      </div>
      <div class="book-card__actions">
        <AppButton icon="✏️" label="Editar"   variant="ghost"  @click="$emit('edit', book)" />
        <AppButton icon="🗑️" label="Eliminar" variant="danger" @click="$emit('delete', book.id)" />
      </div>
    </div>

    <div class="book-card__body">
      <span v-if="book.genre" class="book-card__genre">{{ book.genre }}</span>
      <h3 class="book-card__title">{{ book.title }}</h3>
      <p class="book-card__author">{{ book.author }}</p>

      <div class="book-card__footer">
        <span class="book-card__price">${{ book.price.toLocaleString("es-CO") }}</span>
        <span :class="['book-card__stock', book.stock === 0 ? 'book-card__stock--out' : '']">
          {{ book.stock === 0 ? "Sin stock" : `${book.stock} disponibles` }}
        </span>
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

// Fix: imgError ahora se usa en v-if para mostrar el placeholder cuando la imagen falla
const imgError = ref(false);
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  background: #fffaf4;
  border: 1px solid #e8d5b7;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(124, 63, 0, 0.07);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(124, 63, 0, 0.16);
}

/* Cover */
.book-card__cover {
  position: relative;
  width: 100%;
  height: 240px;
  background: linear-gradient(145deg, #f0dfc4 0%, #e8d0b0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.book-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}
.book-card:hover .book-card__cover img {
  transform: scale(1.04);
}
.book-card__cover-placeholder {
  font-size: 5rem;
  opacity: 0.3;
}

/* Actions overlay */
.book-card__actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 0.5rem;
  padding: 2.5rem 0.75rem 0.75rem;
  background: linear-gradient(to top, rgba(44, 26, 14, 0.82) 0%, transparent 100%);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.book-card:hover .book-card__actions {
  opacity: 1;
  transform: translateY(0);
}
.book-card__actions :deep(.btn) {
  flex: 1;
  justify-content: center;
  font-size: 0.82rem;
  padding: 0.4rem 0.5rem;
  backdrop-filter: blur(4px);
}

/* Body */
.book-card__body {
  padding: 1rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.book-card__genre {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8b4513;
  background: #fde7c8;
  padding: 0.18rem 0.55rem;
  border-radius: 20px;
  align-self: flex-start;
  border: 1px solid rgba(160, 82, 45, 0.2);
}

.book-card__title {
  font-family: "Playfair Display", serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #2c1a0e;
  margin: 0.25rem 0 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-card__author {
  font-size: 0.85rem;
  color: #7c5c3e;
  margin: 0;
  font-style: italic;
}

.book-card__footer {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #eddfc8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-card__price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #7c3f00;
}

.book-card__stock {
  font-size: 0.75rem;
  color: #2e7d32;
  font-weight: 600;
  background: #e8f5e9;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
}
.book-card__stock--out {
  color: #b83228;
  background: #fdecea;
}
</style>