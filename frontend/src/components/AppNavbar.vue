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
  height: 64px;
  background: #2c1a0e;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__brand {
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f5d9a8;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.02em;
}
.navbar__brand span { color: #f5d9a8; }

.navbar__links { display: flex; gap: 0.5rem; }

.navbar__link {
  color: #c8a96e;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  transition: background 0.18s, color 0.18s;
}
.navbar__link:hover,
.navbar__link.router-link-active {
  background: rgba(245, 217, 168, 0.15);
  color: #f5d9a8;
}
</style>
