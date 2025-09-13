import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomeScreens from './pages/HomeScreens.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Detectar si está en iframe de WordPress
    if (window.self !== window.top) {
      console.log('✅ Detectado en iframe - Ajustando para pantalla completa');
      
      // ✅ SOLUCIÓN CORRECTA: Ajustar para mobile y desktop
      const adjustViewport = () => {
        if (window.innerWidth <= 768) {
          // Vista mobile: viewport responsive
          document.querySelector('meta[name="viewport"]')?.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        } else {
          // Vista desktop: ancho fijo pero escalable
          document.querySelector('meta[name="viewport"]')?.setAttribute('content', 
            'width=1200, initial-scale=1.0');
        }
      };
      
      // Crear o actualizar meta viewport
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
      }
      
      // Ajustar inicialmente y en redimensionamiento
      adjustViewport();
      window.addEventListener('resize', adjustViewport);
      
      // Ajustar estilos para pantalla completa
      document.body.style.width = '100%';
      document.body.style.minHeight = '100vh';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflowX = 'hidden'; // ✅ Prevenir scroll horizontal
      
      document.documentElement.style.minHeight = '100vh';
      document.documentElement.style.overflowX = 'hidden'; // ✅ Prevenir scroll horizontal
      
      // Limpiar event listener
      return () => window.removeEventListener('resize', adjustViewport);
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreens />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;