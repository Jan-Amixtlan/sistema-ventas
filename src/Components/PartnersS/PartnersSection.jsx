import './PartnersSection.css';

const PartnersSection = () => {
    const partners = [
        {
            id: 1,
            name: "Partner 1",
            img: "https://raw.githubusercontent.com/Jan-Amixtlan/prueba-tecnica-frontend/refs/heads/main/src/assets/logosPartener/img-partner-1.png"
        },
        {
            id: 2,
            name: "Partner 2",
            img: "https://raw.githubusercontent.com/Jan-Amixtlan/prueba-tecnica-frontend/refs/heads/main/src/assets/logosPartener/img-partner-2.png"
        },
        {
            id: 3,
            name: "Partner 3",
            img: "https://raw.githubusercontent.com/Jan-Amixtlan/prueba-tecnica-frontend/refs/heads/main/src/assets/logosPartener/img-partner-3.png"
        },
        {
            id: 4,
            name: "Partner 4",
            img: "https://raw.githubusercontent.com/Jan-Amixtlan/prueba-tecnica-frontend/refs/heads/main/src/assets/logosPartener/img-partner-4.png"
        },
        {
            id: 5,
            name: "Partner 5",
            img: "https://raw.githubusercontent.com/Jan-Amixtlan/prueba-tecnica-frontend/refs/heads/main/src/assets/logosPartener/img-partner-5.png"
        }
    ];

    return (
        <section className="partners-section">
            <div className="partners-container">
                <div className="partners-header">
                    <h2 className="partners-title">
                        TRUSTED BY OUR MILLIONS OF SATISFIED PARTNERS
                    </h2>
                </div>

                <div className="partners-grid">
                    {partners.map((partner) => (
                        <div key={partner.id} className="partner-item">
                            <div className="partner-logo">
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;