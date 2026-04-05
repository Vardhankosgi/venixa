# Venixa Backend API

Production-ready Node.js + Express + Supabase + PostgreSQL backend for the Venixa Spiritual Platform.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase + JWT (access + refresh tokens)
- **2FA**: TOTP-based OTP via email (otplib)
- **Security**: Helmet, CORS, Rate Limiting, bcrypt

---

## Quick Start

### 1. Install dependencies
```bash
cd venixa-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your Supabase URL, keys, and SMTP credentials
```

### 3. Run database migrations
Go to your **Supabase project → SQL Editor** and run these files in order:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_data.sql`

### 4. Start the server
```bash
npm run dev      # development (nodemon)
npm start        # production
```

Server runs at: `http://localhost:5000`

---

## Demo Credentials

> Password for all accounts: **`Demo@1234`**

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Devotee** | `devotee@venixa.com` | `Demo@1234` | Book pandits, shop, live pooja, astrology |
| **Pandit** | `pandit@venixa.com` | `Demo@1234` | Manage profile, view bookings, schedule live poojas |
| **Admin** | `admin@venixa.com` | `Demo@1234` | User management, verify pandits, view stats |
| **Super Admin** | `superadmin@venixa.com` | `Demo@1234` | Full platform access |

> **Note**: The seed file contains pre-hashed passwords. If bcrypt hash doesn't match, register fresh accounts via `POST /api/auth/register` and manually set roles in Supabase dashboard.

---

## API Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login (returns tempToken if 2FA enabled) |
| POST | `/api/auth/verify-2fa` | — | Verify OTP, get JWT |
| POST | `/api/auth/resend-otp` | — | Resend OTP |
| POST | `/api/auth/forgot-password` | — | Send reset email |
| POST | `/api/auth/reset-password` | — | Reset with token |
| POST | `/api/auth/refresh` | — | Refresh access token |
| GET | `/api/auth/me` | JWT | Get current user |
| POST | `/api/auth/logout` | JWT | Logout |

### Pandits
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/pandits` | — | List pandits (filter: location, speciality, available) |
| GET | `/api/pandits/:id` | — | Get pandit details |
| GET | `/api/pandits/profile` | pandit | Own profile |
| PUT | `/api/pandits/profile` | pandit | Update own profile |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | devotee | Create booking |
| GET | `/api/bookings` | JWT | List bookings (role-filtered) |
| PATCH | `/api/bookings/:id/status` | pandit/admin | Update status |
| POST | `/api/bookings/:id/review` | devotee | Add review |

### Live Pooja
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/live-pooja` | — | Browse live poojas |
| POST | `/api/live-pooja` | pandit | Schedule pooja |
| POST | `/api/live-pooja/:id/join` | JWT | Join pooja |
| GET | `/api/live-pooja/my-sessions` | JWT | My sessions |

### Shop
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/shop/products` | — | Browse products |
| GET/POST | `/api/shop/cart` | JWT | Cart management |
| DELETE | `/api/shop/cart/:id` | JWT | Remove from cart |
| POST | `/api/shop/orders` | JWT | Place order |
| GET | `/api/shop/orders` | JWT | Order history |
| POST | `/api/shop/wishlist` | JWT | Toggle wishlist |

### Temples
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/temples` | — | Find temples |
| POST | `/api/temples/:id/book-pooja` | JWT | Book temple pooja |
| POST | `/api/temples/:id/prasad` | JWT | Order prasad |

### Astrology
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/astrology/horoscope` | — | Get horoscope (?sign=aries&period=daily) |
| POST | `/api/astrology/consult` | JWT | Book consultation |
| POST | `/api/astrology/kundali` | JWT | Generate kundali |

### Panchang
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/panchang/daily` | — | Daily panchang (?date=YYYY-MM-DD) |
| GET | `/api/panchang/festivals` | — | Festival calendar |
| GET | `/api/panchang/muhurat` | — | Muhurat finder |
| GET/POST | `/api/panchang/reminders` | JWT | Reminders |

### Vedapatashala
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/vedapatashala/courses` | — | Browse courses |
| POST | `/api/vedapatashala/courses/:id/enroll` | JWT | Enroll |
| GET | `/api/vedapatashala/my-learning` | JWT | My enrollments |

### Notifications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notifications` | JWT | Get notifications |
| PATCH | `/api/notifications/:id/read` | JWT | Mark read |
| PATCH | `/api/notifications/read-all` | JWT | Mark all read |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/stats` | admin | Dashboard stats |
| GET | `/api/admin/users` | admin | All users |
| PATCH | `/api/admin/users/:id/toggle-active` | admin | Activate/deactivate |
| PATCH | `/api/admin/pandits/:id/verify` | admin | Verify pandit |

---

## Authentication Flow

```
Login → has 2FA?
  YES → returns { requires2FA: true, tempToken }
        → POST /verify-2fa with { tempToken, otp }
        → returns { token, refreshToken }
  NO  → returns { token, refreshToken } directly

All protected routes: Authorization: Bearer <token>
```

## Roles & Permissions
- `devotee` — book pandits, shop, join live poojas, astrology
- `pandit` — manage profile, view assigned bookings, schedule live poojas
- `admin` — user management, verify pandits, view stats
- `super_admin` — all admin permissions + platform config

---

## Project Structure
```
venixa-backend/
├── src/
│   ├── server.js              # Entry point
│   ├── config/
│   │   ├── supabase.js        # Supabase client
│   │   └── mailer.js          # Email (OTP + reset)
│   ├── middleware/
│   │   ├── auth.js            # JWT authenticate + authorize
│   │   ├── validate.js        # Zod request validation
│   │   └── errorHandler.js    # Global error handler
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── panditController.js
│   │   ├── bookingController.js
│   │   ├── livePoojaController.js
│   │   ├── shopController.js
│   │   ├── templeController.js
│   │   ├── astrologyController.js
│   │   ├── panchangController.js
│   │   ├── vedapatashalaController.js
│   │   ├── notificationController.js
│   │   └── adminController.js
│   └── routes/                # Express routers
│       ├── auth.js
│       ├── pandits.js
│       ├── bookings.js
│       ├── livePooja.js
│       ├── shop.js
│       ├── temples.js
│       ├── astrology.js
│       ├── panchang.js
│       ├── vedapatashala.js
│       ├── notifications.js
│       └── admin.js
└── supabase/
    ├── migrations/
    │   ├── 001_initial_schema.sql   # All tables + RLS
    │   └── 002_seed_data.sql        # Demo data + credentials
    └── migrate.js
```
