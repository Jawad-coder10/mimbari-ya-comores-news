import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getArticleBySlug, registerArticleView } from "@/lib/articles.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getCategoryLabel } from "@/lib/categories";
import { getOrCreateSessionId } from "@/lib/session";
import { Eye, ChevronLeft } from "lucide-react";

const articleQuery = (slug: string) =>
  queryOptions({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    return data;
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article introuvable — Mimbari Ya Comores" }] };
    return {
      meta: [
        { title: `${a.title} — Mimbari Ya Comores` },
        { name: "description", content: a.excerpt ?? a.title },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt ?? "" },
        { property: "og:type", content: "article" },
        ...(a.cover_image_url ? [{ property: "og:image", content: a.cover_image_url }] : []),
      ],
      links: [{ rel: "canonical", href: `/article/${a.slug}` }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const router = useRouter();
  const trackView = useServerFn(registerArticleView);

  useEffect(() => {
    if (!article) return;
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;
    trackView({ data: { articleId: article.id, sessionId } })
      .then(() => router.invalidate())
      .catch(() => {});
  }, [article?.id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="container-prose py-24 flex-1 text-center">
          <h1 className="font-serif text-4xl text-primary">Article introuvable</h1>
          <p className="mt-3 text-muted-foreground">
            Cet article n'existe pas ou n'est plus disponible.
          </p>
          <Link to="/" className="mt-6 inline-block text-primary underline underline-offset-4">
            Retour à l'accueil
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article>
          {/* Cover */}
          {article.cover_image_url && (
            <div className="w-full aspect-[21/9] bg-muted overflow-hidden">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="container-prose py-12 md:py-16 max-w-3xl">
            <Link
              to="/category/$category"
              params={{ category: article.category }}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary font-semibold hover:underline"
            >
              <ChevronLeft className="h-3 w-3" />
              {getCategoryLabel(article.category)}
            </Link>

            <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-5 text-xl text-muted-foreground leading-relaxed font-serif italic">
                {article.excerpt}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground border-y border-border py-3">
              <span>Mimbari Ya Comores</span>
              {date && <><span className="h-1 w-1 rounded-full bg-border" /><span>{date}</span></>}
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {article.view_count.toLocaleString("fr-FR")} {article.view_count > 1 ? "vues" : "vue"}
              </span>
            </div>

            <div className="article-body mt-10 whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
