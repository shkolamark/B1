MainTable
=========

MainTable — серверная, универсальная компонент-таблица, принятая в проекте для отображения CRUD-данных.

Usage
-----
- Import `MainTable` and `MainTableSkeleton`.
- Define a `columns` array with `id`, `header`, `accessor` (string or function) and optional `render` for custom cell rendering.
- Use as server component; optionally pass `fetchUrl` that points to your new API.

Example
-------
```
const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'owner', header: 'Owner', accessor: r => r.owner.name },
  { id: 'avatar', header: 'Avatar', accessor: 'avatar', render: (v) => <img src={v} /> }
]

<MainTable columns={columns} fetchUrl={'/api/tables/customers'} />
```

API
---
We added generic CRUD API handlers in `src/app/api/tables/*` for each entity. These are implemented with Prisma as recommended:

- `GET /api/tables/<entity>` — list
- `POST /api/tables/<entity>` — create
- `GET /api/tables/<entity>/:id` — get
- `PUT /api/tables/<entity>/:id` — update
- `DELETE /api/tables/<entity>/:id` — delete

Best practices followed
---------------------
- App Router / server components for data fetching.
- Prisma client for database access.
- Generic and typed table component using `columns` and `render` callbacks.
