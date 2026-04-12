import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NewsContent {
  id: string;
  raw_id: string | null;
  type: "article" | "bite" | "linkedin" | "instagram" | "newsletter";
  title_pt: string;
  title_en: string;
  body_pt: string;
  body_en: string;
  summary_pt: string;
  seo_slug: string;
  seo_description: string;
  image_url: string | null;
  tags: string[];
  importance: "major" | "minor";
  status: "draft" | "approved" | "published" | "rejected";
  approved_by: string | null;
  published_at: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  confirmed: boolean;
  confirm_token: string;
  active: boolean;
  subscribed_at: string;
}
