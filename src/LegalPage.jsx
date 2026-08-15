import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from './assets/logo.png';

const LegalPage = ({ title, lastUpdated, intro, sections }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('en') ? 'es' : 'en');
  };

  return (
    <div className="app">
      <header className="header container flex justify-between items-center">
        <Link to="/soon">
          <img src={logo} alt="Counselling and Clinical Psychology WA" className="logo" />
        </Link>
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost" onClick={toggleLanguage}>
            {i18n.language.startsWith('en') ? 'Español' : 'English'}
          </button>
        </div>
      </header>

      <main className="py-20">
        <div className="container legal-page">
          <Link to="/soon" className="legal-back">
            <ArrowLeft size={16} /> {t('backToHome')}
          </Link>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-updated">{lastUpdated}</p>
          <p className="legal-intro">{intro}</p>
          {sections.map((section, i) => (
            <section key={i}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center text-muted">
          <p>&copy; {new Date().getFullYear()} Counselling and Clinical Psychology WA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
