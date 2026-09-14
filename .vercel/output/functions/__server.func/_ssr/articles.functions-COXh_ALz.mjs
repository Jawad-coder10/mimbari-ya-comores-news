import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-BjuxOege.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-cjkJh59S.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const listPublishedArticles_createServerFn_handler = createServerRpc({
  id: "a55603e3629d953e4021edfb9058a2c974a8641ddc6a2c08b7345ddd3ecbe361",
  name: "listPublishedArticles",
  filename: "src/lib/articles.functions.ts"
}, (opts) => listPublishedArticles.__executeServer(opts));
const listPublishedArticles = createServerFn({
  method: "GET"
}).inputValidator((input) => input ?? {}).handler(listPublishedArticles_createServerFn_handler, async ({
  data
}) => {
  let q = supabaseAdmin.from("articles").select("id, slug, title, excerpt, category, cover_image_url, published_at, view_count").eq("published", true).order("published_at", {
    ascending: false
  }).limit(data.limit ?? 50);
  if (data.category) q = q.eq("category", data.category);
  const {
    data: rows,
    error
  } = await q;
  if (error) {
    console.error("listPublishedArticles error", error);
    return {
      articles: []
    };
  }
  return {
    articles: rows ?? []
  };
});
const getArticleBySlug_createServerFn_handler = createServerRpc({
  id: "56247e6ee3d304c48058f8d110f119240330676c76ca2e2c888dd810ae82630f",
  name: "getArticleBySlug",
  filename: "src/lib/articles.functions.ts"
}, (opts) => getArticleBySlug.__executeServer(opts));
const getArticleBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1).max(120)
}).parse(input)).handler(getArticleBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    data: row,
    error
  } = await supabaseAdmin.from("articles").select("id, slug, title, excerpt, content, category, cover_image_url, published_at, view_count").eq("slug", data.slug).eq("published", true).maybeSingle();
  if (error) {
    console.error("getArticleBySlug error", error);
    return {
      article: null
    };
  }
  return {
    article: row ?? null
  };
});
const registerArticleView_createServerFn_handler = createServerRpc({
  id: "3fb6b420019abb82913b44960477e2bac4f765cfd2da8481da956061b11c469e",
  name: "registerArticleView",
  filename: "src/lib/articles.functions.ts"
}, (opts) => registerArticleView.__executeServer(opts));
const registerArticleView = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  articleId: stringType().uuid(),
  sessionId: stringType().min(8).max(100)
}).parse(input)).handler(registerArticleView_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabaseAdmin.rpc("register_article_view", {
    _article_id: data.articleId,
    _session_id: data.sessionId
  });
  if (error) {
    console.error("registerArticleView error", error);
    return {
      ok: false
    };
  }
  return {
    ok: true
  };
});
const articleInputSchema = objectType({
  title: stringType().min(3).max(200),
  slug: stringType().min(3).max(120).regex(/^[a-z0-9-]+$/),
  excerpt: stringType().max(500).nullable().optional(),
  content: stringType().min(10).max(5e4),
  category: stringType().min(2).max(50),
  cover_image_url: stringType().url().max(500).nullable().optional(),
  published: booleanType()
});
async function assertAdmin(supabase, userId) {
  const {
    data,
    error
  } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error || !data) {
    throw new Error("Accès refusé : rôle administrateur requis.");
  }
}
const listAllArticlesAdmin_createServerFn_handler = createServerRpc({
  id: "c6dea22992e74fbe879856ab2a1fcf13e2c845055469bd551fd43ad99360bf3b",
  name: "listAllArticlesAdmin",
  filename: "src/lib/articles.functions.ts"
}, (opts) => listAllArticlesAdmin.__executeServer(opts));
const listAllArticlesAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAllArticlesAdmin_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.from("articles").select("id, slug, title, excerpt, category, cover_image_url, published, published_at, view_count, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    articles: data ?? []
  };
});
const createArticle_createServerFn_handler = createServerRpc({
  id: "589eca7113c99142a158ff88b3702b4496e59e189531a462899979a1511551e9",
  name: "createArticle",
  filename: "src/lib/articles.functions.ts"
}, (opts) => createArticle.__executeServer(opts));
const createArticle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => articleInputSchema.parse(input)).handler(createArticle_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    data: row,
    error
  } = await supabaseAdmin.from("articles").insert({
    ...data,
    author_id: context.userId,
    published_at: data.published ? (/* @__PURE__ */ new Date()).toISOString() : null
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: row.id
  };
});
const updateArticle_createServerFn_handler = createServerRpc({
  id: "6e469383b333a4d4ad4d0d39dc162ff7a2cbd2c60b744b9a00d0cdffb9942b62",
  name: "updateArticle",
  filename: "src/lib/articles.functions.ts"
}, (opts) => updateArticle.__executeServer(opts));
const updateArticle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).merge(articleInputSchema).parse(input)).handler(updateArticle_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    id,
    ...rest
  } = data;
  const {
    data: current
  } = await supabaseAdmin.from("articles").select("published, published_at").eq("id", id).single();
  const published_at = rest.published && !current?.published_at ? (/* @__PURE__ */ new Date()).toISOString() : current?.published_at ?? null;
  const {
    error
  } = await supabaseAdmin.from("articles").update({
    ...rest,
    published_at
  }).eq("id", id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteArticle_createServerFn_handler = createServerRpc({
  id: "dae110bd8f9f1f7b56c26f2d39ca12ede74d9fc4e3cf1eb5c8ac9f413e317195",
  name: "deleteArticle",
  filename: "src/lib/articles.functions.ts"
}, (opts) => deleteArticle.__executeServer(opts));
const deleteArticle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deleteArticle_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    error
  } = await supabaseAdmin.from("articles").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getArticleByIdAdmin_createServerFn_handler = createServerRpc({
  id: "112f1f7ce93c3f8b8249f9eba432c5ea866bca41423c7bc922c4a6a1790cf56c",
  name: "getArticleByIdAdmin",
  filename: "src/lib/articles.functions.ts"
}, (opts) => getArticleByIdAdmin.__executeServer(opts));
const getArticleByIdAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(getArticleByIdAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    data: row,
    error
  } = await supabaseAdmin.from("articles").select("*").eq("id", data.id).single();
  if (error) throw new Error(error.message);
  return {
    article: row
  };
});
const isCurrentUserAdmin_createServerFn_handler = createServerRpc({
  id: "c22c93f6319143fb5d5f5247f0a2e8eb6890f699e965ca062df4327b908b8581",
  name: "isCurrentUserAdmin",
  filename: "src/lib/articles.functions.ts"
}, (opts) => isCurrentUserAdmin.__executeServer(opts));
const isCurrentUserAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(isCurrentUserAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (error) {
    throw new Error(`Impossible de vérifier les droits administrateur : ${error.message}`);
  }
  return {
    isAdmin: !!data
  };
});
export {
  createArticle_createServerFn_handler,
  deleteArticle_createServerFn_handler,
  getArticleByIdAdmin_createServerFn_handler,
  getArticleBySlug_createServerFn_handler,
  isCurrentUserAdmin_createServerFn_handler,
  listAllArticlesAdmin_createServerFn_handler,
  listPublishedArticles_createServerFn_handler,
  registerArticleView_createServerFn_handler,
  updateArticle_createServerFn_handler
};
