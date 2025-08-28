import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>
                        We Make Your Vehicle <br />
                        <span>In Good Shape</span>
                    </h1>
                    <p>
                        Minim veniam quis nostrud exercitation ullamco laboris nisi
                        ex sed ipsum ea reprehend deritin voluptate.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Learn More</button>
                        <button className="btn btn-secondary">Free Estimate</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
