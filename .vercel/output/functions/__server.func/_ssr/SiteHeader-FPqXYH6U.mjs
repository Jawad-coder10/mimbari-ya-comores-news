import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-BKNuf0gt.mjs";
import { C as CATEGORIES } from "./router-C1F49sWW.mjs";
import { h as heroImage } from "./SiteFooter-BgagAJte.mjs";
import { X, M as Menu } from "../_libs/lucide-react.mjs";
function SiteHeader() {
  const [isAuthed, setIsAuthed] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setIsAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex items-center justify-between py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: heroImage,
            alt: "Mimbari Ya Comores",
            className: "h-10 w-10 rounded-full object-cover ring-1 ring-border"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg md:text-xl text-primary", children: "Mimbari Ya Comores" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Le média des Comores" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-7 text-sm font-medium", children: [
        CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/category/$category",
            params: { category: c.slug },
            className: "text-foreground/80 hover:text-primary transition-colors",
            activeProps: { className: "text-primary" },
            children: c.label
          },
          c.slug
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: isAuthed ? "/admin" : "/login",
            className: "ml-2 inline-flex items-center rounded-full border border-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors",
            children: isAuthed ? "Espace admin" : "Connexion"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen((o) => !o),
          className: "md:hidden text-foreground",
          "aria-label": "Menu",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex flex-col py-4 gap-3", children: [
      CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/category/$category",
          params: { category: c.slug },
          onClick: () => setOpen(false),
          className: "text-foreground/80 hover:text-primary py-1",
          children: c.label
        },
        c.slug
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: isAuthed ? "/admin" : "/login",
          onClick: () => setOpen(false),
          className: "mt-2 inline-flex items-center rounded-full border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary",
          children: isAuthed ? "Espace admin" : "Connexion"
        }
      )
    ] }) })
  ] });
}
export {
  SiteHeader as S
};
