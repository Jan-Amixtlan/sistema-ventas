
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Dashboard from './Dashboard.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SalesDashboard from '../components/SalesDashboard/SalesDashboard.jsx';
import SalesBenefitsTimeline from '../components/SalesBenefitsTime/SalesBenefitsTimeline.jsx';
import VendorsTable from '../components/VendorsTable/VendorsTable.jsx';
import './HomeScreens.css';

const HomeScreens = () => {
    const [showBenefits, setShowBenefits] = useState(false);

    const handleBenefitsClick = () => {
        setShowBenefits(!showBenefits);
        
        // Scroll suave hacia el componente cuando se abre
        if (!showBenefits) {
            setTimeout(() => {
                const benefitsElement = document.getElementById('benefits-timeline');
                if (benefitsElement) {
                    benefitsElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    };

    return (
        <>
            <Navbar />
            <Hero />
           
            <SalesDashboard />
            
            {/* Tabla de Control de Vendedores */}
            <VendorsTable />
            
            {/* Botón Ver Beneficios del Sistema */}
            <div className="benefits-button-container">
                <button 
                    className={`benefits-button ${showBenefits ? 'active' : ''}`}
                    onClick={handleBenefitsClick}
                >
                    <div className="button-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d={showBenefits 
                                    ? "M19 9l-7 7-7-7" 
                                    : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                } 
                            />
                        </svg>
                    </div>
                    <span>
                        {showBenefits ? 'Ocultar Beneficios' : 'Ver Beneficios del Sistema'}
                    </span>
                </button>
            </div>

            {/* Componente SalesBenefitsTimeline condicional */}
            {showBenefits && (
                <div id="benefits-timeline" className="benefits-timeline-wrapper">
                    <SalesBenefitsTimeline />
                </div>
            )}
            
            <Footer />
        </>
    );
}

export default HomeScreens;
