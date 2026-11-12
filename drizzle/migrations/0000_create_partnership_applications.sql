CREATE TABLE public.partnership_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  website TEXT NOT NULL CHECK (char_length(website) BETWEEN 1 AND 200),
  fault TEXT NOT NULL CHECK (fault IN ('high-cpa', 'invisible-seo', 'poor-conversion', 'content-pipeline')),
  budget TEXT NOT NULL CHECK (budget IN ('under-50k', '50k-2l', '2l-plus')),
  goal TEXT NOT NULL CHECK (char_length(goal) BETWEEN 1 AND 1000),
  timeline TEXT NOT NULL CHECK (timeline IN ('now', '30-days', 'quarter', 'exploring')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.partnership_applications TO anon;
GRANT ALL ON public.partnership_applications TO service_role;

ALTER TABLE public.partnership_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit applications"
ON public.partnership_applications
FOR INSERT
TO anon
WITH CHECK (true);