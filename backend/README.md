# 📚 Bookstore – Backend

API REST con **Express** + **Supabase (PostgreSQL)**. Arquitectura limpia (Clean Architecture).

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
    ├── database/        # supabase.js (cliente)
    ├── repositories/    # SupabaseBookRepository.js
    └── routes/          # bookRoutes.js
```

## Setup

### 1. Crear tabla en Supabase

En el **SQL Editor** de tu proyecto Supabase, ejecuta el archivo `supabase_migration.sql`.

### 2. Variables de entorno

Copia `.env.example` a `.env` y rellena:

```
PORT=3000
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Las claves las encuentras en: **Supabase Dashboard → Project Settings → API**.

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

## Despliegue en Railway / Render

1. Sube el código a GitHub.
2. Conecta el repositorio en Railway o Render.
3. Añade las variables de entorno en el dashboard.
4. El comando de inicio es `npm start`.
