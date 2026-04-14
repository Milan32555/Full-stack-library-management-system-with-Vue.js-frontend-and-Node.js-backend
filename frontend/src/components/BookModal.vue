<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <header class="modal__header">
          <h2 class="modal__title">{{ isEditing ? "✏️ Editar libro" : "📖 Nuevo libro" }}</h2>
          <button class="modal__close" @click="$emit('close')">✕</button>
        </header>

        <form class="modal__body" @submit.prevent="handleSubmit">
          <div class="modal__grid">
            <AppInput id="title"  label="Título"  placeholder="El nombre del viento" v-model="form.title"  :error="errors.title"  />
            <AppInput id="author" label="Autor"   placeholder="Patrick Rothfuss"     v-model="form.author" :error="errors.author" />
            <AppInput id="isbn"   label="ISBN"    placeholder="978-0000000000"       v-model="form.isbn"   :error="errors.isbn"   />
            <AppSelect id="genre" label="Género"  v-model="form.genre" :options="genres" placeholder="Seleccionar género" />
            <AppInput id="price"  label="Precio (COP)" type="number" placeholder="29000" v-model="form.price"  :error="errors.price"  />
            <AppInput id="stock"  label="Stock"   type="number" placeholder="10"     v-model="form.stock"  :error="errors.stock"  />
          </div>
          <AppInput id="cover_url" label="URL de portada (opcional)" placeholder="https://..." v-model="form.cover_url" />

          <div v-if="serverError" class="modal__server-error">⚠️ {{ serverError }}</div>

          <div class="modal__footer">
            <AppButton type="button" label="Cancelar" variant="ghost"   @click="$emit('close')" />
            <AppButton type="submit" :label="isEditing ? 'Guardar cambios' : 'Agregar libro'" :disabled="saving" />
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch } from "vue";
import AppInput  from "./AppInput.vue";
import AppSelect from "./AppSelect.vue";
import AppButton from "./AppButton.vue";

const props = defineProps({
  book:      { type: Object,  default: null },
  isEditing: { type: Boolean, default: false },
});
const emit = defineEmits(["close", "save"]);

const genres = [
  "Clásico", "Novela", "Realismo Mágico", "Distopía",
  "Fantasía", "Ciencia Ficción", "Terror", "Romance",
  "Historia", "Filosofía", "Literatura Infantil", "Ensayo", "Poesía", "Otro",
];

const emptyForm = () => ({ title: "", author: "", isbn: "", price: "", stock: "", genre: "", cover_url: "" });

const form        = ref(emptyForm());
const errors      = ref(emptyForm());
const saving      = ref(false);
const serverError = ref("");

watch(() => props.book, (book) => {
  if (book) {
    form.value = { ...book, cover_url: book.cover_url || "", genre: book.genre || "" };
  } else {
    form.value = emptyForm();
  }
}, { immediate: true });

function validate() {
  errors.value = emptyForm();
  if (!form.value.title)  errors.value.title  = "El título es requerido";
  if (!form.value.author) errors.value.author = "El autor es requerido";
  if (!form.value.isbn)   errors.value.isbn   = "El ISBN es requerido";
  if (form.value.price === "" || Number(form.value.price) < 0) errors.value.price = "Precio inválido";
  if (form.value.stock === "" || !Number.isInteger(Number(form.value.stock)) || Number(form.value.stock) < 0)
    errors.value.stock = "Stock inválido";
  return Object.values(errors.value).every(e => e === "");
}

async function handleSubmit() {
  if (!validate()) return;
  saving.value      = true;
  serverError.value = "";
  try {
    await emit("save", { ...form.value, price: Number(form.value.price), stock: Number(form.value.stock) });
  } catch (err) {
    serverError.value = err.message;
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
@keyframes overlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 17, 8, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(4px);
  animation: overlayIn 0.2s ease;
}

.modal {
  background: #fffaf4;
  border-radius: 18px;
  width: min(96vw, 640px);
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(44, 26, 14, 0.35);
  animation: modalIn 0.28s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e8d5b7;
  position: sticky;
  top: 0;
  background: #fffaf4;
  z-index: 1;
}

.modal__title {
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  color: #2c1a0e;
  margin: 0;
}

.modal__close {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #7c5c3e;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  transition: background 0.15s;
}
.modal__close:hover { background: #f0e0c8; }

.modal__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 520px) { .modal__grid { grid-template-columns: 1fr; } }

.modal__server-error {
  background: #fdecea;
  color: #c0392b;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e8d5b7;
}
</style>
