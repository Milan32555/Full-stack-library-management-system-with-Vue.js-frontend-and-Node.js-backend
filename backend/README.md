# Bookstore - Backend

API REST con **Express** + **Neon (PostgreSQL serverless)**. Arquitectura limpia (Clean Architecture).

## Estructura

```
src/
├── application/
│   └── usecases/        # CreateBook, GetAllBooks, GetBookByIsbn, UpdateBook, DeleteBook
├── domain/
│   ├── entities/        # Book.js
│   └── repositories/    # BookRepository.js (interfaz)
└── infrastructure/
    ├── config/          # container.js (DI)
    ├── controllers/     # BookController.js
    ├── database/        # neon.js (cliente)
    ├── repositories/    # NeonBookRepository.js
    └── routes/          # bookRoutes.js
```

## Setup

### 1. Crear tabla en Neon

En el **SQL Editor** de tu proyecto Neon, ejecuta el archivo `neon_migration.sql`.

### 2. Variables de entorno

Copia `.env.example` a `.env` y rellena:

```
PORT=3000
DATABASE_URL=postgres://user:password@your-neon-host/dbname?sslmode=require
```

Si el proyecto se provisiona vía Vercel Marketplace, `DATABASE_URL` se inyecta automáticamente.

### 3. Instalar y correr

```bash
npm install
npm run dev      # desarrollo (con --watch)
npm start        # producción
```

## Endpoints

| Método | Ruta                  | Descripción             |
|--------|-----------------------|-------------------------|
| GET    | /api/books            | Listar todos los libros |
| GET    | /api/books/:isbn      | Buscar por ISBN         |
| POST   | /api/books            | Crear libro             |
| PUT    | /api/books/:id        | Actualizar libro        |
| DELETE | /api/books/:id        | Eliminar libro          |
| GET    | /health               | Health check            |

## Body de ejemplo (POST /api/books)

```json
{
  "title":     "El nombre del viento",
  "author":    "Patrick Rothfuss",
  "isbn":      "978-8401337208",
  "price":     29000,
  "stock":     10,
  "genre":     "Fantasía",
  "cover_url": "https://covers.openlibrary.org/b/isbn/9788401337208-L.jpg"
}
```

## Despliegue

Se despliega junto al frontend como un servicio de [Vercel Services](https://vercel.com/docs/services), ver `vercel.json` en la raíz del repo.
