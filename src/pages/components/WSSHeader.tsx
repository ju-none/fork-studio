import { ReactSVG } from "react-svg"
import { Link} from "react-router-dom";
import { useScrollToAnchor } from "../../hooks/useScrollToAnchor";
import { useState, useEffect } from "react";
import i18n, { useComponentTranslation } from "@/i18n";
import { useLanguages } from "../../hooks/Languages";

interface WSSHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WSSHeader({ isMenuOpen, setIsMenuOpen }: WSSHeaderProps) {
  const t = useComponentTranslation('header');
  const { navigateToAnchor, scrollToElement } = useScrollToAnchor();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [language, setLanguage] = useState<string>(() => {
    return (localStorage.getItem('language') || "EN");
  });

  const { switchLanguage } = useLanguages(language, setLanguage, i18n);
  
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
          <ReactSVG src="/svg/logo.svg" />
          <h1>WeShre Studio</h1>
        </Link>
      </div>


      <nav className={`${isMenuOpen ? 'menu-open h-screen' : ''}`}>

        <button className="btn-header btn-close lg:hidden ml-auto mt-25 mb-60"
         onClick={() => {closeMenu();}}
         aria-label="Close menu"
          title="Close menu">
          <ReactSVG src="/svg/closeX.svg" />
        </button>

        <Link className="btn-header" onClick={closeMenu} to="/services/" data-key="Header.services">{t('services')}</Link>

        <button className="btn-header" data-key="Header.about"
          onClick={() => {
            navigateToAnchor('/#about-us', { offset: 10 });
            closeMenu();
          }}>{t('about')}
        </button>

        <Link className="btn-header" onClick={closeMenu} to="https://weshre.com">WeShre</Link>

        <div className="lang-menu">
          <button className="btn-lang" onClick={() => switchLanguage('fr')}>
            {language} <ReactSVG src="/svg/chevron-down.svg" />
          </button>
          <div className="lang-submenu">
            <button  onClick={() => switchLanguage('en')}>EN</button>
            <button  onClick={() => switchLanguage('fr')}>FR</button>
          </div>
        </div>  

        <button
          className="btn-studio w-fit ml-auto mt-60 lg:!hidden"
          onClick={() => {
            scrollToElement('contact', { offset: 40 });
            closeMenu();
          }}>
          <span data-key="Header.discuss">{t('button.discuss')}</span><ReactSVG src="/svg/double-chevron-right.svg" />
        </button>

      </nav>


      <div className="header-right">
        <button
          className="btn-studio !hidden lg:!flex"
          onClick={() => scrollToElement('contact', { offset: 40 })}>
          <span>{t('button.discuss')}</span>
          <ReactSVG src="/svg/double-chevron-right.svg" />
        </button>
        <button
          className="lg:hidden ml-auto btn-burger"
          onClick={toggleMenu}
          aria-label={t('button.open')}
          title={t('button.open')}>
          <ReactSVG src="/svg/burger.svg" />
        </button>
      </div>

    </header>
  )
}