/*
  # Create Scans Table for PlantCare AI

  1. New Tables
    - `scans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `image_url` (text)
      - `plant_type` (text)
      - `disease_name` (text)
      - `scientific_name` (text, nullable)
      - `confidence` (numeric)
      - `severity` (text)
      - `is_healthy` (boolean)
      - `description` (text, nullable)
      - `recommendations` (jsonb, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `scans` table
    - Add policy for users to read their own scans
    - Add policy for users to create scans
    - Add policy for users to update their own scans
    - Add policy for users to delete their own scans
*/

CREATE TABLE IF NOT EXISTS scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  plant_type text,
  disease_name text NOT NULL,
  scientific_name text,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  severity text NOT NULL CHECK (severity IN ('none', 'low', 'medium', 'high')),
  is_healthy boolean DEFAULT false,
  description text,
  recommendations jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own scans
CREATE POLICY "Users can view own scans"
  ON scans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can create scans
CREATE POLICY "Users can create scans"
  ON scans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own scans
CREATE POLICY "Users can update own scans"
  ON scans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own scans
CREATE POLICY "Users can delete own scans"
  ON scans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS scans_user_id_idx ON scans(user_id);
CREATE INDEX IF NOT EXISTS scans_created_at_idx ON scans(created_at DESC);
