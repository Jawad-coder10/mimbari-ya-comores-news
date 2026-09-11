import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listPublishedArticles } from "@/lib/articles.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { CATEGORIES } from "@/lib/categories";
import heroImage from "@/assets/hero-comores.jpg";

const articlesQueryOptions = queryOptions({
  queryKey: ["articles", "home"],
  queryFn: () => listPublishedArticles({ data: { limit: 30 } }),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mimbari Ya Comores — Le média des Comores" },
      { property: "og:title", content: "Mimbari Ya Comores — Le média des Comores" },
      {
        property: "og:description",
        content: "L'actualité indépendante des Comores : politique, société, économie, culture, sport.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(articlesQueryOptions),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(articlesQueryOptions);
  const articles = data.articles;
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30" />
        </div>
        <div className="container-prose py-20 md:py-28 text-primary-foreground">
          <div className="text-xs uppercase tracking-[0.3em] mb-4 text-primary-foreground/80">
            Édition du {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            L'information<br />au cœur de l'archipel
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 leading-relaxed">
            Politique, société, culture, sport — chaque jour, Mimbari Ya Comores éclaire
            l'actualité des Comores avec rigueur et indépendance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$category"
                params={{ category: c.slug }}
                className="text-xs uppercase tracking-wider border border-primary-foreground/30 px-3 py-1.5 hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="container-prose py-12 md:py-16 flex-1">
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <section className="mb-16">
                <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-primary" />
                  À la une
                </div>
                <ArticleCard article={featured} large />
              </section>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <section>
                <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-primary" />
                  Tous les articles
                </div>
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 border border-dashed border-border">
      <h2 className="font-serif text-3xl text-primary">Bientôt en ligne</h2>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        Les premiers articles de Mimbari Ya Comores arrivent très prochainement.
        Revenez bientôt pour découvrir notre couverture de l'actualité.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-flex items-center rounded-sm border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        Espace rédaction
      </Link>
    </div>
  );
}
