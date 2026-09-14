import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { h as Route, C as CATEGORIES, A as ArticleForm, u as updateArticle, j as getArticleByIdAdmin } from "./router-C1F49sWW.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BjuxOege.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-cjkJh59S.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client-BKNuf0gt.mjs";
import "../_libs/zod.mjs";
function EditArticlePage() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const getFn = useServerFn(getArticleByIdAdmin);
  const updateFn = useServerFn(updateArticle);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "article", id],
    queryFn: () => getFn({
      data: {
        id
      }
    })
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [excerpt, setExcerpt] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(CATEGORIES[0].slug);
  const [coverUrl, setCoverUrl] = reactExports.useState("");
  const [published, setPublished] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  async function handleSubmit(e) {
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
          published
        }
      });
      toast.success("Article mis à jour");
      navigate({
        to: "/admin"
      });
    } catch (err) {
      toast.error(err.message ?? "Erreur");
    } finally {
      setLoading(false);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleForm, { title, setTitle, slug, setSlug, excerpt, setExcerpt, content, setContent, category, setCategory, coverUrl, setCoverUrl, published, setPublished, loading, onSubmit: handleSubmit, heading: "Modifier l'article" });
}
export {
  EditArticlePage as component
};
