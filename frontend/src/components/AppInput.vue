<template>
  <div class="field">
    <label :for="id" class="field__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="field__input"
      :class="{ 'field__input--error': error }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="field__error">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  id:          { type: String, required: true },
  label:       { type: String, required: true },
  modelValue:  { type: [String, Number], default: "" },
  type:        { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  error:       { type: String, default: "" },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.field__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5c2d00;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.field__input {
  padding: 0.6rem 0.85rem;
  border: 1.5px solid #d4a96a;
  border-radius: 8px;
  background: #fffaf4;
  font-family: inherit;
  font-size: 0.95rem;
  color: #2c1a0e;
  transition: border-color 0.18s, box-shadow 0.18s;
  outline: none;
}
.field__input:focus {
  border-color: #7c3f00;
  box-shadow: 0 0 0 3px rgba(124, 63, 0, 0.15);
}
.field__input--error {
  border-color: #c0392b;
}
.field__error {
  font-size: 0.8rem;
  color: #c0392b;
}
</style>
