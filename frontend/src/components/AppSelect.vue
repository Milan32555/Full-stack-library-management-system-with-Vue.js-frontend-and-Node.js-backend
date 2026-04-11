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
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5c2d00;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.field__select {
  padding: 0.6rem 0.85rem;
  border: 1.5px solid #d4a96a;
  border-radius: 8px;
  background: #fffaf4;
  font-family: inherit;
  font-size: 0.95rem;
  color: #2c1a0e;
  cursor: pointer;
  outline: none;
  transition: border-color 0.18s;
}
.field__select:focus { border-color: #7c3f00; }
</style>
