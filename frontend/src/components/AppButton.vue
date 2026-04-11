<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', `btn--${variant}`]"
    @click="$emit('click')"
  >
    <span v-if="icon" class="btn__icon">{{ icon }}</span>
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label:    { type: String,  required: true },
  type:     { type: String,  default: "button" },
  variant:  { type: String,  default: "primary" }, // primary | danger | ghost
  disabled: { type: Boolean, default: false },
  icon:     { type: String,  default: "" },
});
defineEmits(["click"]);
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.1s, opacity 0.18s;
}
.btn:active { transform: scale(0.97); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.btn--primary  { background: #7c3f00; color: #fff5e6; }
.btn--primary:hover:not(:disabled)  { background: #5c2d00; }

.btn--danger   { background: #c0392b; color: #fff; }
.btn--danger:hover:not(:disabled)   { background: #96281b; }

.btn--ghost    { background: transparent; color: #7c3f00; border: 2px solid #7c3f00; }
.btn--ghost:hover:not(:disabled)    { background: #fff5e6; }

.btn__icon { font-size: 1rem; }
</style>
