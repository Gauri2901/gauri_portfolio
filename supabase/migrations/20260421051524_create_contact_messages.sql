/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `contact_messages` table
    - Allow anyone (anonymous) to INSERT new messages (public contact form)
    - No SELECT policy for general public — only authenticated users can read
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (
    length(name) > 0 AND
    length(email) > 0 AND
    length(message) > 0
  );

CREATE POLICY "Authenticated users can read messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);
