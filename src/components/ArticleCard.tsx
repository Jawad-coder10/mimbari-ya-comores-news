import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { getCategoryLabel } from "@/lib/categories";
import type { ArticleListItem } from "@/lib/articles.functions";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleCard({ article, large = false }: { article: ArticleListItem; large?: boolean }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block"
    >
      <article className="flex flex-col h-full">
        <div className={`relative overflow-hidden bg-muted ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          {article.cover_image_url ? (
            <img
              src={article.cover_image_url}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="font-serif text-5xl text-primary/30">M</span>
            </div>
          )}
        </div>
        <div className="pt-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">
            <span>{getCategoryLabel(article.category)}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-muted-foreground font-medium tracking-wider">
              {formatDate(article.published_at)}
            </span>
          </div>
          <h3 className={`mt-2 font-serif text-foreground group-hover:text-primary transition-colors ${large ? "text-3xl md:text-4xl leading-tight" : "text-xl leading-snug"}`}>
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          )}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span>{article.view_count.toLocaleString("fr-FR")} {article.view_count > 1 ? "vues" : "vue"}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
