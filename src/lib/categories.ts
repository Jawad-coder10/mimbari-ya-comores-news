export const CATEGORIES = [
  { slug: "politique", label: "Politique" },
  { slug: "societe", label: "Société" },
  { slug: "economie", label: "Économie" },
  { slug: "culture", label: "Culture" },
  { slug: "sport", label: "Sport" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
