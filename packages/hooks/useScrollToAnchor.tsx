import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ScrollToAnchorOptions {
  behavior?: 'smooth' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
  offset?: number;
}

export const useScrollToAnchor = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const scrollToElement = useCallback(
    (elementId: string, options: ScrollToAnchorOptions = {}) => {
      const {
        behavior = 'smooth',
        block = 'start',
        inline = 'nearest',
        offset = 0
      } = options;
      
      const element = document.getElementById(elementId);
      if (!element) return;
      
      if (offset !== 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior
        });
      } else {
        element.scrollIntoView({ behavior, block, inline });
      }
    },
    []
  );


  const scrollToTop = useCallback((options: ScrollToOptions = {}) => {
    window.scrollTo({
      top: 0,
      behavior: options.behavior || 'smooth'
    });
  }, []);


  const navigateToAnchor = useCallback(
    (to: string, options: ScrollToAnchorOptions = {}) => {

      const [path, hash] = to.includes('#') 
        ? to.split('#')
        : [to, ''];
      
      const currentPath = location.pathname;
      const isCurrentPage = path === '' || path === '/' 
        ? currentPath === '/'
        : currentPath === path || currentPath === `${path}/`;
      
      if (isCurrentPage && hash) {

        scrollToElement(hash, options);
      } else {

        navigate(to);
        
        if (hash) {
          setTimeout(() => {
            scrollToElement(hash, options);
          }, 100);
        }
      }
    },
    [navigate, location.pathname, scrollToElement]
  );

  return { scrollToElement, scrollToTop, navigateToAnchor };
};