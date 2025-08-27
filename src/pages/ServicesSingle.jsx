import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import NewsletterSubscription from '../Components/NewsLetterS/NewsletterSubscription';
import ServiceSingleBanner from '../Components/ServiceSingleBanner/ServiceSingleBanner';
import EngineMountArticle from '../Components/EngineMountArticle/EngineMountArticle';
import ServiceReviews from '../Components/ServiceReviews/ServiceReviews';
import AddReviewForm from '../Components/AddReviewFormContact/AddReviewForm';

const ServicesSingle = () => (
  <>
    <Navbar />
    <ServiceSingleBanner />
    <EngineMountArticle />
    <ServiceReviews />
    <AddReviewForm />
    
    <NewsletterSubscription />
    <Footer />
  </>
);

export default ServicesSingle;
