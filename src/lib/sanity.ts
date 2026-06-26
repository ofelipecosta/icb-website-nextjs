import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: "m7k49mce",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface InstalacaoSanity {
  _id: string;
  titulo: string;
  texto?: string;
  ordem?: number;
  fotos?: SanityImageSource[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export async function getInstalacoes(): Promise<InstalacaoSanity[]> {
  return client.fetch(
    `*[_type == "instalacao"] | order(ordem asc){ _id, titulo, texto, ordem, fotos, ctaLabel, ctaUrl }`
  );
}

export interface NoticiaSanity {
  _id: string;
  titulo: string;
  slug: { current: string };
  data: string;
  resumo?: string;
  capa?: SanityImageSource;
  fixado?: boolean;
}

export async function getNoticias(limit = 6): Promise<NoticiaSanity[]> {
  return client.fetch(
    `*[_type == "noticia"] | order(data desc)[0..${limit - 1}]{ _id, titulo, slug, data, resumo, capa, fixado }`
  );
}

export async function getTodasNoticias(): Promise<NoticiaSanity[]> {
  return client.fetch(
    `*[_type == "noticia"] | order(data desc){ _id, titulo, slug, data, resumo, capa, fixado }`
  );
}

export interface NoticiaDetalhe extends NoticiaSanity {
  corpo?: unknown[];
}

export async function getNoticia(slug: string): Promise<NoticiaDetalhe | null> {
  const results = await client.fetch(
    `*[_type == "noticia" && slug.current == $slug][0]{ _id, titulo, slug, data, resumo, capa, fixado, corpo }`,
    { slug }
  );
  return results ?? null;
}

export async function getNoticiasNav(): Promise<{ slug: string; titulo: string }[]> {
  return client.fetch(
    `*[_type == "noticia"] | order(fixado desc, data desc){ "slug": slug.current, titulo }`
  );
}

export interface DocumentoSanity {
  _id: string;
  titulo: string;
  categoria: string;
  dataPublicacao?: string;
  ordem: number;
  arquivoUrl?: string;
}

export async function getDocumentos(): Promise<DocumentoSanity[]> {
  return client.fetch(
    `*[_type == "documento"] | order(categoria asc, ordem asc){ _id, titulo, categoria, dataPublicacao, ordem, "arquivoUrl": arquivo.asset->url }`
  );
}

export interface RegatasSanity {
  _id: string;
  titulo: string;
  categoria?: string;
  classes?: string;
  data: string;
  local?: string;
  inscricoes?: string;
}

export async function getRegatas(): Promise<RegatasSanity[]> {
  return client.fetch(
    `*[_type == "regata"] | order(data asc){ _id, titulo, categoria, classes, data, local, inscricoes }`
  );
}

export interface EventoSanity {
  _id: string;
  titulo: string;
  categoria: string;
  data?: string;
  local?: string;
  detalhe?: string;
  ctaLabel?: string;
  linkUrl?: string;
  slug?: string;
}

export async function getEventos(): Promise<EventoSanity[]> {
  return client.fetch(
    `*[_type == "evento"] | order(data asc){ _id, titulo, categoria, data, local, detalhe, ctaLabel, linkUrl, "slug": slug.current }`
  );
}

export interface PlanSanity {
  _key: string;
  parcelas: number;
  valorParcela: number;
  taxaInfo?: string;
  destaque?: boolean;
}

export interface SocioSanity {
  _id: string;
  valorVenal: number;
  taxaManutencao: number;
  taxaAno?: number;
  vagas?: number;
  planos?: PlanSanity[];
  beneficios?: string[];
}

export async function getSocio(): Promise<SocioSanity | null> {
  const result = await client.fetch(
    `*[_type == "socio"][0]{ _id, valorVenal, taxaManutencao, taxaAno, vagas, planos, beneficios }`
  );
  return result ?? null;
}

export async function getNoticiasRelacionadas(excludeSlug: string, limit = 4): Promise<NoticiaSanity[]> {
  return client.fetch(
    `*[_type == "noticia" && slug.current != $excludeSlug] | order(data desc)[0..${limit - 1}]{ _id, titulo, slug, data, resumo, capa, fixado }`,
    { excludeSlug }
  );
}
