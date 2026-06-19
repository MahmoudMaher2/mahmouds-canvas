// src/hooks/useScrollSpy.ts
import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionIds.map(id => ({
        id,
        element: document.getElementById(id)
      })).filter(section => section.element);

      let current = 'home';
      
      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      });

      setActiveSection(current);

      // Sync URL hash with current section (replaceState to avoid scroll jumps & history clutter)
      const currentHash = window.location.hash.replace('#', '');
      if (current !== currentHash) {
        const newUrl = current === 'home'
          ? window.location.pathname + window.location.search
          : `${window.location.pathname}${window.location.search}#${current}`;
        window.history.replaceState(null, '', newUrl);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};