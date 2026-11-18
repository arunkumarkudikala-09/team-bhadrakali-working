ALTER TABLE public.partnership_applications
  ADD COLUMN email TEXT CHECK (email IS NULL OR char_length(email) BETWEEN 3 AND 255),
  ADD COLUMN country_code TEXT CHECK (country_code IS NULL OR country_code ~ '^\+[0-9]{1,4}$'),
  ADD COLUMN phone TEXT CHECK (phone IS NULL OR phone ~ '^[0-9 ]{6,20}$'),
  ADD COLUMN role TEXT CHECK (role IS NULL OR role IN ('founder', 'marketing-lead', 'agency', 'freelancer', 'other')),
  ADD COLUMN runs_ads BOOLEAN,
  ADD COLUMN wants_updates BOOLEAN NOT NULL DEFAULT false;