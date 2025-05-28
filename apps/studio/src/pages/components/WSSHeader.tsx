import { ReactSVG } from "react-svg"
import { Link} from "react-router-dom";
import { useScrollToAnchor } from "@repo/hooks/useScrollToAnchor";
import { useState, useEffect } from "react";
import i18n from "@/i18n";

interface WSSHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WSSHeader({ isMenuOpen, setIsMenuOpen }: WSSHeaderProps) {
  const { navigateToAnchor, scrollToElement } = useScrollToAnchor();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const switchLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    i18n.changeLanguage(newLang);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  
  return (
    <header className={`${visible ? '' : 'header-hidden'}`}>

      <div className="header-left !z-[4]">
        <Link to="/" className="logo m-0">
          <ReactSVG src="svg/logo.svg" />
          <h1>WeShre Studio</h1>
        </Link>
      </div>

      <nav className={`${isMenuOpen ? 'menu-open h-screen' : ''}`}>

        <button className="btn-header btn-close lg:hidden ml-auto mt-25 mb-60" onClick={() => {closeMenu();}}>
          <ReactSVG src="svg/closeX.svg" />
        </button>

        <Link className="btn-header" onClick={closeMenu} to="/services/">Our services</Link>

        <button className="self-end btn-header" 
          onClick={() => {
            navigateToAnchor('/#about-us', { offset: 10 });
            closeMenu();
          }}>About us
        </button>

        <Link className="btn-header" onClick={closeMenu} to="https://weshre.com">WeShre</Link>

        <button
          className="btn-header"
          onClick={switchLanguage}
          aria-label="Switch language"
        >
          {language === 'en' ? 'EN' : 'FR'}
        </button>

        <button
          className="btn-studio w-fit ml-auto mt-60 lg:!hidden"
          onClick={() => {
            scrollToElement('contact', { offset: 40 });
            closeMenu();
          }}>
          <span>Let's discuss</span><ReactSVG src="svg/double-chevron-right.svg" />
        </button>

      </nav>


      <div className="header-right">
        <button
          className="btn-studio !hidden lg:!flex"
          onClick={() => scrollToElement('contact', { offset: 40 })}>
          <span>Let's discuss</span>
          <ReactSVG src="svg/double-chevron-right.svg" />
        </button>
        <button
          className="lg:hidden ml-auto btn-burger"
          onClick={toggleMenu}>
          <ReactSVG src="svg/burger.svg" />
        </button>
      </div>

    </header>
  )
}