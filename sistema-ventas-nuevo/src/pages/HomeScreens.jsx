
import Navbar from '../components/Navbar/Navbar.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Dashboard from './Dashboard.jsx';
import Footer from '../components/Footer/Footer.jsx';



const HomeScreens = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Dashboard />
            <Footer />
        </>
    );
}

export default HomeScreens;
