import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    setTimeout(() => {
      const main = document.querySelector("main");
      
      if (main && main.scrollHeight > main.clientHeight) {
        main.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  }, [pathname]);
  
  return null;
}
