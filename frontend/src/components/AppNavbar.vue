<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__brand">
      📚 <span>La Gran Librería</span>
    </router-link>
    <div class="navbar__links">
      <router-link to="/"         class="navbar__link">Catálogo</router-link>
      <router-link to="/admin"    class="navbar__link">Gestión</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 68px;
  background: #2c1a0e;
  border-bottom: 1px solid rgba(245, 217, 168, 0.12);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__brand {
  font-family: "Playfair Display", serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #f5d9a8;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.02em;
  transition: opacity 0.18s;
}
.navbar__brand:hover { opacity: 0.85; }
.navbar__brand span { color: #f5d9a8; }

.navbar__links { display: flex; gap: 0.25rem; }

.navbar__link {
  position: relative;
  color: #c8a96e;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  transition: background 0.18s, color 0.18s;
}
.navbar__link:hover {
  background: rgba(245, 217, 168, 0.1);
  color: #f5d9a8;
}
.navbar__link.router-link-active {
  color: #f5d9a8;
  background: rgba(245, 217, 168, 0.12);
}
.navbar__link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background: #f5d9a8;
  border-radius: 2px;
}
</style>
