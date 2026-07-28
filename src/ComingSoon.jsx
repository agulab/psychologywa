import React from 'react';
import { useTranslation } from 'react-i18next';

const ComingSoon = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(134deg, rgb(107 114 128 / 50%) 0%, #7e63bcd6 100%)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <button
        onClick={() => i18n.changeLanguage(i18n.language.startsWith('en') ? 'es' : 'en')}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: '1px solid var(--border-color, rgba(81,54,137,0.2))',
          borderRadius: '9999px',
          padding: '0.4rem 1rem',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.85rem',
          color: 'var(--text-muted, #6B7280)',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        {i18n.language.startsWith('en') ? 'Español' : 'English'}
      </button>

      <img
        src="/logo.jpeg"
        alt="Counselling and Clinical Psychology WA"
        style={{ height: 80, marginBottom: '2rem', borderRadius: '16px' }}
      />

      <h1 style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        color: 'var(--secondary, #1F2937)',
        margin: 0,
        lineHeight: 1.3
      }}>
        Counselling & Clinical Psychology WA
      </h1>

      <div style={{
        marginTop: '1.5rem',
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
        color: 'var(--text-muted, #6B7280)',
        fontWeight: 400,
        letterSpacing: '0.3em',
        textTransform: 'uppercase'
      }}>
        {i18n.language.startsWith('en') ? 'Coming Soon' : 'Próximamente'}
      </div>

      <div style={{
        marginTop: '3rem',
        width: '2rem',
        height: '2px',
        background: 'var(--primary-light, #7E63BC)',
        opacity: 0.4
      }} />
    </div>
  );
};

export default ComingSoon;
