import Navbar from "../Components/Navbar/Navbar"
import Footer from "../Components/Footer/Footer"
import NewsletterSubscription from "../Components/NewsLetterS/NewsletterSubscription";
import PartnersSection from "../Components/PartnersS/PartnersSection";
import ContactUsBanner from "../Components/ContactUsBanner/ContactUsBanner";
import ContactForm from "../Components/ContactForm/ContactForm";

const ContactScreen = () => {
  return (
    <>
      <Navbar />
      <ContactUsBanner />
      <ContactForm />
      
      <PartnersSection />
      <NewsletterSubscription />
      <Footer />
    </>
  );
};

export default ContactScreen;
