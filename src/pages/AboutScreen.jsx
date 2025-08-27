import Navbar from "../Components/Navbar/Navbar"
import Footer from "../Components/Footer/Footer"
import AboutSection from "../Components/About/AboutSection"
import FeaturesSection from "../Components/SectionF/FeaturesSection"
import PartnersSection from "../Components/PartnersS/PartnersSection"
import AboutUsBanner from "../Components/AboutBanner/AboutUsBanner"
import WhyChooseUs from "../Components/WhyChooseUsAbout/WhyChooseUs"
import ExpertTechnicians from "../Components/ExpertTechAbout/ExpertTechnicians"

const AboutScreen = () => {
    return (
        <>
            <Navbar />
            <AboutUsBanner />
            <AboutSection /> 
            <FeaturesSection />
            <WhyChooseUs />   
            <ExpertTechnicians />
            <PartnersSection /> 


            <Footer />
        </>
    )
}

export default AboutScreen