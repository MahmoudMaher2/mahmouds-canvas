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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};