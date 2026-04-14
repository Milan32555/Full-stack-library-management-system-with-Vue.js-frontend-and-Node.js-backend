<template>
  <div class="field">
    <label :for="id" class="field__label">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      class="field__select"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  id:          { type: String, required: true },
  label:       { type: String, required: true },
  modelValue:  { type: String, default: "" },
  placeholder: { type: String, default: "Seleccionar..." },
  options:     { type: Array,  default: () => [] },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field__label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #5c2d00;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.field__select {
  padding: 0.65rem 2.2rem 0.65rem 0.9rem;
  border: 1.5px solid #d4a96a;
  border-radius: 8px;
  background: #fffaf4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237c3f00' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  appearance: none;
  -webkit-appearance: none;
  font-family: inherit;
  font-size: 0.95rem;
  color: #2c1a0e;
  cursor: pointer;
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.field__select:focus {
  border-color: #7c3f00;
  box-shadow: 0 0 0 3px rgba(124, 63, 0, 0.12);
}
</style>
