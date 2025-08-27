import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import NewsletterSubscription from "../Components/NewsLetterS/NewsletterSubscription";
import PartnersSection from "../Components/PartnersS/PartnersSection";
import AppointmentForm from "../Components/AppointmentForm/AppointmentForm";

const AppointmentScreen = () => {
  return (
    <>
      <Navbar />
      <AppointmentForm />
      <PartnersSection />
      <NewsletterSubscription />
      <Footer />
    </>
  );
};

export default AppointmentScreen;
