"use client";

import Link from "next/link";
import Image from "next/image";
import { Pin } from "lucide-react";

const RED = "#B22222";

function stripEmoji(s: string): string {
  return s.replace(/\p{Emoji_Presentation}/gu, "").replace(/\p{Emoji}️/gu, "").trim();
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
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
    <Link
      href={`/noticias/${noticia.slug.current}`}
      className="group cursor-pointer"
    >
      <div
        className="h-full rounded-lg transition-all duration-300"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "visible",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.borderColor = "#D1D5DB";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "#E5E7EB";
        }}
      >
        {/* Cover */}
        <div className="aspect-video overflow-hidden relative rounded-t-lg">
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
              className="absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: RED, color: "#fff" }}
            >
              <Pin className="w-3 h-3" /> Destaque
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="text-xs mb-2 block" style={{ color: "#6B7A8D" }}>
            {formatDate(noticia.data)}
          </span>

          <h2
            className="font-display text-lg font-semibold leading-snug mb-3 transition-colors duration-300 group-hover:text-[#B22222] line-clamp-2"
            style={{ color: "#0A1628" }}
          >
            {title}
          </h2>

          {noticia.resumo && (
            <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "#6B7A8D" }}>
              {noticia.resumo}
            </p>
          )}

          <span
            className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300"
            style={{ color: RED }}
          >
            Ler mais →
          </span>
        </div>
      </div>
    </Link>
  );
}
