-- Add TOTP secret column to users table
ALTER TABLE users ADD COLUMN totp_secret TEXT;