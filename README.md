# Libreria Arquitectura

Sistema de gestión de librería con arquitectura limpia (Clean Architecture), desarrollado como proyecto universitario. Permite administrar un catálogo de libros con operaciones CRUD, búsqueda, filtrado por género y un panel de administración.

## Arquitectura general

```
Libreria-Arquitectura/
├── backend/          # API REST – Node.js + Express + Neon (Postgres)
└── frontend/         # SPA – Vue 3 + Vite + Vue Router
```

Ambos proyectos siguen los principios de **Clean Architecture** con las capas:

| Capa | Backend | Frontend |
|---|---|---|
| **Domain** | `Book` entity + `BookRepository` interface | `Book` entity + `BookRepository` interface |
| **Application** | Use cases (CreateBook, GetAllBooks, …) | Use cases (index.js) |
| **Infrastructure** | Express routes, Neon repository, controller | ApiBookRepository, composables, router, views |

---

## Stack tecnológico

| | Backend | Frontend |
|---|---|---|
| Lenguaje | JavaScript (ESM) | JavaScript (ESM) |
| Framework | Express 5 | Vue 3 (Composition API) |
| Base de datos | Neon (PostgreSQL serverless) | — |
| Build / Dev | Node.js `--watch` | Vite 6 |
| Routing | Express Router | Vue Router 4 |
| IDs | UUID v4 | UUID v4 |

---

## Requisitos previos

- Node.js >= 19 (requerido por el driver de Neon)
- Una cuenta y proyecto en [Neon](https://neon.tech) (gratis, o vía Vercel Marketplace)

---

## Puesta en marcha

### 1. Base de datos

Ejecuta el script de migración en el **SQL Editor** de tu proyecto Neon:

```
backend/neon_migration.sql
```

Esto crea la tabla `books`, índices y datos de ejemplo.

### 2. Backend

```bash
cd backend

# Copia las variables de entorno
cp .env.example .env
# Edita .env con tu connection string de Neon
```

**.env**
```env
PORT=3000
DATABASE_URL=postgres://user:password@your-neon-host/dbname?sslmode=require
ALLOWED_ORIGINS=http://localhost:5173
```

```bash
npm install
npm run dev        # modo desarrollo (hot-reload)
# npm start        # producción
```

El servidor arranca en `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend

cp .env.example .env.local
# Edita .env.local si el backend corre en otro puerto u host
```

**.env.local**
```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm install
npm run dev        # http://localhost:5173
# npm run build    # genera dist/
```

---

## API REST

Base URL: `/api`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/books` | Listar todos los libros |
| `GET` | `/books/:isbn` | Obtener libro por ISBN |
| `POST` | `/books` | Crear libro |
| `PUT` | `/books/:id` | Actualizar libro |
| `DELETE` | `/books/:id` | Eliminar libro |
| `GET` | `/health` | Health check |

**Campos del libro**

| Campo | Tipo | Requerido |
|---|---|---|
| `title` | string | Si |
| `author` | string | Si |
| `isbn` | string (único) | Si |
| `price` | number >= 0 | Si |
| `stock` | integer >= 0 | Si |
| `genre` | string | No |
| `cover_url` | string (URL) | No |

---

## Vistas del frontend

| Ruta | Vista | Descripción |
|---|---|---|
| `/` | CatalogView | Catálogo público con búsqueda y filtros por género |
| `/admin` | AdminView | Panel de administración con tabla ordenable y CRUD completo |

---

## Estructura detallada

### Backend (`backend/src/`)

```
src/
├── app.js                              # Express app (CORS, rutas)
├── index.js                            # Entry point (levanta el servidor)
├── domain/
│   ├── entities/Book.js                # Entidad con validaciones
│   └── repositories/BookRepository.js  # Interfaz abstracta
├── application/
│   └── usecases/
│       ├── CreateBook.js
│       ├── GetAllBooks.js
│       ├── GetBookByIsbn.js
│       ├── UpdateBook.js
│       └── DeleteBook.js
└── infrastructure/
    ├── config/container.js             # Inyección de dependencias
    ├── controllers/BookController.js
    ├── database/neon.js                # Cliente Neon
    ├── repositories/NeonBookRepository.js
    └── routes/bookRoutes.js
```

### Frontend (`frontend/src/`)

```
src/
├── App.vue                             # Root component + layout
├── main.js
├── router/index.js
├── domain/
│   ├── entities/Book.js
│   └── repositories/BookRepository.js
├── application/
│   └── usecases/index.js
├── infrastructure/
│   ├── config/container.js             # Inyección de dependencias
│   ├── repositories/ApiBookRepository.js
│   └── composables/useBooks.js         # Estado reactivo + llamadas a la API
├── views/
│   ├── CatalogView.vue
│   └── AdminView.vue
└── components/
    ├── AppNavbar.vue
    ├── AppButton.vue
    ├── AppInput.vue
    ├── AppSelect.vue
    ├── BookCard.vue
    └── BookModal.vue
```

---

## Despliegue

Frontend y backend se despliegan como [Vercel Services](https://vercel.com/docs/services) dentro de un mismo proyecto (ver `vercel.json` en la raíz): un solo dominio, un solo deployment atómico para ambos servicios. El backend queda expuesto en `/api/*` y `/health`; todo lo demás lo sirve el frontend.

La base de datos es un proyecto [Neon](https://neon.tech) independiente, provisionado vía Vercel Marketplace.

**Variables de entorno en producción:**

- Servicio `backend` → `DATABASE_URL` (inyectada automáticamente por la integración de Neon), `ALLOWED_ORIGINS`
- Servicio `frontend` → `VITE_API_URL=/api` (mismo dominio, no necesita URL absoluta)

---

## Scripts disponibles

### Backend

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia con `--watch` (reinicio automático) |
| `npm start` | Inicia en producción |

### Frontend

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualiza el build |
