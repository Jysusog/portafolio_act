import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { hash, pathname, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempt < 8) {
          setTimeout(() => tryScroll(attempt + 1), 60);
        }
      };
      tryScroll();
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [hash, pathname, key]);

  return null;
};

export default ScrollToHash;
