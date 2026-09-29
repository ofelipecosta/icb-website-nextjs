"use client";

import { useState } from "react";
import Image from "next/image";

const RED = "#B22222";

interface HistoryVideoProps {
  videoId?: string;
  /** Legenda no rodapé do pôster. String vazia esconde. */
  caption?: string;
}

export default function HistoryVideo({
  videoId = "dkbSf1zBFPQ",
  caption = "120 anos · Fundado em 1906",
}: HistoryVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: "16/9",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-luxury-lg)",
      }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="120 anos do Iate Clube Brasileiro"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label="Reproduzir o documentário dos 120 anos do Iate Clube Brasileiro"
        >
          {/* Fundo navy */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 40%, #1E3A5F 0%, #0D1F3C 60%, #070F1E 100%)" }}
          />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/logo-timao-contorno.png"
              alt="Logo Iate Clube Brasileiro"
              width={260}
              height={260}
              className="object-contain w-[34%] h-auto"
              style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))", opacity: 0.9 }}
            />
          </div>

          {/* Legenda */}
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-6 pb-4">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                {caption}
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>
          )}

          {/* Botão play estilo YouTube */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: RED, borderRadius: 14, width: 74, height: 52 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
