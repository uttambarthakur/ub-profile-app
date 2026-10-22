"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import DownloadPdfButton from "./DownloadPdfButton";

type ScrollCardProps = {
  children: ReactNode;
};

export default function ScrollCard({ children }: ScrollCardProps) {
  const sections = useMemo(
    () => [
      { id: "skills", label: "SKILLS" },
      { id: "career", label: "CAREER" },
      { id: "education", label: "EDUCATION & CERTIFICATIONS" },
    ],
    []
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const viewportCenter = container.scrollTop + container.clientHeight / 2;
      let closestId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const element = container.querySelector<HTMLElement>(
          `[data-scroll-section="${section.id}"]`
        );
        if (!element) continue;

        const sectionCenter = element.offsetTop + element.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = section.id;
        }
      }

      setActiveSection(closestId);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const target = container.querySelector<HTMLElement>(
      `[data-scroll-section="${sectionId}"]`
    );
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(sectionId);
  };

  return (
    <div className="mx-auto flex w-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm md:h-[78vh] md:min-h-[540px] md:flex-row md:gap-6 md:p-6">
      
      {/* ========== MOBILE: Top bar (Download + Tabs) ========== */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 py-3 md:hidden">
        <div className="mb-3 flex justify-center">
          <DownloadPdfButton
            storagePath="documents/Resume_Uttam_2026.pdf"
            fileName="Resume_Uttam_2026.pdf"
            className="bg-teal-500 hover:bg-teal-700 font-mono text-sm"
          >
            📄 Download Resume
          </DownloadPdfButton>
        </div>

        {/* Horizontal tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========== DESKTOP: Left aside ========== */}
      <aside className="hidden md:flex w-44 shrink-0 flex-col items-center gap-16">
        <DownloadPdfButton
          storagePath="documents/Resume_Uttam_2026.pdf"
          fileName="Resume_Uttam_2026.pdf"
          className="bg-teal-500 hover:bg-teal-700 font-mono text-sm"
        >
          📄 Download Resume
        </DownloadPdfButton>

        <div className="w-full space-y-4">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <p
                key={section.id}
                className={`rounded-md px-2 py-1 text-sm tracking-wide transition-colors ${
                  isActive ? "text-blue-700 font-semibold" : "text-gray-400"
                }`}
              >
                {section.label}
              </p>
            );
          })}
        </div>
      </aside>

      {/* ========== Scrollable content ========== */}
      <div
        ref={scrollContainerRef}
        className="min-h-0 min-w-0 flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth px-4 py-4 md:px-0 md:py-0"
      >
        {children}
      </div>

      {/* ========== DESKTOP: Right timeline dots ========== */}
      <aside className="hidden md:flex w-16 shrink-0 items-center justify-center">
        <div className="relative h-32 w-12">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-300" />
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const top = `${(index / (sections.length - 1)) * 100}%`;

            return (
              <button
                key={section.id}
                type="button"
                aria-label={`Go to ${section.label}`}
                onClick={() => scrollToSection(section.id)}
                className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm border transition-colors ${
                  isActive
                    ? "border-blue-900 bg-blue-900"
                    : "border-gray-400 bg-white hover:bg-gray-200"
                }`}
                style={{ top }}
              />
            );
          })}
        </div>
      </aside>
    </div>
  );
}