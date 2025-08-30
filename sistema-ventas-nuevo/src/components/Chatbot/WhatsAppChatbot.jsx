import React, { useState, useEffect, useRef } from 'react';
import './WhatsAppChatbot.css';

const WhatsAppChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState('initial');
    const [userName, setUserName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
    const messagesEndRef = useRef(null);

    // Número de WhatsApp
    const whatsappNumber = "3326225912";

    const options = [
        'Información sobre servicios',
        'Solicitar cotización',
        'Agendar reunión',
        'Soporte técnico'
    ];

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const addMessage = (message, type = 'bot', delay = 0) => {
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + Math.random(),
                message,
                type,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, delay);
    };

    const startTyping = (delay = 500) => {
        setTimeout(() => {
            setIsTyping(true);
        }, delay);
    };

    const handleOpenChat = () => {
        setIsOpen(true);
        if (messages.length === 0) {
            // Primer mensaje
            startTyping(200);
            addMessage('¡Hola! Soy tu asistente virtual 👋', 'bot', 500);
            
            // Segundo mensaje
            setTimeout(() => {
                startTyping(200);
                addMessage('Estoy aquí para ayudarte con información sobre nuestros servicios de ventas', 'bot', 700);
            }, 1800);
            
            // Tercer mensaje y mostrar input
            setTimeout(() => {
                startTyping(200);
                addMessage('¿Podrías decirme tu nombre?', 'bot', 700);
                setTimeout(() => {
                    setShowNameInput(true);
                }, 1000);
            }, 3500);
        }
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            // Ocultar input inmediatamente
            setShowNameInput(false);
            
            // Agregar mensaje del usuario
            addMessage(userName, 'user');
            
            // Respuesta del bot con opciones
            setTimeout(() => {
                startTyping(200);
                addMessage(`¡Perfecto ${userName}! ¿En qué puedo ayudarte hoy?`, 'bot', 700);
                setTimeout(() => {
                    setShowOptions(true);
                }, 1000);
            }, 800);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
        addMessage(option, 'user');

        // Mensaje de conexión a WhatsApp
        setTimeout(() => {
            startTyping(200);
            addMessage('Te voy a conectar con uno de nuestros especialistas en WhatsApp para brindarte atención personalizada.', 'bot', 700);
            
            setTimeout(() => {
                startTyping(200);
                addMessage('¿Te parece bien continuar la conversación por WhatsApp?', 'bot', 700);
                setTimeout(() => {
                    setShowWhatsAppButton(true);
                }, 1000);
            }, 1500);
        }, 500);
    };

    const handleWhatsAppRedirect = () => {
        let whatsappMessage = `Hola! Soy ${userName}. `;

        switch (selectedOption) {
            case '🔧 Servicios de Reparación':
                whatsappMessage += 'Me gustaría obtener más información sobre sus servicios de reparación automotriz.';
                break;
            case '📅 Agendar Cita':
                whatsappMessage += 'Quisiera agendar una cita para el servicio de mi vehículo.';
                break;
            case '💰 Cotización':
                whatsappMessage += 'Me interesa obtener una cotización para reparaciones de mi auto.';
                break;
            case '❓ Información General':
                whatsappMessage += 'Necesito información general sobre sus servicios automotrices.';
                break;
            default:
                whatsappMessage += 'Me puse en contacto a través del chatbot de su sitio web.';
        }

        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Detectar si es dispositivo móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Para dispositivos móviles: usar wa.me que abre la app nativa
            const mobileUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
            const fallbackUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Intentar abrir la app nativa primero
            window.location.href = mobileUrl;
            
            // Fallback si la app no está instalada
            setTimeout(() => {
                window.open(fallbackUrl, '_blank');
            }, 2000);
            
        } else {
            // Para computadoras: usar WhatsApp Web
            const webUrl = `https://web.whatsapp.com/send?phone=52${whatsappNumber}&text=${encodedMessage}`;
            const fallbackUrl = `https://wa.me/52${whatsappNumber}?text=${encodedMessage}`;
            
            try {
                // Intentar WhatsApp Web primero
                const webWindow = window.open(webUrl, '_blank', 'noopener,noreferrer');
                
                // Si no se puede abrir WhatsApp Web, usar fallback
                if (!webWindow || webWindow.closed || typeof webWindow.closed == 'undefined') {
                    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
                }
            } catch (error) {
                // Si hay error, usar el fallback
                window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
            }
        }
    };

    return (
        <div className="whatsapp-chatbot">
            {/* Chat Button */}
            <div
                className={`chat-button ${isOpen ? 'open' : ''}`}
                onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
            >
                <div className="button-icon">
                    {isOpen ? (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                    )}
                </div>

                {!isOpen && (
                    <div className="notification-badge">
                        <span>1</span>
                    </div>
                )}

                {!isOpen && (
                    <div className="chat-preview">
                        <div className="preview-text">¡Hola! ¿Necesitas ayuda?</div>
                    </div>
                )}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="agent-info">
                            <div className="agent-avatar">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="agent-details">
                                <div className="agent-name">Asistente Virtual</div>
                                <div className="agent-status">
                                    <div className="status-dot"></div>
                                    En línea
                                </div>
                            </div>
                        </div>

                        <button
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.type}`}>
                                {msg.type === 'bot' && (
                                    <div className="message-avatar">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.091 3.091z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="message-content">
                                    {msg.message}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message bot">
                                <div className="message-avatar">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.091 3.091z" />
                                    </svg>
                                </div>
                                <div className="typing-indicator">
                                    <div className="typing-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chat-input">
                        {/* Input para nombre */}
                        {showNameInput && (
                            <form onSubmit={handleNameSubmit} className="name-form">
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Escribe tu nombre..."
                                    className="name-input"
                                    autoFocus
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="send-button"
                                    disabled={userName.trim() === ''}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        )}

                        {/* Opciones de servicio */}
                        {showOptions && (
                            <div className="options-container">
                                <button
                                    className="option-button"
                                    onClick={() => handleOptionSelect("🔧 Servicios de Reparación")}
                                >
                                    🔧 Servicios de Reparación
                                </button>
                                <button
                                    className="option-button"
                                    onClick={() => handleOptionSelect("📅 Agendar Cita")}
                                >
                                    📅 Agendar Cita
                                </button>
                                <button
                                    className="option-button"
                                    onClick={() => handleOptionSelect("💰 Cotización")}
                                >
                                    💰 Cotización
                                </button>
                                <button
                                    className="option-button"
                                    onClick={() => handleOptionSelect("❓ Información General")}
                                >
                                    ❓ Información General
                                </button>
                            </div>
                        )}

                        {/* Botón de WhatsApp */}
                        {showWhatsAppButton && (
                            <div className="whatsapp-redirect">
                                <button
                                    className="whatsapp-button"
                                    onClick={handleWhatsAppRedirect}
                                >
                                    <svg fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                    Continuar en WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatsAppChatbot;