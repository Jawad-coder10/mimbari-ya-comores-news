import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createArticle } from "@/lib/articles.functions";
import { CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/slugify";
import { CoverImageUpload } from "@/components/CoverImageUpload";
import { toast } from "sonner";
import { Loader2, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/admin/new")({
  component: NewArticlePage,
});

function NewArticlePage() {
  const navigate = useNavigate();
  const create = useServerFn(createArticle);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0].slug);
  const [coverUrl, setCoverUrl] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await create({
        data: {
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim() || null,
          content,
          category,
          cover_image_url: coverUrl.trim() || null,
          published,
        },
      });
      toast.success(published ? "Article publié" : "Brouillon enregistré");
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message ?? "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ArticleForm
      title={title} setTitle={setTitle}
      slug={slug} setSlug={(v) => { setSlugTouched(true); setSlug(v); }}
      excerpt={excerpt} setExcerpt={setExcerpt}
      content={content} setContent={setContent}
      category={category} setCategory={setCategory}
      coverUrl={coverUrl} setCoverUrl={setCoverUrl}
      published={published} setPublished={setPublished}
      loading={loading}
      onSubmit={handleSubmit}
      heading="Nouvel article"
    />
  );
}

export function ArticleForm(props: {
  title: string; setTitle: (v: string) => void;
  slug: string; setSlug: (v: string) => void;
  excerpt: string; setExcerpt: (v: string) => void;
  content: string; setContent: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  coverUrl: string; setCoverUrl: (v: string) => void;
  published: boolean; setPublished: (v: boolean) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  heading: string;
}) {
  return (
    <div>
      <Link to="/admin" className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-3 w-3" /> Retour
      </Link>
      <h1 className="mt-2 font-serif text-4xl text-foreground mb-8">{props.heading}</h1>

      <form onSubmit={props.onSubmit} className="grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-5">
          <Field label="Titre">
            <input
              type="text" required maxLength={200}
              value={props.title} onChange={(e) => props.setTitle(e.target.value)}
              className="w-full border border-input bg-card px-3 py-2 font-serif text-2xl focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Slug (URL)" hint="Auto-généré depuis le titre. Modifiable.">
            <input
              type="text" required pattern="[a-z0-9-]+" maxLength={120}
              value={props.slug} onChange={(e) => props.setSlug(e.target.value)}
              className="w-full border border-input bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Chapô / Extrait" hint="Phrase d'accroche affichée en aperçu.">
            <textarea
              maxLength={500} rows={2}
              value={props.excerpt} onChange={(e) => props.setExcerpt(e.target.value)}
              className="w-full border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Contenu de l'article">
            <textarea
              required minLength={10} maxLength={50000} rows={20}
              value={props.content} onChange={(e) => props.setContent(e.target.value)}
              placeholder="Rédigez ici votre article…"
              className="w-full border border-input bg-card px-3 py-3 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
        </div>

        <aside className="space-y-5">
          <div className="border border-border bg-card p-5 space-y-4">
            <Field label="Catégorie">
              <select
                value={props.category} onChange={(e) => props.setCategory(e.target.value)}
                className="w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Image de couverture" hint="Fichier JPEG ou PNG, 5 Mo maximum.">
              <CoverImageUpload value={props.coverUrl} onChange={props.setCoverUrl} />
            </Field>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox" checked={props.published}
                onChange={(e) => props.setPublished(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium">Publier maintenant</span>
            </label>

            <button
              type="submit" disabled={props.loading}
              className="w-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-primary-soft transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {props.loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Enregistrer
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-semibold mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
