import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as Route$1, g as getCategoryLabel, f as categoryQuery } from "./router-C1F49sWW.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { S as SiteHeader } from "./SiteHeader-FPqXYH6U.mjs";
import { S as SiteFooter } from "./SiteFooter-BgagAJte.mjs";
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
function CategoryPage() {
  const {
    category
  } = Route$1.useParams();
  const {
    data
  } = useSuspenseQuery(categoryQuery(category));
  const label = getCategoryLabel(category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-prose py-12 md:py-16 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 border-b border-border pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary font-semibold", children: "Rubrique" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-serif text-5xl md:text-6xl text-foreground", children: label })
      ] }),
      data.articles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 border border-dashed border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-2xl text-primary", children: "Aucun article pour le moment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Revenez bientôt la rédaction prépare la suite." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-block text-primary underline underline-offset-4", children: "Retour à l'accueil" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", children: data.articles.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: a }, a.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  CategoryPage as component
};
