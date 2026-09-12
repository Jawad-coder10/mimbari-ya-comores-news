import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listPublishedArticles } from "@/lib/articles.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { CATEGORIES, getCategoryLabel } from "@/lib/categories";

const categoryQuery = (category: string) =>
  queryOptions({
    queryKey: ["articles", "category", category],
    queryFn: () => listPublishedArticles({ data: { category, limit: 60 } }),
  });

export const Route = createFileRoute("/category/$category")({
  beforeLoad: ({ params }) => {
    if (!CATEGORIES.find((c) => c.slug === params.category)) {
      throw notFound();
    }
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(categoryQuery(params.category)),
  head: ({ params }) => {
    const label = getCategoryLabel(params.category);
    return {
      meta: [
        { title: `${label} Mimbari Ya Comores` },
        { name: "description", content: `Toute l'actualité ${label} aux Comores par Mimbari Ya Comores.` },
        { property: "og:title", content: `${label} Mimbari Ya Comores` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.category}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { data } = useSuspenseQuery(categoryQuery(category));
  const label = getCategoryLabel(category);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-prose py-12 md:py-16 flex-1">
        <div className="mb-12 border-b border-border pb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Rubrique</div>
          <h1 className="mt-2 font-serif text-5xl md:text-6xl text-foreground">{label}</h1>
        </div>

        {data.articles.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border">
            <p className="font-serif text-2xl text-primary">Aucun article pour le moment</p>
            <p className="mt-2 text-muted-foreground">Revenez bientôt la rédaction prépare la suite.</p>
            <Link to="/" className="mt-6 inline-block text-primary underline underline-offset-4">
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
