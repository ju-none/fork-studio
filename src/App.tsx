import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import StudioLayout from '@/layouts/StudioLayout';

import WSStudio from './pages/WSStudio';
import WSSServices from './pages/WSSServices';
import Cookies from './pages/Cookies';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import i18n from './i18n';


function App() {

  useEffect(() => {
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event('app-rendered'));
    }, 1000); 
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(i18n.language != localStorage.getItem('language')) {
      i18n.changeLanguage(localStorage.getItem('language') || 'en');
    }
  }, []);

  const getBaseName = () => {
    if (window.location.pathname.startsWith("/api")) return "/api";
    return "/";
  };

  return (
        <BrowserRouter basename={getBaseName()}>
          <Routes>
            <Route path="/"element={<StudioLayout />} >
              <Route index element={<WSStudio />} />
              <Route path="services" element={<WSSServices/>}/>
              <Route path="cookies" element={<Cookies/>}/>
              <Route path="privacy" element={<Privacy/>}/>
              <Route path="terms" element={<Terms/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
