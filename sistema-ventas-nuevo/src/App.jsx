
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreens from './pages/HomeScreens.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreens />} />
       {/* <Route path="/about" element={<AboutScreen />} /> */}
       {/* <Route path="/services/grid" element={<ServicesGrid />} />}
        <Route path="/services/list" element={<ServicesList />} />
        <Route path="/services/single" element={<ServicesSingle />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/appointment" element={<AppointmentScreen />} />
        <Route path="/api-test" element={<ApiTester />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
