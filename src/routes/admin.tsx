import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { isCurrentUserAdmin } from "@/lib/articles.functions";
import { SiteFooter } from "@/components/SiteFooter";
import heroImage from "@/assets/hero-comores.jpg";
import { Loader2, LogOut, FileText, PlusCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — Mimbari Ya Comores" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const [state, setState] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/login" });
        return;
      }
      try {
        const { isAdmin } = await checkAdmin();
        if (!mounted) return;
        setState(isAdmin ? "ok" : "denied");
      } catch {
        if (mounted) setState("denied");
      }
    })();
    return () => { mounted = false; };
  }, [navigate, checkAdmin]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (state === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-4xl text-primary">Accès refusé</h1>
        <p className="mt-3 text-muted-foreground max-w-md">
          Votre compte n'a pas les droits administrateur. Seul l'administrateur de
          Mimbari Ya Comores peut publier des articles.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/" className="text-primary underline underline-offset-4">Retour à l'accueil</Link>
          <button onClick={handleLogout} className="text-muted-foreground hover:text-primary underline underline-offset-4">
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="container-prose flex items-center justify-between py-4">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src={heroImage}
              alt="Mimbari Ya Comores"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
            />
            <div>
              <div className="font-serif text-lg text-primary leading-tight">Mimbari Ya Comores</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Administration
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              activeOptions={{ exact: true }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              <FileText className="h-4 w-4" /> Articles
            </Link>
            <Link
              to="/admin/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider px-3 py-2 hover:bg-primary-soft transition-colors"
            >
              <PlusCircle className="h-4 w-4" /> Nouvel article
            </Link>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center text-xs text-muted-foreground hover:text-primary px-2"
            >
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container-prose py-10">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
