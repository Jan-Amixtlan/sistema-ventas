import Hero from '../Components/Hero/Hero.jsx';
import Navbar from '../Components/Navbar/Navbar.jsx';
import FeaturesSection from '../Components/SectionF/FeaturesSection.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import AboutSection from '../Components/About/AboutSection.jsx';
import PartnersSection from '../Components/PartnersS/PartnersSection.jsx';
import ServicesSection from '../Components/ServicesS/ServicesSection.jsx';
import ContactBar from '../Components/ContactB/ContactBar.jsx';
import ProcessSteps from '../Components/ProcessS/ProcessSteps.jsx';
import WhyChooseSection from '../Components/ChooseSect/WhyChooseSection.jsx';
import CarTypesSection from '../Components/CarTypesS/CarTypesSection.jsx';
import RecentProjectsSection from '../Components/RecentProjectS/RecentProjectsSection.jsx';
import TestimonialsSection from '../Components/TestimonialS/TestimonialsSection.jsx';
import StatsSection from '../Components/StateS/StatsSection.jsx';
import NewsSection from '../Components/NewsS/NewsSection.jsx';
import NewsletterSubscription from '../Components/NewsLetterS/NewsletterSubscription.jsx';

const HomeScreens = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <FeaturesSection />
            <AboutSection />
            <PartnersSection />
            <ServicesSection />
            <ContactBar />
            <ProcessSteps />
            <WhyChooseSection />
            <CarTypesSection />
            <RecentProjectsSection />
            <TestimonialsSection />
            <StatsSection />
            <NewsSection />
            <NewsletterSubscription />

            <Footer />

        </>

    );
}

export default HomeScreens;
