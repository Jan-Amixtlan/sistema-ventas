
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomeScreens from './pages/HomeScreens.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreens />} />
          
          <Route path="/admin" element={<AdminPanel />} />
         {/* <Route path="/about" element={<AboutScreen />} /> */}
         {/* <Route path="/services/grid" element={<ServicesGrid />} />}
          <Route path="/services/list" element={<ServicesList />} />
          <Route path="/services/single" element={<ServicesSingle />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/appointment" element={<AppointmentScreen />} />
          <Route path="/api-test" element={<ApiTester />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
