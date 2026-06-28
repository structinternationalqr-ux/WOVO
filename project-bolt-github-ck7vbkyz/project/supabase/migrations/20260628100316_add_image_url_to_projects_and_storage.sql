-- Add image_url column to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url text;

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read project images" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload project images" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update project images" ON storage.objects
  FOR UPDATE TO anon, authenticated USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete project images" ON storage.objects
  FOR DELETE TO anon, authenticated USING (bucket_id = 'project-images');