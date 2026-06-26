"use client";

import Link from "next/link";
import Image from "next/image";
import { Pin } from "lucide-react";
import { formatDate } from "@/lib/utils";

const RED = "#B22222";

function stripEmoji(s: string): string {
  return s.replace(/\p{Emoji_Presentation}/gu, "").replace(/\p{Emoji}️/gu, "").trim();
}

const fallbackGradients = [
  "from-[#0A1628] to-[#1E3A5F]",
  "from-[#122040] to-[#1a4a7a]",
  "from-[#0A1628] to-[#162d52]",
];

interface NewsCardProps {
  noticia: {
    _id: string;
    titulo: string;
    slug: { current: string };
    data: string;
    resumo?: string;
    capa?: any;
    fixado?: boolean;
  };
  index: number;
  imgUrl: string | null;
}

export default function NewsCard({ noticia, index, imgUrl }: NewsCardProps) {
  const title = stripEmoji(noticia.titulo);

  return (
    <Link href={`/noticias/${noticia.slug.current}`} className="group cursor-pointer h-full block">
      <div
        className="h-full card-hover overflow-hidden flex flex-col"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--shadow-luxury)",
        }}
      >
        {/* Cover */}
        <div className="aspect-video overflow-hidden relative flex-shrink-0">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradients[index % 3]} flex items-center justify-center`}>
              <span className="font-display text-5xl font-bold text-white opacity-20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {noticia.fixado && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold px-2.5 py-1"
              style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
            >
              <Pin className="w-3 h-3" /> Destaque
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs mb-2 block" style={{ color: "var(--color-anchor)" }}>
            {formatDate(noticia.data)}
          </span>
          <h2
            className="font-display text-lg font-semibold leading-snug mb-3 transition-colors duration-300 group-hover:text-[#B22222] line-clamp-2"
            style={{ color: "var(--color-ink)" }}
          >
            {title}
          </h2>
          {noticia.resumo && (
            <p className="text-sm leading-relaxed line-clamp-2 mb-4 flex-1" style={{ color: "var(--color-anchor)" }}>
              {noticia.resumo}
            </p>
          )}
          <span
            className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 mt-auto"
            style={{ color: RED }}
          >
            Ler mais →
          </span>
        </div>
      </div>
    </Link>
  );
}
