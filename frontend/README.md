# 📚 Bookstore – Frontend

SPA en **Vue 3 + Vite** con Clean Architecture. Tema de librería con paleta cálida.

## Estructura

```
src/
├── assets/              # global.css
├── components/          # AppButton, AppInput, AppSelect, AppNavbar, BookCard, BookModal
├── views/               # CatalogView (público) · AdminView (gestión CRUD)
├── router/              # Vue Router
├── domain/
│   ├── entities/        # Book.js
│   └── repositories/    # BookRepository.js (interfaz)
├── application/
│   └── usecases/        # CreateBook, GetAllBooks, GetBookByIsbn, UpdateBook, DeleteBook
└── infrastructure/
    ├── config/          # container.js (DI)
    ├── repositories/    # ApiBookRepository.js
    └── composables/     # useBooks.js
```

## Páginas

| Ruta      | Vista        | Descripción                                  |
|-----------|--------------|----------------------------------------------|
| `/`       | CatalogView  | Catálogo público con búsqueda y filtro        |
| `/admin`  | AdminView    | Tabla de gestión CRUD + estadísticas          |

## Setup

### 1. Variables de entorno

Copia `.env.example` a `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

En producción apunta al dominio real del backend.

### 2. Instalar y correr

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # compilar para producción → carpeta dist/
npm run preview   # previsualizar build
```

## Despliegue en Netlify / Vercel

1. Sube el código a GitHub.
2. Conecta el repositorio en Netlify o Vercel.
3. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Añade la variable de entorno `VITE_API_URL` en el dashboard.
5. Para Vue Router con `createWebHistory`, añade las reglas de redirección:

### Netlify – `public/_redirects`
```
/*  /index.html  200
```

### Vercel – `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
