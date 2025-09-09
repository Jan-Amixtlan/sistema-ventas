import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomeScreens from './pages/HomeScreens.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import { useEffect } from 'react'; // ✅ Importar useEffect

function App() {
  // ✅ Efecto para detectar iframe y forzar desktop
  useEffect(() => {
    // Detectar si está en iframe de WordPress
    if (window.self !== window.top) {
      console.log('✅ Detectado en iframe - Forzando vista desktop');
      
      // Forzar vista desktop
      document.body.classList.add('iframe-desktop');
      
      // Crear meta viewport para desktop
      const viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=1200, initial-scale=1.0';
      document.head.appendChild(viewportMeta);
      
      // Ajustar estilos para pantalla completa
      document.body.style.minWidth = '100%';
      document.body.style.minHeight = '100vh';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.documentElement.style.minHeight = '100vh';
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