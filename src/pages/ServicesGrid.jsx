import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import NewsletterSubscription from '../Components/NewsLetterS/NewsletterSubscription.jsx';
import AllServicesBanner from '../Components/AllServicesBanner/AllServicesBanner.jsx';
import AutoServicesGrid from '../Components/AutoServGrid/AutoServicesGrid.jsx';


const ServicesGrid = () => (
  <>
    <Navbar />
    <AllServicesBanner /> 
    <AutoServicesGrid />      
    <NewsletterSubscription />
    <Footer />
  </>
);

export default ServicesGrid;
