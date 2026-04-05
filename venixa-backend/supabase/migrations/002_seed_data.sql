-- ============================================================
-- SEED DATA — DEMO CREDENTIALS
-- Run AFTER 001_initial_schema.sql
-- Passwords are bcrypt hashed: "Demo@1234"
-- ============================================================

-- Demo Users (password: Demo@1234)
INSERT INTO users (id, full_name, email, password_hash, role, phone, city, is_active, two_fa_enabled) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Rahul Sharma',    'devotee@venixa.com',    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMUdfufGe.XFP0lMJpFJqJqJqJ', 'devotee',    '+91 98765 43210', 'Mumbai',    TRUE, FALSE),
  ('22222222-0000-0000-0000-000000000002', 'Pandit Ramesh',   'pandit@venixa.com',     '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMUdfufGe.XFP0lMJpFJqJqJqJ', 'pandit',     '+91 98765 43211', 'Varanasi',  TRUE, FALSE),
  ('33333333-0000-0000-0000-000000000003', 'Admin User',      'admin@venixa.com',      '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMUdfufGe.XFP0lMJpFJqJqJqJ', 'admin',      '+91 98765 43212', 'Delhi',     TRUE, FALSE),
  ('44444444-0000-0000-0000-000000000004', 'Super Admin',     'superadmin@venixa.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMUdfufGe.XFP0lMJpFJqJqJqJ', 'super_admin','+91 98765 43213', 'Bangalore', TRUE, FALSE);

-- Pandit Profile
INSERT INTO pandit_profiles (user_id, speciality, experience_years, price_per_pooja, languages, bio, is_available, is_verified, rating, total_reviews) VALUES
  ('22222222-0000-0000-0000-000000000002', 'Vedic Rituals & Homam', 15, 2500.00, ARRAY['Hindi','Sanskrit','English'], 'Experienced Vedic pandit specializing in all types of poojas and homas.', TRUE, TRUE, 4.9, 234);

-- Devotee Profile
INSERT INTO devotee_profiles (user_id, gotra, preferred_language, religious_tradition) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Kashyap', 'hindi', 'hindu');

-- Sample Products
INSERT INTO products (name, description, price, category, stock, is_active) VALUES
  ('Ganesh Pooja Samagri Kit',  'Complete kit for Ganesh Chaturthi',  499.00,  'samagri',    50, TRUE),
  ('Navratri Pooja Kit',        'All items for 9-day Navratri pooja', 799.00,  'samagri',    30, TRUE),
  ('Brass Diya Set (6 pcs)',    'Handcrafted brass diyas',            349.00,  'shop',       100, TRUE),
  ('Bhagavad Gita (Hindi)',     'Hardcover with commentary',          299.00,  'shop',       200, TRUE),
  ('Rudraksha Mala 108 beads',  'Certified 5-mukhi rudraksha',        1299.00, 'shop',       25, TRUE),
  ('Custom Satyanarayan Kit',   'Personalized samagri kit',           599.00,  'custom_kit', 20, TRUE);

-- Sample Temples
INSERT INTO temples (name, city, state, description, prasad_price) VALUES
  ('Siddhivinayak Temple',  'Mumbai',    'Maharashtra', 'Famous Ganesh temple in Prabhadevi', 51.00),
  ('Kashi Vishwanath',      'Varanasi',  'UP',          'One of the 12 Jyotirlingas',         101.00),
  ('Tirupati Balaji',       'Tirupati',  'Andhra Pradesh', 'Sri Venkateswara Swamy Temple',   151.00),
  ('Golden Temple',         'Amritsar',  'Punjab',      'Harmandir Sahib',                    0.00);

-- Sample Courses
INSERT INTO courses (title, description, category, duration_hours, price, is_published) VALUES
  ('Introduction to Vedic Chanting',  'Learn basic Vedic mantras and their meanings', 'vedic',    10, 999.00,  TRUE),
  ('Sandhyavandanam Practice',        'Daily ritual practice for beginners',           'ritual',   8,  799.00,  TRUE),
  ('Bhagavad Gita Study Course',      'Chapter-by-chapter study with commentary',      'scripture',20, 1499.00, TRUE),
  ('Yoga & Meditation Fundamentals',  'Spiritual wellness through yoga',               'wellness', 15, 1199.00, TRUE);

-- Sample Panchang (today)
INSERT INTO panchang (date, tithi, nakshatra, yoga, karana, sunrise, sunset, rahu_kaal) VALUES
  (CURRENT_DATE, 'Panchami', 'Rohini', 'Siddhi', 'Bava', '06:15', '18:45', '07:30-09:00');

-- Sample Festivals
INSERT INTO festivals (name, date, description, type) VALUES
  ('Ram Navami',        '2025-04-06', 'Birthday of Lord Rama',              'major'),
  ('Hanuman Jayanti',   '2025-04-12', 'Birthday of Lord Hanuman',           'major'),
  ('Akshaya Tritiya',   '2025-04-30', 'Auspicious day for new beginnings',  'auspicious'),
  ('Buddha Purnima',    '2025-05-12', 'Birthday of Gautama Buddha',         'major'),
  ('Ganesh Chaturthi',  '2025-08-27', 'Birthday of Lord Ganesha',           'major'),
  ('Navratri',          '2025-10-02', '9 nights of Goddess Durga worship',  'major'),
  ('Diwali',            '2025-10-20', 'Festival of Lights',                 'major');

-- Sample Live Pooja
INSERT INTO live_poojas (pandit_id, title, description, scheduled_at, duration_minutes, price, max_participants, status)
SELECT pp.id, 'Ganesh Chaturthi Live Pooja', 'Join us for a live Ganesh Chaturthi celebration', NOW() + INTERVAL '7 days', 90, 99.00, 500, 'scheduled'
FROM pandit_profiles pp WHERE pp.user_id = '22222222-0000-0000-0000-000000000002';
