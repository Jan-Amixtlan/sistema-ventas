import React, { useState } from 'react';
import { contactService } from '../../services/contactService';
import { reviewService } from '../../services/reviewService';
import { servicesService } from '../../services/servicesService';
import { appointmentService } from '../../services/appointmentService';
import { technicianService } from '../../services/technicianService';
import { statsService } from '../../services/statsService';
import { newsletterService } from '../../services/newsletterService';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationSystem from '../NotificationSystem/NotificationSystem';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import './ApiTester.css';


const ApiTester = () => {
    const [activeTest, setActiveTest] = useState('contact');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { notifications, removeNotification, showSuccess, showError } = useNotifications();

    const resetState = () => {
        setResult(null);
        setError(null);
    };

    const handleApiCall = async (apiCall) => {
        setLoading(true);
        resetState();

        try {
            const data = await apiCall();
            setResult(data);
            
            // Show success modal and notification for successful API calls
            setShowSuccessModal(true);
            showSuccess(
                '¡API Test Exitoso!', 
                'La petición se ejecutó correctamente. Revisa los resultados abajo.',
                4000
            );
        } catch (err) {
            setError(err.message || 'Error occurred');
            showError(
                'Error en API Test', 
                'La petición falló. Verifica que tu backend esté corriendo.',
                6000
            );
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Test data
    const testContactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from frontend'
    };

    const testReviewData = {
        title: 'Great Service!',
        name: 'John Doe',
        email: 'john@example.com',
        content: 'This is a test review. The service was excellent!',
        rating: 5
    };
const testAppointmentData = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1234567890',
  service: 'Oil Change',
  date: '2025-01-15',
  time: '10:00',
  message: 'Need an oil change appointment'
};

const crearCita = async () => {
  const result = await appointmentService.createAppointment(testAppointmentData);
  alert(JSON.stringify(result));
};

// En el JSX
<button onClick={crearCita}>Probar crear cita</button>
    const tests = {
        contact: {
            title: 'Contact Form Test',
            methods: [
                {
                    name: 'Send Contact Form (POST)',
                    action: () => handleApiCall(() => contactService.sendContactForm(testContactData))
                },
                {
                    name: 'Get Contact Messages (GET)',
                    action: () => handleApiCall(() => contactService.getContactMessages())
                }
            ]
        },
        reviews: {
            title: 'Reviews Test',
            methods: [
                {
                    name: 'Submit Review (POST)',
                    action: () => handleApiCall(() => reviewService.submitReview(testReviewData))
                },
                {
                    name: 'Get All Reviews (GET)',
                    action: () => handleApiCall(() => reviewService.getReviews())
                }
            ]
        },
        services: {
            title: 'Services Test',
            methods: [
                {
                    name: 'Get All Services (GET)',
                    action: () => handleApiCall(() => servicesService.getServices())
                },
                {
                    name: 'Get Service by ID (GET)',
                    action: () => handleApiCall(() => servicesService.getServiceById(1))
                }
            ]
        },
        appointments: {
            title: 'Appointments Test',
            methods: [
                {
                    name: 'Create Appointment (POST)',
                    action: () => handleApiCall(() => appointmentService.createAppointment(testAppointmentData))
                },
                {
                    name: 'Get Appointments (GET)',
                    action: () => handleApiCall(() => appointmentService.getAppointments())
                }
            ]
        },
        technicians: {
            title: 'Technicians Test',
            methods: [
                {
                    name: 'Get All Technicians (GET)',
                    action: () => handleApiCall(() => technicianService.getTechnicians())
                },
                {
                    name: 'Get Technician by ID (GET)',
                    action: () => handleApiCall(() => technicianService.getTechnicianById(1))
                }
            ]
        },
        stats: {
            title: 'Statistics Test',
            methods: [
                {
                    name: 'Get Stats (GET)',
                    action: () => handleApiCall(() => statsService.getStats())
                }
            ]
        },
        newsletter: {
            title: 'Newsletter Test',
            methods: [
                {
                    name: 'Subscribe to Newsletter (POST)',
                    action: () => handleApiCall(() => newsletterService.subscribe('test@example.com'))
                }
            ]
        }
    };

    return (
        <div className="api-tester">
            <div className="container">
                <div className="tester-header">
                    <h1>API Endpoint Tester</h1>
                    <p>Test your backend endpoints from the frontend</p>
                </div>

                <div className="tester-nav">
                    {Object.keys(tests).map(testKey => (
                        <button
                            key={testKey}
                            className={`nav-button ${activeTest === testKey ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTest(testKey);
                                resetState();
                            }}
                        >
                            {tests[testKey].title}
                        </button>
                    ))}
                </div>

                <div className="test-section">
                    <h2>{tests[activeTest].title}</h2>
                    
                    <div className="test-buttons">
                        {tests[activeTest].methods.map((method, index) => (
                            <button
                                key={index}
                                className="test-button"
                                onClick={method.action}
                                disabled={loading}
                            >
                                {loading ? 'Testing...' : method.name}
                            </button>
                        ))}
                    </div>

                    {/* Show test data being sent */}
                    <div className="test-data">
                        <h3>Test Data Being Sent:</h3>
                        <pre>
                            {activeTest === 'contact' && JSON.stringify(testContactData, null, 2)}
                            {activeTest === 'reviews' && JSON.stringify(testReviewData, null, 2)}
                            {activeTest === 'appointments' && JSON.stringify(testAppointmentData, null, 2)}
                            {activeTest === 'services' && 'No data required for GET requests'}
                            {activeTest === 'technicians' && 'No data required for GET requests'}
                            {activeTest === 'stats' && 'No data required for GET requests'}
                            {activeTest === 'newsletter' && JSON.stringify({email: 'test@example.com'}, null, 2)}
                        </pre>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="loading-section">
                            <div className="spinner"></div>
                            <p>Testing endpoint...</p>
                        </div>
                    )}

                    {/* Success Result */}
                    {result && !loading && (
                        <div className="result-section success">
                            <h3>✅ Success Response:</h3>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}

                    {/* Error Result */}
                    {error && !loading && (
                        <div className="result-section error">
                            <h3>❌ Error Response:</h3>
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                <div className="api-info">
                    <h3>Current API Base URL:</h3>
                    <code>{import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/services/api/v1'}</code>
                    <p className="api-note">
                        Make sure your backend is running on the correct port and the endpoints exist.
                    </p>
                </div>
            </div>
            
            {/* Notification System */}
            <NotificationSystem 
                notifications={notifications} 
                removeNotification={removeNotification} 
            />
            
            {/* Success Animation Modal */}
            <SuccessAnimation
                isVisible={showSuccessModal}
                title="¡Test de API Exitoso!"
                message="La petición se ejecutó perfectamente. Tu backend está funcionando correctamente y la conexión con el frontend está establecida."
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
};

export default ApiTester;
