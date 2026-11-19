DROP POLICY IF EXISTS "Visitors can submit applications" ON public.partnership_applications;
CREATE POLICY "Visitors can submit applications" ON public.partnership_applications
FOR INSERT TO anon
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 200
  AND website ~* '^https?://' AND char_length(website) <= 200
  AND char_length(btrim(goal)) BETWEEN 1 AND 1000
  AND email IS NOT NULL AND char_length(email) <= 255 AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (country_code IS NULL OR country_code ~ '^\+[0-9]{1,4}$')
  AND (phone IS NULL OR phone ~ '^[0-9 ]{6,20}$')
  AND (role IS NULL OR role IN ('founder','marketing-lead','agency','freelancer','other'))
);