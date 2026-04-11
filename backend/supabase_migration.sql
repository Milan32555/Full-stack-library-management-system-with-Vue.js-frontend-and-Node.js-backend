-- ============================================================
--  Bookstore – Supabase migration
--  Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

create table if not exists books (
  id         uuid primary key default gen_random_uuid(),
  title      text    not null,
  author     text    not null,
  isbn       text    not null unique,
  price      numeric(10, 2) not null check (price >= 0),
  stock      integer not null check (stock >= 0),
  genre      text,
  cover_url  text,
  created_at timestamptz default now()
);

-- Índices útiles
create index if not exists books_author_idx on books (author);
create index if not exists books_genre_idx  on books (genre);

-- RLS: habilitar pero permitir todo desde el service-role
alter table books enable row level security;

-- Política permisiva para service_role (backend)
create policy "service_role full access"
  on books
  for all
  using (true)
  with check (true);

-- ============================================================
--  Datos de ejemplo
-- ============================================================
insert into books (title, author, isbn, price, stock, genre, cover_url) values
  ('Cien años de soledad',      'Gabriel García Márquez', '978-0307474728', 28000, 12, 'Realismo Mágico',  'https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg'),
  ('El amor en los tiempos del cólera', 'Gabriel García Márquez', '978-0307389732', 26000, 8,  'Novela',           'https://covers.openlibrary.org/b/isbn/9780307389732-L.jpg'),
  ('Rayuela',                   'Julio Cortázar',         '978-8437604572', 24000, 5,  'Novela',           'https://covers.openlibrary.org/b/isbn/9788437604572-L.jpg'),
  ('Don Quijote de la Mancha',  'Miguel de Cervantes',    '978-8491050421', 32000, 20, 'Clásico',          'https://covers.openlibrary.org/b/isbn/9788491050421-L.jpg'),
  ('1984',                      'George Orwell',          '978-8499890944', 22000, 15, 'Distopía',         'https://covers.openlibrary.org/b/isbn/9788499890944-L.jpg'),
  ('El Principito',             'Antoine de Saint-Exupéry','978-0156012195', 18000, 30, 'Literatura Infantil','https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg')
on conflict (isbn) do nothing;
