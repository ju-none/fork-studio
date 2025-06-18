import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LoginHeaderProps {
  currentView?: 'welcome' | 'signin' | 'signup' | 'complete-profile' ;
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
}

export default function LoginHeader({ currentView, onSignInClick, onSignUpClick }: LoginHeaderProps) {

  const { t } = useTranslation();

  return(
    <header className="welcome-header">

      <Link className="w-[350px] logo m-0" to="/">
        <ReactSVG src="/svg/logo.svg" />
        <h1>WeShre</h1>
      </Link>

      <nav> 
        <Link to="/">Product</Link>
        <Link to="pricing">Pricing</Link>
        <Link to="#about">About us</Link>      
        <Link to="https://studio.weshre.com">WeShre Studio</Link>
      </nav>

      <div className="w-[350px] flex justify-end gap-10">
      {currentView === 'welcome' && (
        <>
          <button
          className="btn-form btn-form--secondary border w-fit sm:px-50 py-10 sm:py-[16px] text-12 hidden sm:flex"
          onClick={onSignUpClick}>
          {t('login.signup')}
          </button>

          <button
            className="btn-form btn-form--primary w-fit sm:px-50 text-12 py-10 sm:py-[16px]"
            onClick={onSignInClick}>
            {t('login.login')}
          </button>
        </>
      )}
      </div>

    </header>
  )
}