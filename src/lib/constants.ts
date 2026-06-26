/** Paleta de badges por categoria de evento — fonte única de verdade */
export const categoryColors: Record<string, { bg: string; text: string }> = {
  Social:   { bg: "rgba(107, 122, 141, 0.08)", text: "var(--color-anchor)" },
  Esporte:  { bg: "rgba(10, 22, 40, 0.06)",   text: "var(--color-ink)" },
  Náutico:  { bg: "rgba(10, 22, 40, 0.06)",   text: "var(--color-ink)" },
  Cultural: { bg: "rgba(107, 122, 141, 0.08)", text: "var(--color-anchor)" },
};

export const DEFAULT_CATEGORY_COLOR: { bg: string; text: string } = {
  bg: "rgba(107, 122, 141, 0.08)",
  text: "var(--color-anchor)",
};
