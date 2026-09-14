import { Q as QueryClientProvider, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { V as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BjuxOege.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-cjkJh59S.mjs";
import { s as supabase } from "./client-BKNuf0gt.mjs";
import { X, L as LoaderCircle, U as Upload, C as ChevronLeft } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-D7FmKrj0.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$9 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mimbari Ya Comores: Le média des Comores" },
      {
        name: "description",
        content: "Mimbari Ya Comores : actualité, politique, société, culture et sport de l'archipel des Comores. Information indépendante au quotidien."
      },
      { property: "og:site_name", content: "Mimbari Ya Comores" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$9.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const listPublishedArticles = createServerFn({
  method: "GET"
}).inputValidator((input) => input ?? {}).handler(createSsrRpc("a55603e3629d953e4021edfb9058a2c974a8641ddc6a2c08b7345ddd3ecbe361"));
const getArticleBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("56247e6ee3d304c48058f8d110f119240330676c76ca2e2c888dd810ae82630f"));
const registerArticleView = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  articleId: stringType().uuid(),
  sessionId: stringType().min(8).max(100)
}).parse(input)).handler(createSsrRpc("3fb6b420019abb82913b44960477e2bac4f765cfd2da8481da956061b11c469e"));
const articleInputSchema = objectType({
  title: stringType().min(3).max(200),
  slug: stringType().min(3).max(120).regex(/^[a-z0-9-]+$/),
  excerpt: stringType().max(500).nullable().optional(),
  content: stringType().min(10).max(5e4),
  category: stringType().min(2).max(50),
  cover_image_url: stringType().url().max(500).nullable().optional(),
  published: booleanType()
});
const listAllArticlesAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c6dea22992e74fbe879856ab2a1fcf13e2c845055469bd551fd43ad99360bf3b"));
const createArticle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => articleInputSchema.parse(input)).handler(createSsrRpc("589eca7113c99142a158ff88b3702b4496e59e189531a462899979a1511551e9"));
const updateArticle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).merge(articleInputSchema).parse(input)).handler(createSsrRpc("6e469383b333a4d4ad4d0d39dc162ff7a2cbd2c60b744b9a00d0cdffb9942b62"));
const deleteArticle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("dae110bd8f9f1f7b56c26f2d39ca12ede74d9fc4e3cf1eb5c8ac9f413e317195"));
const getArticleByIdAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("112f1f7ce93c3f8b8249f9eba432c5ea866bca41423c7bc922c4a6a1790cf56c"));
const isCurrentUserAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c22c93f6319143fb5d5f5247f0a2e8eb6890f699e965ca062df4327b908b8581"));
const articlesQueryOptions = queryOptions({
  queryKey: ["articles", "home"],
  queryFn: () => listPublishedArticles({
    data: {
      limit: 30
    }
  })
});
const $$splitComponentImporter$8 = () => import("./index-DBbsKmHj.mjs");
const Route$8 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Mimbari Ya Comores Le média des Comores"
    }, {
      property: "og:title",
      content: "Mimbari Ya Comores Le média des Comores"
    }, {
      property: "og:description",
      content: "L'actualité indépendante des Comores : politique, société, économie, culture, sport."
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(articlesQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./a-propos-BJxzVaqp.mjs");
const Route$7 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "À propos: Mimbari Ya Comores"
    }, {
      name: "description",
      content: "Mimbari Ya Comores, le média indépendant des Comores. Notre mission, notre équipe, notre engagement."
    }, {
      property: "og:title",
      content: "À propos: Mimbari Ya Comores"
    }],
    links: [{
      rel: "canonical",
      href: "/a-propos"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin-CxcXOspw.mjs");
const Route$6 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Administration Mimbari Ya Comores"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./login-BPLZKbis.mjs");
const Route$5 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Connexion Mimbari Ya Comores"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.index-a8O8AD2p.mjs");
const Route$4 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const CATEGORIES = [
  { slug: "politique", label: "Politique" },
  { slug: "societe", label: "Société" },
  { slug: "economie", label: "Économie" },
  { slug: "culture", label: "Culture" },
  { slug: "sport", label: "Sport" }
];
function getCategoryLabel(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
const ACCEPTED = ["image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
function CoverImageUpload({
  value,
  onChange
}) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  async function handleFile(file) {
    if (!ACCEPTED.includes(file.type)) {
      toast.error("Format non supporté : choisissez un fichier JPEG ou PNG.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Image trop lourde (5 Mo maximum).");
      return;
    }
    setUploading(true);
    try {
      const ext = file.type === "image/png" ? "png" : "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("article-images").upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      const { data, error } = await supabase.storage.from("article-images").createSignedUrl(path, TEN_YEARS);
      if (error || !data?.signedUrl) throw error ?? new Error("Lien indisponible");
      const url = new URL(data.signedUrl, window.location.origin).toString();
      onChange(url);
      toast.success("Image téléversée");
    } catch (err) {
      toast.error(err?.message ?? "Échec du téléversement");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    value && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: value,
          alt: "Aperçu de l'image de couverture",
          className: "w-full aspect-[4/3] object-cover border border-border"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(""),
          "aria-label": "Retirer l'image",
          className: "absolute top-2 right-2 bg-background/90 border border-border p-1 hover:text-destructive",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/jpeg,image/png",
        className: "hidden",
        onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: uploading,
        onClick: () => inputRef.current?.click(),
        className: "w-full border border-input bg-background px-3 py-2 text-sm flex items-center justify-center gap-2 hover:border-primary disabled:opacity-50",
        children: [
          uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
          value ? "Remplacer l'image" : "Choisir une image (JPEG / PNG)"
        ]
      }
    )
  ] });
}
const $$splitComponentImporter$3 = () => import("./admin.new-lnvH6Zub.mjs");
const Route$3 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
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
const $$splitComponentImporter$2 = () => import("./article._slug-aAaDEwQw.mjs");
const articleQuery = (slug) => queryOptions({
  queryKey: ["article", slug],
  queryFn: () => getArticleBySlug({
    data: {
      slug
    }
  })
});
const Route$2 = createFileRoute()({
  loader: async ({
    context,
    params
  }) => {
    const data = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    return data;
  },
  head: ({
    loaderData
  }) => {
    const a = loaderData?.article;
    if (!a) return {
      meta: [{
        title: "Article introuvable Mimbari Ya Comores"
      }]
    };
    return {
      meta: [{
        title: `${a.title} Mimbari Ya Comores`
      }, {
        name: "description",
        content: a.excerpt ?? a.title
      }, {
        property: "og:title",
        content: a.title
      }, {
        property: "og:description",
        content: a.excerpt ?? ""
      }, {
        property: "og:type",
        content: "article"
      }, ...a.cover_image_url ? [{
        property: "og:image",
        content: a.cover_image_url
      }] : []],
      links: [{
        rel: "canonical",
        href: `/article/${a.slug}`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const categoryQuery = (category) => queryOptions({
  queryKey: ["articles", "category", category],
  queryFn: () => listPublishedArticles({
    data: {
      category,
      limit: 60
    }
  })
});
const $$splitComponentImporter$1 = () => import("./category._category-BhhcQ55O.mjs");
const Route$1 = createFileRoute()({
  beforeLoad: ({
    params
  }) => {
    if (!CATEGORIES.find((c) => c.slug === params.category)) {
      throw notFound();
    }
  },
  loader: ({
    context,
    params
  }) => context.queryClient.ensureQueryData(categoryQuery(params.category)),
  head: ({
    params
  }) => {
    const label = getCategoryLabel(params.category);
    return {
      meta: [{
        title: `${label} Mimbari Ya Comores`
      }, {
        name: "description",
        content: `Toute l'actualité ${label} aux Comores par Mimbari Ya Comores.`
      }, {
        property: "og:title",
        content: `${label} Mimbari Ya Comores`
      }],
      links: [{
        rel: "canonical",
        href: `/category/${params.category}`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin._id.edit-DTA4cnnG.mjs");
const Route = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const AProposRoute = Route$7.update({
  id: "/a-propos",
  path: "/a-propos",
  getParentRoute: () => Route$9
});
const AdminRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const AdminIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminNewRoute = Route$3.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AdminRoute
});
const ArticleSlugRoute = Route$2.update({
  id: "/article/$slug",
  path: "/article/$slug",
  getParentRoute: () => Route$9
});
const CategoryCategoryRoute = Route$1.update({
  id: "/category/$category",
  path: "/category/$category",
  getParentRoute: () => Route$9
});
const AdminIdEditRoute = Route.update({
  id: "/$id/edit",
  path: "/$id/edit",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminNewRoute,
  AdminIndexRoute,
  AdminIdEditRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AProposRoute,
  AdminRoute: AdminRouteWithChildren,
  LoginRoute,
  ArticleSlugRoute,
  CategoryCategoryRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ArticleForm as A,
  CATEGORIES as C,
  Route$2 as R,
  articlesQueryOptions as a,
  CoverImageUpload as b,
  createArticle as c,
  deleteArticle as d,
  Route$1 as e,
  categoryQuery as f,
  getCategoryLabel as g,
  Route as h,
  isCurrentUserAdmin as i,
  getArticleByIdAdmin as j,
  router as k,
  listAllArticlesAdmin as l,
  registerArticleView as r,
  updateArticle as u
};
