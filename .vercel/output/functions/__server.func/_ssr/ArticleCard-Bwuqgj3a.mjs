import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as getCategoryLabel } from "./router-C1F49sWW.mjs";
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function ArticleCard({ article, large = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/article/$slug",
      params: { slug: article.slug },
      className: "group block",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card/50 shadow-sm transition-shadow duration-200 group-hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative overflow-hidden bg-muted ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`, children: article.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: article.cover_image_url,
            alt: article.title,
            loading: "lazy",
            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-5xl text-primary/30", children: "M" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `pt-4 flex-1 flex flex-col ${large ? "items-center text-center px-5 md:px-8" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-primary font-semibold ${large ? "justify-center" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getCategoryLabel(article.category) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium tracking-wider", children: formatDate(article.published_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `mt-2 font-serif text-foreground group-hover:text-primary transition-colors ${large ? "text-3xl md:text-4xl leading-tight" : "text-xl leading-snug"}`, children: article.title }),
          article.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 text-sm text-muted-foreground leading-relaxed ${large ? "max-w-3xl text-center" : "line-clamp-2"}`, children: article.excerpt })
        ] })
      ] })
    }
  );
}
export {
  ArticleCard as A
};
