import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
export default function LoginFooter() {
 
  const isStudioPage =
    window.location.href.includes('/landing-pages/studio') ||
    window.location.hostname === 'studio.weshre.com' ||      
    window.location.hostname === 'www.studio.weshre.com';
 
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isStudioRoot = window.location.pathname === '/landing-pages/studio' || 
                         window.location.pathname === '/landing-pages/studio/';
    
    if (window.location.pathname === '/' || isStudioRoot) {
      e.preventDefault();
      console.log('Already on root, just scrolling...');
      
      const main = document.querySelector("main");
      if (main && main.scrollHeight > main.clientHeight) {
        console.log('Scrolling main element');
        main.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.log('Scrolling window');
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

  };
 
  return (
    <footer className="welcome-footer">
      <hr />
      <div className="f-content">
        <div className="f-content__links">
          {isStudioPage && (
            <Link to="/" className="logo" onClick={handleLogoClick}>
              <ReactSVG src="/svg/logo.svg" />
              <h1>WeShre Studio</h1>
            </Link>
          )}
          {!isStudioPage && (
            <Link to="/" className="logo" onClick={handleLogoClick}>
              <ReactSVG src="/svg/logo.svg" />
              <h1>WeShre</h1>
            </Link>
          )}
          <Link to="https://www.weshre.com" target="_blank">What's WeShre</Link>
          <Link to="/cookies/">Cookies</Link>
          <Link to="/terms/">Terms</Link>
          <Link to="/privacy/">Privacy</Link>
        </div>
        <div className="f-content__socials">
          <a href="mailto:info@weshre.com"><ReactSVG src="/svg/socials/email.svg" aria-label="Email" title="Email"/></a>
          <a href="https://be.linkedin.com/company/weshre" aria-label="Linkedin" title="Linkedin" target="_blank"><ReactSVG src="/svg/socials/linkedin.svg" /></a>
          <a href="https://www.instagram.com/we.shre/" aria-label="Instagram" title="Instagram" target="_blank"><ReactSVG src="/svg/socials/instagram.svg" /></a>
          <a href="https://www.facebook.com/weshre/" aria-label="Facebook" title="Facebook" target="_blank"><ReactSVG src="/svg/socials/facebook.svg" /></a>
        </div>
      </div>
    </footer>
  );
}