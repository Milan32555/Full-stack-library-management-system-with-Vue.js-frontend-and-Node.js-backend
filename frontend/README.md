# Bookstore - Frontend

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

## Despliegue

Se despliega junto al backend como un servicio de [Vercel Services](https://vercel.com/docs/services), ver `vercel.json` en la raíz del repo. La variable `VITE_API_URL` se configura como `/api` en producción (mismo dominio que el backend, no hace falta URL absoluta), y el rewrite a `index.html` para `createWebHistory` ya está resuelto a nivel de servicio en ese mismo `vercel.json`.
