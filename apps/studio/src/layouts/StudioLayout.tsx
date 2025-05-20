import ScrollToTop from "@repo/hooks/ScrollToTop";
import { Outlet } from 'react-router-dom';
import WelcomeFooter from "@weshre/pages/components/WelcomeFooter"
import WSSHeader from "@/pages/components/WSSHeader";
import { useState } from "react";


export default function StudioLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
        <>
        <div className={`page-studio ${isMenuOpen ? 'menu-open' : ''}` }>
          <div className={`${isMenuOpen ? 'backdrop-mobile' : 'hidden'} `}></div>
          <ScrollToTop />
          <WSSHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            <Outlet />
          <WelcomeFooter />
        </div>
        </>

  );
}