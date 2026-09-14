import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as CATEGORIES, a as articlesQueryOptions } from "./router-C1F49sWW.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { S as SiteHeader } from "./SiteHeader-FPqXYH6U.mjs";
import { h as heroImage, S as SiteFooter } from "./SiteFooter-BgagAJte.mjs";
import { A as ArticleCard } from "./ArticleCard-Bwuqgj3a.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./server-BjuxOege.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function HomePage() {
  const {
    data
  } = useSuspenseQuery(articlesQueryOptions);
  const articles = data.articles;
  const featured = articles[0];
  const rest = articles.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "", width: 1920, height: 1080, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose py-20 md:py-28 text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.3em] mb-4 text-primary-foreground/80", children: [
          "Édition du ",
          (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl", children: [
          "L'information",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "au cœur de l'archipel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-lg text-primary-foreground/85 leading-relaxed", children: "Politique, société, culture, sport chaque jour, Mimbari Ya Comores éclaire l'actualité des Comores avec rigueur et indépendance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/category/$category", params: {
          category: c.slug
        }, className: "text-xs uppercase tracking-wider border border-primary-foreground/30 px-3 py-1.5 hover:bg-primary-foreground hover:text-primary transition-colors", children: c.label }, c.slug)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container-prose py-12 md:py-16 flex-1", children: articles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-primary" }),
          "À la une"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: featured, large: true })
      ] }),
      rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-primary" }),
          "Tous les articles"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", children: rest.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: a }, a.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 border border-dashed border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl text-primary", children: "Bientôt en ligne" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-md mx-auto", children: "Les premiers articles de Mimbari Ya Comores arrivent très prochainement. Revenez bientôt pour découvrir notre couverture de l'actualité." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-flex items-center rounded-sm border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors", children: "Espace rédaction" })
  ] });
}
export {
  HomePage as component
};
