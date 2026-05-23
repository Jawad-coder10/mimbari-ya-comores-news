import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getArticleByIdAdmin, updateArticle } from "@/lib/articles.functions";
import { CATEGORIES } from "@/lib/categories";
import { ArticleForm } from "./admin.new";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/$id/edit")({
  component: EditArticlePage,
});

function EditArticlePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const getFn = useServerFn(getArticleByIdAdmin);
  const updateFn = useServerFn(updateArticle);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "article", id],
    queryFn: () => getFn({ data: { id } }),
  });

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [coverUrl, setCoverUrl] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const a = data?.article;
    if (!a) return;
    setTitle(a.title);
    setSlug(a.slug);
    setExcerpt(a.excerpt ?? "");
    setContent(a.content);
    setCategory(a.category);
    setCoverUrl(a.cover_image_url ?? "");
    setPublished(a.published);
  }, [data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateFn({
        data: {
          id,
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim() || null,
          content,
          category,
          cover_image_url: coverUrl.trim() || null,
          published,
        },
      });
      toast.success("Article mis à jour");
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message ?? "Erreur");
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ArticleForm
      title={title} setTitle={setTitle}
      slug={slug} setSlug={setSlug}
      excerpt={excerpt} setExcerpt={setExcerpt}
      content={content} setContent={setContent}
      category={category} setCategory={setCategory}
      coverUrl={coverUrl} setCoverUrl={setCoverUrl}
      published={published} setPublished={setPublished}
      loading={loading}
      onSubmit={handleSubmit}
      heading="Modifier l'article"
    />
  );
}
