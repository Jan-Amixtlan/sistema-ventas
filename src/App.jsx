

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreens from './pages/HomeScreens.jsx';
import AboutScreen from './pages/AboutScreen.jsx';
import ServicesGrid from './pages/ServicesGrid.jsx';
import ServicesList from './pages/ServicesList.jsx';
import ServicesSingle from './pages/ServicesSingle.jsx';
import ContactScreen from './pages/ContactScreen.jsx';
import AppointmentScreen from './pages/AppointmentScreen.jsx';
import ApiTester from './Components/ApiTester/ApiTester.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreens />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/services/grid" element={<ServicesGrid />} />
        <Route path="/services/list" element={<ServicesList />} />
        <Route path="/services/single" element={<ServicesSingle />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/appointment" element={<AppointmentScreen />} />
        <Route path="/api-test" element={<ApiTester />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
