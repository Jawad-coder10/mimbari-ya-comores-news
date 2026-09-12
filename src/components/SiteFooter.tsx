import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/categories";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="container-prose py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl">Mimbari Ya Comores</div>
          <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
            L'information indépendante au cœur de l'archipel.
            Politique, société, culture chaque jour, l'actualité des Comores.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
            Rubriques
          </div>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="hover:underline"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
            Le média
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/a-propos" className="hover:underline">À propos</Link></li>
            <li><Link to="/login" className="hover:underline">Connexion</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-prose py-5 text-xs text-primary-foreground/70 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Mimbari Ya Comores. Tous droits réservés.</span>
          <span>Moroni · Comores</span>
        </div>
      </div>
    </footer>
  );
}
