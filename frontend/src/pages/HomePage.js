import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome</h1>
        <p className="home-description">
          This is a job portal app which provides you an additional layer of fraud detection
        </p>

        <section className="feature-section">
          <h4 className="section-title">AI & Automation for Fraud Detection</h4>
          <ul className="feature-list">
            <li>Additional layer of fraud detection</li>
            <li>Natural Language Processing (NLP) to detect scam-like job descriptions</li>
            <li>Image recognition for fake company logos (reverse image search)</li>
            <li>Behavioral analysis (e.g., very high salary range in respect to market places)</li>
          </ul>
        </section>

        <section className="feature-section">
          <h4 className="section-title">Applicant Protection Features</h4>
          <ul className="feature-list">
            <li>Secure Application Process</li>
            <li>Warning if a job asks for bank details early</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
