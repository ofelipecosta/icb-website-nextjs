"use client";

import { Clock, MapPin } from "lucide-react";

const RED = "#B22222";
const INK = "#111827";

const categoryColors: Record<string, { bg: string; text: string }> = {
  Social: { bg: "rgba(168, 85, 247, 0.08)", text: "#A855F7" },
  Esporte: { bg: "rgba(16, 185, 129, 0.08)", text: "#10B981" },
  Náutico: { bg: "rgba(59, 130, 246, 0.08)", text: "#3B82F6" },
};

function formatDate(month: string, day: string): string {
  return `${day} ${month.slice(0, 3).toLowerCase()}`;
}

interface EventCardProps {
  event: {
    id: string;
    month: string;
    day: string;
    title: string;
    description: string;
    time: string;
    location: string;
    category: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="group cursor-pointer">
      <div
        className="h-full rounded-lg transition-all duration-300"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
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
        {/* Image placeholder */}
        <div
          className="relative overflow-hidden flex-shrink-0 rounded-t-lg flex items-center justify-center"
          style={{
            aspectRatio: "3/1",
            backgroundColor: "#F9FAFB",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${categoryColors[event.category].bg} 0%, rgba(229, 231, 235, 0.5) 100%)`,
            }}
          >
            <span
              className="font-display text-6xl font-bold opacity-20"
              style={{ color: categoryColors[event.category].text }}
            >
              {event.day}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-full">
          {/* Date + Category */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded"
              style={{ backgroundColor: RED, color: "#fff" }}
            >
              {formatDate(event.month, event.day)}
            </span>
            <span
              className="text-xs font-semibold px-2 py-1 rounded"
              style={{
                backgroundColor: categoryColors[event.category].bg,
                color: categoryColors[event.category].text,
              }}
            >
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display text-lg font-semibold leading-snug mb-3 transition-colors duration-200 group-hover:text-[#B22222] line-clamp-2"
            style={{ color: INK }}
          >
            {event.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed line-clamp-2 mb-4 flex-1"
            style={{ color: "#6B7A8D" }}
          >
            {event.description}
          </p>

          {/* Time + Location */}
          <div className="flex flex-col gap-2 text-xs" style={{ color: "#6B7A8D" }}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #E5E7EB" }}>
            <span
              className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300"
              style={{ color: RED }}
            >
              Ver detalhes →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
