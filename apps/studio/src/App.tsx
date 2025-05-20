import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import StudioLayout from '@/layouts/StudioLayout';

import '@repo/scss/index.scss';
import './assets/scss/_ws-studio.scss';
import WSStudio from './pages/WSStudio';
import WSSServices from './pages/WSSServices';
import Cookies from './pages/Cookies';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';


function App() {

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Application chargée - prête pour le prérendu');
      document.dispatchEvent(new Event('app-rendered'));
    }, 1000); 
    
    return () => clearTimeout(timer);
  }, []);
  return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
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
