import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { s as supabase } from "./client-BKNuf0gt.mjs";
import { i as isCurrentUserAdmin } from "./router-C1F49sWW.mjs";
import { h as heroImage, S as SiteFooter } from "./SiteFooter-BgagAJte.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, F as FileText, a as CirclePlus, b as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BjuxOege.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-cjkJh59S.mjs";
import "../_libs/zod.mjs";
function AdminLayout() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const [state, setState] = reactExports.useState("checking");
  const [errorMessage, setErrorMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        navigate({
          to: "/login"
        });
        return;
      }
      try {
        const {
          isAdmin
        } = await checkAdmin();
        if (!mounted) return;
        setErrorMessage(null);
        setState(isAdmin ? "ok" : "denied");
      } catch (error) {
        if (mounted) {
          setErrorMessage(error instanceof Error ? error.message : "Erreur inconnue");
          setState("error");
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate, checkAdmin]);
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({
      to: "/"
    });
  }
  if (state === "checking") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  if (state === "denied") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl text-primary", children: "Accès refusé" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-md", children: "Votre compte n'a pas les droits administrateur. Seul l'administrateur de Mimbari Ya Comores peut publier des articles." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary underline underline-offset-4", children: "Retour à l'accueil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "text-muted-foreground hover:text-primary underline underline-offset-4", children: "Se déconnecter" })
      ] })
    ] });
  }
  if (state === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl text-primary", children: "Vérification de l’accès administrateur impossible" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-md", children: "Le serveur Supabase n’a pas pu vérifier vos droits administrateur." }),
      errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive", children: errorMessage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary underline underline-offset-4", children: "Retour à l'accueil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "text-muted-foreground hover:text-primary underline underline-offset-4", children: "Se déconnecter" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-secondary/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose flex items-center justify-between py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "Mimbari Ya Comores", className: "h-9 w-9 rounded-full object-cover ring-1 ring-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg text-primary leading-tight", children: "Mimbari Ya Comores" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Administration" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", activeOptions: {
          exact: true
        }, className: "hidden sm:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 hover:text-primary", activeProps: {
          className: "text-primary font-semibold"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          " Articles"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/new", className: "inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider px-3 py-2 hover:bg-primary-soft transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
          " Nouvel article"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hidden sm:inline-flex items-center text-xs text-muted-foreground hover:text-primary px-2", children: "Voir le site" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Déconnexion" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 container-prose py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  AdminLayout as component
};
