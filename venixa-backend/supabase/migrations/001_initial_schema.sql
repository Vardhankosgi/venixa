-- ============================================================
-- VENIXA DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('devotee', 'pandit', 'admin', 'super_admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE pooja_status AS ENUM ('scheduled', 'live', 'completed', 'cancelled');
CREATE TYPE consultation_type AS ENUM ('horoscope', 'kundali', 'vastu', 'general');

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'devotee',
  avatar_url TEXT,
  city TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  two_fa_enabled BOOLEAN DEFAULT FALSE,
  two_fa_secret TEXT,
  otp_code TEXT,
  otp_expires_at TIMESTAMPTZ,
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PANDIT PROFILES
-- ============================================================
CREATE TABLE pandit_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  speciality TEXT,
  experience_years INTEGER DEFAULT 0,
  price_per_pooja NUMERIC(10,2) DEFAULT 0,
  languages TEXT[] DEFAULT '{}',
  bio TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DEVOTEE PROFILES
-- ============================================================
CREATE TABLE devotee_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  gotra TEXT,
  preferred_language TEXT DEFAULT 'hindi',
  religious_tradition TEXT DEFAULT 'hindu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOKINGS
-- ============================================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  devotee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  pandit_id UUID REFERENCES pandit_profiles(id) ON DELETE SET NULL,
  pooja_type TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  address TEXT,
  notes TEXT,
  amount NUMERIC(10,2),
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  pandit_id UUID REFERENCES pandit_profiles(id) ON DELETE CASCADE,
  devotee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LIVE POOJAS
-- ============================================================
CREATE TABLE live_poojas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pandit_id UUID REFERENCES pandit_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  price NUMERIC(10,2) DEFAULT 0,
  max_participants INTEGER DEFAULT 100,
  participant_count INTEGER DEFAULT 0,
  stream_url TEXT,
  status pooja_status DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE live_pooja_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pooja_id UUID REFERENCES live_poojas(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(pooja_id, user_id)
);

-- ============================================================
-- PRODUCTS & SHOP
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL, -- samagri | shop | custom_kit
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10,2) NOT NULL,
  shipping_address JSONB,
  status order_status DEFAULT 'pending',
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================================
-- TEMPLES
-- ============================================================
CREATE TABLE temples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  address TEXT,
  image_url TEXT,
  description TEXT,
  prasad_price NUMERIC(10,2) DEFAULT 0,
  live_darshan_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE temple_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  pooja_type TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  devotee_name TEXT,
  gotra TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prasad_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shipping_address JSONB,
  quantity INTEGER DEFAULT 1,
  amount NUMERIC(10,2),
  status order_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ASTROLOGY
-- ============================================================
CREATE TABLE horoscopes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sign TEXT NOT NULL,
  period TEXT NOT NULL, -- daily | weekly | monthly
  content TEXT NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE astrology_consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  astrologer_id UUID REFERENCES pandit_profiles(id) ON DELETE SET NULL,
  consultation_type consultation_type NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  birth_date DATE,
  birth_time TIME,
  birth_place TEXT,
  status booking_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE kundali_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_place TEXT,
  partner_name TEXT,
  partner_birth_date DATE,
  partner_birth_time TIME,
  partner_birth_place TEXT,
  report_data JSONB,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PANCHANG
-- ============================================================
CREATE TABLE panchang (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,
  tithi TEXT,
  nakshatra TEXT,
  yoga TEXT,
  karana TEXT,
  sunrise TIME,
  sunset TIME,
  rahu_kaal TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  type TEXT
);

CREATE TABLE muhurats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  type TEXT NOT NULL, -- wedding | griha_pravesh | business | travel
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  description TEXT
);

CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  reminder_time TIME,
  type TEXT,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VEDAPATASHALA (COURSES)
-- ============================================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES pandit_profiles(id) ON DELETE SET NULL,
  category TEXT,
  duration_hours INTEGER,
  price NUMERIC(10,2) DEFAULT 0,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info | booking | order | reminder
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_bookings_devotee ON bookings(devotee_id);
CREATE INDEX idx_bookings_pandit ON bookings(pandit_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_live_poojas_status ON live_poojas(status, scheduled_at);
CREATE INDEX idx_panchang_date ON panchang(date);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_pooja_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE temple_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE prasad_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE astrology_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE kundali_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandit_profiles ENABLE ROW LEVEL SECURITY;

-- Users: can only read/update own row; service role bypasses RLS
CREATE POLICY "users_own" ON users FOR ALL USING (auth.uid() = id);

-- Bookings: devotee sees own, pandit sees assigned
CREATE POLICY "bookings_devotee" ON bookings FOR ALL USING (auth.uid() = devotee_id);

-- Orders: own only
CREATE POLICY "orders_own" ON orders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "cart_own" ON cart_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "wishlist_own" ON wishlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "notifications_own" ON notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "reminders_own" ON reminders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "enrollments_own" ON enrollments FOR ALL USING (auth.uid() = user_id);

-- Public read for pandits, temples, products, courses, panchang
CREATE POLICY "pandits_public_read" ON pandit_profiles FOR SELECT USING (true);
CREATE POLICY "devotee_profiles_own" ON devotee_profiles FOR ALL USING (auth.uid() = user_id);
