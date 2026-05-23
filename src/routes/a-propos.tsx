import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Mimbari Ya Comores" },
      { name: "description", content: "Mimbari Ya Comores, le média indépendant des Comores. Notre mission, notre équipe, notre engagement." },
      { property: "og:title", content: "À propos — Mimbari Ya Comores" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container-prose py-16 max-w-3xl flex-1">
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Le média</div>
        <h1 className="mt-2 font-serif text-5xl md:text-6xl text-foreground leading-tight">
          Mimbari Ya Comores
        </h1>
        <p className="mt-6 text-xl text-muted-foreground font-serif italic leading-relaxed">
          Une voix libre, posée et exigeante au service de l'archipel.
        </p>

        <div className="article-body mt-10">
          <p>
            Mimbari Ya Comores — littéralement « la tribune des Comores » — est un média
            indépendant qui couvre l'actualité de l'archipel : Grande Comore, Anjouan,
            Mohéli et Mayotte.
          </p>
          <h2>Notre mission</h2>
          <p>
            Informer avec rigueur, contextualiser avec honnêteté, donner la parole à celles
            et ceux qui font la société comorienne. Nous croyons qu'une démocratie a besoin
            d'un journalisme libre et accessible à tous.
          </p>
          <h2>Nos rubriques</h2>
          <p>
            Politique, société, économie, culture et sport : nous suivons l'ensemble des
            sujets qui font la vie de l'archipel, du débat institutionnel aux dynamiques
            locales, des arts traditionnels aux nouvelles voix.
          </p>
          <h2>Nous suivre</h2>
          <p>
            Retrouvez nos publications sur les réseaux sociaux et venez régulièrement sur
            notre site pour lire nos articles complets et nos enquêtes.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
