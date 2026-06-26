"use client";

import { Clock, MapPin } from "lucide-react";
import { categoryColors, DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";

const RED = "#B22222";
const INK = "var(--color-ink)";

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
    data?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const cat = categoryColors[event.category] ?? DEFAULT_CATEGORY_COLOR;
  const dateLabel = event.data
    ? formatDateShort(event.data)
    : `${event.day} ${event.month.slice(0, 3)}`;

  return (
    <div
      className="group cursor-pointer card-hover h-full"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-luxury)",
        overflow: "hidden",
      }}
    >
      {/* Image placeholder — gradient background */}
      <div
        className="relative overflow-hidden flex-shrink-0 flex items-center justify-center"
        style={{ aspectRatio: "3/1", backgroundColor: cat.bg }}
      >
        <span
          className="font-display text-6xl font-bold opacity-20 select-none"
          style={{ color: cat.text }}
        >
          {event.day}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Date + Category */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1"
            style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
          >
            {dateLabel}
          </span>
          <span
            className="text-xs font-semibold px-2 py-1"
            style={{ backgroundColor: cat.bg, color: cat.text, borderRadius: "var(--radius-btn)" }}
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
          style={{ color: "var(--color-anchor)" }}
        >
          {event.description}
        </p>

        {/* Time + Location */}
        <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--color-anchor)" }}>
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
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300"
            style={{ color: RED }}
          >
            Ver detalhes →
          </span>
        </div>
      </div>
    </div>
  );
}
