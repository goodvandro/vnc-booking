# Admin Separation & Docker Configuration — Walkthrough

## What was done

The admin panel was separated from `vnc-booking-fe` into a new standalone project `vnc-booking-fe-admin`, with JWT authentication replacing Clerk, and a unified Docker configuration at the project root.

### New Project: `vnc-booking-fe-admin`

**Authentication (JWT via Strapi):**
- Login via `POST /api/auth/local` (Strapi) → issues JWT in HttpOnly cookie
- Middleware protects all routes except `/login` and `/api/auth/*`
- [AuthProvider](file:///Users/goodvandro/Workspace/dev/vnc-booking/vnc-booking-fe-admin/components/auth/auth-provider.tsx#24-52) context provides `user`, `isLoading`, and [logout](file:///Users/goodvandro/Workspace/dev/vnc-booking/vnc-booking-fe-admin/components/auth/auth-provider.tsx#21-22)
- Premium login page with glassmorphism design

**Migrated Pages (all /admin/ routes → root routes):**

| Original Route | New Route |
|---|---|
| `/admin` | `/` |
| `/admin/cars` | `/cars` |
| `/admin/cars/create` | `/cars/create` |
| `/admin/cars/[id]/edit` | `/cars/[id]/edit` |
| `/admin/guest-houses` | `/guest-houses` |
| `/admin/guest-houses/create` | `/guest-houses/create` |
| `/admin/guest-houses/[id]/edit` | `/guest-houses/[id]/edit` |
| `/admin/guest-house-bookings` | `/guest-house-bookings` |
| `/admin/guest-house-bookings/[id]` | `/guest-house-bookings/[id]` |
| `/admin/car-rental-bookings` | `/car-rental-bookings` |
| `/admin/car-rental-bookings/[id]` | `/car-rental-bookings/[id]` |

**API Routes (moved from `/api/admin/*` to `/api/*`):**
- `/api/cars`, `/api/cars/[id]` — CRUD 
- `/api/guest-houses`, `/api/guest-houses/[id]` — CRUD
- `/api/bookings/[type]/[id]/status` — status updates
- `/api/strapi-health`, `/api/upload`, `/api/upload-url` — shared
- `/api/auth/login`, `/api/auth/me`, `/api/auth/logout` — JWT auth

### Docker Configuration

| File | Description |
|---|---|
| [docker-compose.yml](file:///Users/goodvandro/Workspace/dev/vnc-booking/docker-compose.yml) | Root compose — both services |
| [vnc-booking-fe/Dockerfile](file:///Users/goodvandro/Workspace/dev/vnc-booking/vnc-booking-fe/Dockerfile) | Frontend — updated to Node 20 |
| [vnc-booking-fe-admin/Dockerfile](file:///Users/goodvandro/Workspace/dev/vnc-booking/vnc-booking-fe-admin/Dockerfile) | Admin — Node 20, port 3001 |
| [.env.example](file:///Users/goodvandro/Workspace/dev/vnc-booking/.env.example) | All env vars documented |

### Cleanup of `vnc-booking-fe`
- Removed `app/admin/`, `app/api/admin/`, `components/admin/`
- Updated middleware: `/admin(.*)` → `/profile(.*)`

## Verification

**Build output (`pnpm build`):**
```
✓ Generating static pages (15/15)
Route (app)                                 Size  First Load JS
┌ ○ /                                      179 B         104 kB
├ ƒ /api/auth/login                        162 B         101 kB
├ ƒ /car-rental-bookings                 2.65 kB         140 kB
├ ƒ /cars                                  179 B         104 kB
├ ƒ /guest-house-bookings               2.65 kB         140 kB
├ ƒ /guest-houses                          179 B         104 kB
└ ○ /login                               3.84 kB         112 kB
ƒ Middleware                             38.2 kB
Exit code: 0
```

## How to run

```bash
# Development (admin)
cd vnc-booking-fe-admin
pnpm dev    # http://localhost:3001

# Docker (both services)
cd /path/to/vnc-booking
cp .env.example .env   # edit with real values
docker compose up --build
```
