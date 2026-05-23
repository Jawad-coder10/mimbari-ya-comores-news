import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/categories";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setIsAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-prose flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground font-serif text-xl">
            M
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg md:text-xl text-primary">Mimbari Ya Comores</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Le média des Comores
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/category/$category"
              params={{ category: c.slug }}
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {c.label}
            </Link>
          ))}
          <Link
            to={isAuthed ? "/admin" : "/login"}
            className="ml-2 inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {isAuthed ? "Espace admin" : "Connexion"}
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose flex flex-col py-4 gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$category"
                params={{ category: c.slug }}
                onClick={() => setOpen(false)}
                className="text-foreground/80 hover:text-primary py-1"
              >
                {c.label}
              </Link>
            ))}
            <Link
              to={isAuthed ? "/admin" : "/login"}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center rounded-sm border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {isAuthed ? "Espace admin" : "Connexion"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
