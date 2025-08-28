
import Navbar from '../components/Navbar/Navbar.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Dashboard from './Dashboard.jsx';
import './HomeScreens.css';

const HomeScreens = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Dashboard />
        </>
    );
}

export default HomeScreens;
