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
  gap: 0.35rem;
}
.field__label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #5c2d00;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.field__input {
  padding: 0.65rem 0.9rem;
  border: 1.5px solid #d4a96a;
  border-radius: 8px;
  background: #fffaf4;
  font-family: inherit;
  font-size: 0.95rem;
  color: #2c1a0e;
  transition: border-color 0.18s, box-shadow 0.18s;
  outline: none;
}
.field__input::placeholder { color: #c0a080; }
.field__input:focus {
  border-color: #7c3f00;
  box-shadow: 0 0 0 3px rgba(124, 63, 0, 0.12);
}
.field__input--error { border-color: #b83228; }
.field__input--error:focus { box-shadow: 0 0 0 3px rgba(184, 50, 40, 0.12); }
.field__error {
  font-size: 0.78rem;
  color: #b83228;
  font-weight: 500;
}
</style>
