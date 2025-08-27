// Instrucciones para probar desde la consola del navegador
// Abre las herramientas de desarrollador (F12) y pega estos comandos:

// 1. Probar Contact Service
const testContact = async () => {
    const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message'
    };
    
    try {
        const response = await fetch('http://localhost:8000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        console.log('Contact Response:', result);
    } catch (error) {
        console.error('Contact Error:', error);
    }
};

// 2. Probar Reviews Service
const testReview = async () => {
    const reviewData = {
        title: 'Great Service!',
        name: 'John Doe',
        email: 'john@example.com',
        content: 'This is a test review',
        rating: 5
    };
    
    try {
        const response = await fetch('http://localhost:8000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });
        
        const result = await response.json();
        console.log('Review Response:', result);
    } catch (error) {
        console.error('Review Error:', error);
    }
};

// 3. Probar Services Service (GET)
const testGetServices = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/services');
        const result = await response.json();
        console.log('Services Response:', result);
    } catch (error) {
        console.error('Services Error:', error);
    }
};

// Ejecutar las pruebas:
// testContact();
// testReview();
// testGetServices();
