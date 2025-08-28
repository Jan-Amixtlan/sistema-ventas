
import Navbar from '../components/Navbar/Navbar.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Dashboard from './Dashboard.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SalesDashboard from '../components/SalesDashboard/SalesDashboard.jsx';



const HomeScreens = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Dashboard />
            <SalesDashboard />
            <Footer />
        </>
    );
}

export default HomeScreens;
