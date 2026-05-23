import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ArticleListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  cover_image_url: string | null;
  published_at: string | null;
  view_count: number;
};

export type ArticleDetail = ArticleListItem & {
  content: string;
};

// ---------- Public reads ----------

export const listPublishedArticles = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string; limit?: number } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    let q = supabaseAdmin
      .from("articles")
      .select("id, slug, title, excerpt, category, cover_image_url, published_at, view_count")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(data.limit ?? 50);

    if (data.category) q = q.eq("category", data.category);

    const { data: rows, error } = await q;
    if (error) {
      console.error("listPublishedArticles error", error);
      return { articles: [] as ArticleListItem[] };
    }
    return { articles: (rows ?? []) as ArticleListItem[] };
  });

export const getArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("articles")
      .select("id, slug, title, excerpt, content, category, cover_image_url, published_at, view_count")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("getArticleBySlug error", error);
      return { article: null as ArticleDetail | null };
    }
    return { article: (row as ArticleDetail | null) ?? null };
  });

export const registerArticleView = createServerFn({ method: "POST" })
  .inputValidator((input: { articleId: string; sessionId: string }) =>
    z.object({
      articleId: z.string().uuid(),
      sessionId: z.string().min(8).max(100),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.rpc("register_article_view", {
      _article_id: data.articleId,
      _session_id: data.sessionId,
    });
    if (error) {
      console.error("registerArticleView error", error);
      return { ok: false };
    }
    return { ok: true };
  });

// ---------- Admin operations ----------

const articleInputSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).nullable().optional(),
  content: z.string().min(10).max(50000),
  category: z.string().min(2).max(50),
  cover_image_url: z.string().url().max(500).nullable().optional(),
  published: z.boolean(),
});

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error || !data) {
    throw new Error("Accès refusé : rôle administrateur requis.");
  }
}

export const listAllArticlesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await supabaseAdmin
      .from("articles")
      .select("id, slug, title, excerpt, category, cover_image_url, published, published_at, view_count, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { articles: data ?? [] };
  });

export const createArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => articleInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await supabaseAdmin
      .from("articles")
      .insert({
        ...data,
        author_id: context.userId,
        published_at: data.published ? new Date().toISOString() : null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const updateArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid() }).merge(articleInputSchema).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...rest } = data;

    // Fetch current to know if we need to set published_at
    const { data: current } = await supabaseAdmin
      .from("articles")
      .select("published, published_at")
      .eq("id", id)
      .single();

    const published_at =
      rest.published && !current?.published_at
        ? new Date().toISOString()
        : current?.published_at ?? null;

    const { error } = await supabaseAdmin
      .from("articles")
      .update({ ...rest, published_at })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await supabaseAdmin.from("articles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getArticleByIdAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await supabaseAdmin
      .from("articles")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);
    return { article: row };
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });
