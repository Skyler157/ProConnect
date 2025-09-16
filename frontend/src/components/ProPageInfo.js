import React from 'react';
import '../styles/ProPageInfo.css';

const ProPageInfo = () => {
    return (
        <div>
            <section className="business-showcase">
                <div className="showcase-item">
                    <i class='fas fa-briefcase'></i>
                    <h2>Showcase your business.</h2>
                    <p>Create one business profile to appear on all ProConnect network sites.</p>
                </div>
                <div className="showcase-item">
                    <i class='fas fa-globe'></i>
                    <h2>Find more customers.</h2>
                    <p>Get consistent, quality leads that match your ZIP codes, services, and budget.</p>
                </div>
                <div className="showcase-item">
                    <i class='fas fa-chart-line'></i>
                    <h2>Drive smart growth.</h2>
                    <p>Use personalized insights and market trends to expand your business.</p>
                </div>
            </section>
        </div>
    );
};

export default ProPageInfo;