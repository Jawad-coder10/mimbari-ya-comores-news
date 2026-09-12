import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAllArticlesAdmin, deleteArticle } from "@/lib/articles.functions";
import { getCategoryLabel } from "@/lib/categories";
import { Eye, Pencil, Trash2, Loader2, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const listFn = useServerFn(listAllArticlesAdmin);
  const delFn = useServerFn(deleteArticle);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "articles"],
    queryFn: () => listFn(),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Article supprimé");
      qc.invalidateQueries({ queryKey: ["admin", "articles"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Erreur"),
  });

  const articles = data?.articles ?? [];
  const published = articles.filter((a: any) => a.published);
  const totalViews = articles.reduce((sum: number, a: any) => sum + (a.view_count ?? 0), 0);

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Tableau de bord</div>
          <h1 className="mt-1 font-serif text-4xl text-foreground">Articles</h1>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <Stat label="Articles publiés" value={published.length} />
        <Stat label="Brouillons" value={articles.length - published.length} />
        <Stat label="Vues totales" value={totalViews} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border bg-card">
          <p className="font-serif text-2xl text-primary">Aucun article pour le moment</p>
          <Link
            to="/admin/new"
            className="mt-4 inline-flex items-center bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          >
            Écrire le premier article
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[20px] border border-border bg-card divide-y divide-border">
          {articles.map((a: any) => (
            <div key={a.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-secondary/40">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold">
                  {a.published ? (
                    <span className="text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Publié
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Brouillon
                    </span>
                  )}
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{getCategoryLabel(a.category)}</span>
                </div>
                <h3 className="mt-1 font-serif text-xl text-foreground truncate">{a.title}</h3>
                {a.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{a.excerpt}</p>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {a.view_count}
                </span>
                <Link
                  to="/admin/$id/edit"
                  params={{ id: a.id }}
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <Pencil className="h-4 w-4" /> <span className="hidden sm:inline">Modifier</span>
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Supprimer "${a.title}" ?`)) del.mutate(a.id);
                  }}
                  className="inline-flex items-center gap-1 text-destructive hover:underline"
                  disabled={del.isPending}
                >
                  <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">Supprimer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[20px] border border-border bg-card p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className="mt-1 font-serif text-4xl text-primary">{value.toLocaleString("fr-FR")}</div>
    </div>
  );
}
