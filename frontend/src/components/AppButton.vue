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
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 0.18s, transform 0.12s, box-shadow 0.18s, opacity 0.18s;
}
.btn:active:not(:disabled) { transform: scale(0.96); }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.btn--primary {
  background: #7c3f00;
  color: #fff5e6;
  box-shadow: 0 2px 8px rgba(124, 63, 0, 0.28);
}
.btn--primary:hover:not(:disabled) {
  background: #5c2d00;
  box-shadow: 0 4px 14px rgba(124, 63, 0, 0.38);
}

.btn--danger {
  background: #b83228;
  color: #fff;
  box-shadow: 0 2px 8px rgba(184, 50, 40, 0.25);
}
.btn--danger:hover:not(:disabled) {
  background: #8e2118;
  box-shadow: 0 4px 12px rgba(184, 50, 40, 0.35);
}

.btn--ghost {
  background: transparent;
  color: #7c3f00;
  border: 1.5px solid #c8a070;
}
.btn--ghost:hover:not(:disabled) {
  background: #fdf0e0;
  border-color: #7c3f00;
}

.btn__icon { font-size: 0.95rem; line-height: 1; }
</style>
