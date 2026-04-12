-- News sources configuration
CREATE TABLE IF NOT EXISTS news_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('regulatory', 'market', 'media', 'stats', 'corporate', 'industry', 'literacy')),
  scrape_config JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  last_scraped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Raw scraped articles
CREATE TABLE IF NOT EXISTS news_raw (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID REFERENCES news_sources(id),
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT now(),
  processed BOOLEAN DEFAULT false,
  relevant BOOLEAN
);

-- AI-generated content
CREATE TABLE IF NOT EXISTS news_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  raw_id UUID REFERENCES news_raw(id),
  type TEXT NOT NULL CHECK (type IN ('article', 'bite', 'linkedin', 'instagram', 'newsletter')),
  title_pt TEXT NOT NULL,
  title_en TEXT,
  body_pt TEXT NOT NULL,
  body_en TEXT,
  summary_pt TEXT,
  seo_slug TEXT UNIQUE,
  seo_description TEXT,
  tags TEXT[] DEFAULT '{}',
  importance TEXT CHECK (importance IN ('major', 'minor')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'rejected')),
  approved_by TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN DEFAULT false,
  confirm_token TEXT,
  active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for blog queries
CREATE INDEX IF NOT EXISTS idx_news_content_status ON news_content(status);
CREATE INDEX IF NOT EXISTS idx_news_content_type_status ON news_content(type, status);
CREATE INDEX IF NOT EXISTS idx_news_content_slug ON news_content(seo_slug);
CREATE INDEX IF NOT EXISTS idx_news_content_published ON news_content(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_content_tags ON news_content USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_news_raw_processed ON news_raw(processed);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- RLS policies for public read access to published content
ALTER TABLE news_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published content is publicly readable"
  ON news_content FOR SELECT
  USING (status = 'published' AND type IN ('article', 'bite'));

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert for newsletter signup"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);
