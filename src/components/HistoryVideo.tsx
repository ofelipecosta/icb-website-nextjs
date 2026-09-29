"use client";

import { useState } from "react";

const RED = "#B22222";

interface HistoryVideoProps {
  videoId?: string;
}

export default function HistoryVideo({ videoId = "dkbSf1zBFPQ" }: HistoryVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: "16/9",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-luxury-lg)",
        backgroundColor: "#0A1628",
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
          {/* Miniatura real do YouTube */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Documentário dos 120 anos do Iate Clube Brasileiro"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          {/* Leve escurecimento para contraste do botão */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.18)" }} />

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
