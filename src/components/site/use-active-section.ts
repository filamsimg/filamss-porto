'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'home');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visibilityMap = new Map<string, number>();

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(id, entry.intersectionRatio);
          });

          // Determine section with highest visibility ratio
          let maxRatio = -1;
          let bestId = sectionIds[0];

          sectionIds.forEach((sId) => {
            const ratio = visibilityMap.get(sId) || 0;
            if (ratio > maxRatio && ratio > 0.05) {
              maxRatio = ratio;
              bestId = sId;
            }
          });

          if (maxRatio > 0.05) {
            setActiveSection(bestId);
          }
        },
        {
          threshold: [0.15, 0.35, 0.55, 0.75],
          rootMargin: '-20% 0px -30% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
