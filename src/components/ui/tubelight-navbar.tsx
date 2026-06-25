"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RED = "#B22222";

export interface TubeNavItem {
  name: string;
  href: string;
}

interface TubelightNavProps {
  items: TubeNavItem[];
  activeItem: string;
  /** called with (href, name) when an item is clicked */
  onSelect: (href: string, name: string) => void;
  className?: string;
}

export function TubelightNav({ items, activeItem, onSelect, className }: TubelightNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "flex items-center gap-1 py-1 px-1 rounded-full",
        "bg-white/[0.06] border border-white/10 backdrop-blur-md",
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeItem === item.name;

        return (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(item.href, item.name)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative text-sm font-medium px-4 py-2 rounded-full cursor-pointer",
              "transition-colors duration-200 select-none whitespace-nowrap",
              isActive ? "text-white" : "text-white/55 hover:text-white/85"
            )}
          >
            {/* Label above the indicator */}
            <span className="relative z-10">{item.name}</span>

            {/* Tubelight glow bg */}
            {isActive && (
              <motion.span
                layoutId="tubelight-bg"
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(178,34,34,0.22)" }}
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              >
                {/* Top glow bar */}
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 rounded-b-none rounded-t-full"
                  style={{ top: -1, width: 28, height: 2, backgroundColor: RED, display: "block" }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "block",
                      position: "absolute",
                      top: -6,
                      left: -12,
                      width: 52,
                      height: 18,
                      backgroundColor: RED,
                      opacity: 0.28,
                      borderRadius: "50%",
                      filter: "blur(8px)",
                    }}
                  />
                  <span
                    aria-hidden
                    style={{
                      display: "block",
                      position: "absolute",
                      top: -3,
                      left: -4,
                      width: 36,
                      height: 10,
                      backgroundColor: RED,
                      opacity: 0.38,
                      borderRadius: "50%",
                      filter: "blur(4px)",
                    }}
                  />
                </span>
              </motion.span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
