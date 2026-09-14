import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { R as Route$2, g as getCategoryLabel, r as registerArticleView } from "./router-C1F49sWW.mjs";
import { S as SiteHeader } from "./SiteHeader-FPqXYH6U.mjs";
import { S as SiteFooter } from "./SiteFooter-BgagAJte.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { C as ChevronLeft } from "../_libs/lucide-react.mjs";
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
const KEY = "mimbari_session_id";
function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(KEY, id);
  }
  return id;
}
function ArticlePage() {
  const {
    article
  } = Route$2.useLoaderData();
  const router = useRouter();
  const trackView = useServerFn(registerArticleView);
  reactExports.useEffect(() => {
    if (!article) return;
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;
    trackView({
      data: {
        articleId: article.id,
        sessionId
      }
    }).then(() => router.invalidate()).catch(() => {
    });
  }, [article?.id]);
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-prose py-24 flex-1 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl text-primary", children: "Article introuvable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Cet article n'existe pas ou n'est plus disponible." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-block text-primary underline underline-offset-4", children: "Retour à l'accueil" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] });
  }
  const date = article.published_at ? new Date(article.published_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      article.cover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[21/9] overflow-hidden rounded-[24px] bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.cover_image_url, alt: article.title, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose py-12 md:py-16 max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/category/$category", params: {
          category: article.category
        }, className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary font-semibold hover:underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3 w-3" }),
          getCategoryLabel(article.category)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground", children: article.title }),
        article.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xl text-muted-foreground leading-relaxed font-serif italic", children: article.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground border-y border-border py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mimbari Ya Comores" }),
          date && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article-body mt-10 whitespace-pre-wrap", children: article.content })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ArticlePage as component
};
