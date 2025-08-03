"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className = "" }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Initialize mermaid with dark theme to match your blog design
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#60a5fa", // blue-400
          primaryTextColor: "#f3f4f6", // gray-100
          primaryBorderColor: "#374151", // gray-700
          lineColor: "#6b7280", // gray-500
          sectionBkgColor: "#1f2937", // gray-800
          altSectionBkgColor: "#374151", // gray-700
          gridColor: "#4b5563", // gray-600
          secondaryColor: "#1e40af", // blue-800
          tertiaryColor: "#1f2937", // gray-800
        },
        fontSize: 2,
      });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((error) => {
          console.error("Mermaid rendering error:", error);
          if (ref.current) {
            ref.current.innerHTML = `<pre class="text-red-400">Error rendering diagram: ${error}</pre>`;
          }
        });
    }
  }, [chart]);

  return <div ref={ref} className={`${className}`} />;
}
