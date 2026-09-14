import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { C as CATEGORIES, b as CoverImageUpload, c as createArticle } from "./router-C1F49sWW.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { C as ChevronLeft, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
function slugify(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
function NewArticlePage() {
  const navigate = useNavigate();
  const create = useServerFn(createArticle);
  const [loading, setLoading] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [slugTouched, setSlugTouched] = reactExports.useState(false);
  const [excerpt, setExcerpt] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(CATEGORIES[0].slug);
  const [coverUrl, setCoverUrl] = reactExports.useState("");
  const [published, setPublished] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);
  async function handleSubmit(e) {
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
          published
        }
      });
      toast.success(published ? "Article publié" : "Brouillon enregistré");
      navigate({
        to: "/admin"
      });
    } catch (err) {
      toast.error(err.message ?? "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleForm, { title, setTitle, slug, setSlug: (v) => {
    setSlugTouched(true);
    setSlug(v);
  }, excerpt, setExcerpt, content, setContent, category, setCategory, coverUrl, setCoverUrl, published, setPublished, loading, onSubmit: handleSubmit, heading: "Nouvel article" });
}
function ArticleForm(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3 w-3" }),
      " Retour"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-serif text-4xl text-foreground mb-8", children: props.heading }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: props.onSubmit, className: "grid lg:grid-cols-[1fr_280px] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 200, value: props.title, onChange: (e) => props.setTitle(e.target.value), className: "w-full border border-input bg-card px-3 py-2 font-serif text-2xl focus:outline-none focus:ring-2 focus:ring-ring" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug (URL)", hint: "Auto-généré depuis le titre. Modifiable.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, pattern: "[a-z0-9-]+", maxLength: 120, value: props.slug, onChange: (e) => props.setSlug(e.target.value), className: "w-full border border-input bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Chapô / Extrait", hint: "Phrase d'accroche affichée en aperçu.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { maxLength: 500, rows: 2, value: props.excerpt, onChange: (e) => props.setExcerpt(e.target.value), className: "w-full border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contenu de l'article", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, minLength: 10, maxLength: 5e4, rows: 20, value: props.content, onChange: (e) => props.setContent(e.target.value), placeholder: "Rédigez ici votre article…", className: "w-full border border-input bg-card px-3 py-3 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Catégorie", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: props.category, onChange: (e) => props.setCategory(e.target.value), className: "w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.slug, children: c.label }, c.slug)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image de couverture", hint: "Fichier JPEG ou PNG, 5 Mo maximum.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoverImageUpload, { value: props.coverUrl, onChange: props.setCoverUrl }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: props.published, onChange: (e) => props.setPublished(e.target.checked), className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Publier maintenant" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: props.loading, className: "w-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-primary-soft transition-colors disabled:opacity-50 flex items-center justify-center gap-2", children: [
          props.loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Enregistrer"
        ] })
      ] }) })
    ] })
  ] });
}
function Field({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-wider font-semibold mb-1.5", children: label }),
    children,
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: hint })
  ] });
}
export {
  ArticleForm,
  NewArticlePage as component
};
