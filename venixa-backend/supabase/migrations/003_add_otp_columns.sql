-- Add OTP columns to users table for self-managed 2FA
-- Run this in Supabase SQL Editor if the users table already exists

ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_code TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_expires_at TIMESTAMPTZ;
