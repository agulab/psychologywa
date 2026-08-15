import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MapPin, ArrowRight, User, Check, X, Heart, Shield, ChevronDown, BookHeart, BriefcaseBusiness, HeartHandshake } from 'lucide-react';
import { sendEmail } from './emailService';
import ComingSoon from './ComingSoon';
import logo from './assets/logo.png';

const App = () => (
  <Routes>
    <Route path="/" element={<ComingSoon />} />
    <Route path="/soon" element={<MainSite />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const MainSite = () => {
  const { t, i18n } = useTranslation();
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'couplesForm', 'individualIntake'
  
  // Mobile tab state for Services
  const [activeServiceTab, setActiveServiceTab] = useState('individual');

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('en') ? 'es' : 'en');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header container flex justify-between items-center">
        <img src={logo} alt="Counselling and Clinical Psychology WA" className="logo" />
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost" onClick={toggleLanguage}>
            {i18n.language.startsWith('en') ? 'Español' : 'English'}
          </button>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }} onClick={() => setActiveModal('individualIntake')}>
            {t('bookAppointmentBtn')}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
            <a href="https://maps.app.goo.gl/Ama3MT9mm8c3f3fT6" target="_blank" rel="noopener noreferrer" className="badge hero-location btn-secondary">
              <MapPin className="mr-2 hero-location-icon" size={18} />49 Cedric Street, Stirling, WA 6021
            </a>
            <h1 className="hero-title">
              {i18n.language.startsWith('en') ? 'Counselling & Clinical Psychology WA' : 'Counseloría y Psicología Clínica WA'}
            </h1>
            <p className="hero-subtitle">
              {i18n.language.startsWith('en') ? 
                'We provide expert clinical psychology and counselling for individuals and couples, tailored to your unique needs.' : 
                'Brindamos psicología clínica y asesoramiento experto para individuos y parejas, adaptado a tus necesidades únicas.'}
            </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-light">
        <div className="container">
          <h2 className="section-title">{t('servicesTitle')}</h2>
          
          {/* Mobile Tabs */}
          <div className="md:hidden mobile-tabs-container">
            <button 
              className={`mobile-tab ${activeServiceTab === 'individual' ? 'active' : ''}`} 
              onClick={() => setActiveServiceTab('individual')}
            >
              {t('individualTherapyBtn')}
            </button>
            <button 
              className={`mobile-tab ${activeServiceTab === 'couples' ? 'active' : ''}`} 
              onClick={() => setActiveServiceTab('couples')}
            >
              {t('couplesTherapyBtn')}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Individual Therapy Card */}
            <div className={`card mobile-connected-card ${activeServiceTab !== 'individual' ? 'hidden md:flex' : ''}`}>
              <div className="card-icon"><User size={32} /></div>
              <h3 className="card-title">{t('individualTherapyBtn')}</h3>
              <p className="mb-8 text-muted" style={{ flexGrow: 1 }}>
                {t('indivTherapySubtitle')} {t('indivTherapyIntro')}
              </p>
              <button className="btn btn-primary w-full" onClick={() => setActiveModal('individualIntake')}>
                {t('bookAppointmentBtn')}
              </button>
            </div>

            {/* Couples Therapy Card */}
            <div className={`card mobile-connected-card ${activeServiceTab !== 'couples' ? 'hidden md:flex' : ''}`}>
              <div className="card-icon">
                <div style={{ display: 'flex' }}>
                  <User size={28} />
                  <User size={28} style={{ marginLeft: '-8px' }} />
                </div>
              </div>
              <h3 className="card-title">{t('couplesTherapyTitle')}</h3>
              <p className="mb-4" style={{ fontWeight: 600, color: 'var(--primary)' }}>{t('couplesTherapyCost')}</p>
              <p className="mb-8 text-muted" style={{ flexGrow: 1 }}>
                {t('couplesTherapyIntro')}
              </p>
              <button className="btn btn-primary w-full" onClick={() => setActiveModal('couplesForm')}>
                {t('bookAppointmentBtn')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="section-title">{t('ourProfessionals')}</h2>
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            
            {/* Matias */}
            <div className="card">
              <div className="prof-header">
                <img src="/Matias.png" alt="Matías de Ambrosio" className="prof-image" />
                <h3 className="card-title" style={{ color: 'var(--primary)' }}>Matías de Ambrosio</h3>
                <span className="badge mb-4">{t('matiasTitle')}</span>
              </div>
              <p className="mb-4">{t('matiasBio1')}</p>
              <Collapsible
                moreText={t('seeMore')}
                lessText={t('seeLess')}
                extra={
                  <>
                    <div className="mb-4">
                      <strong className="block mb-2">{t('matiasHospitalTitle')}</strong>
                      <p className="text-muted text-sm">{t('matiasHospitalBio')}</p>
                    </div>
                    <div className="mb-4">
                      <strong className="block mb-2">{t('matiasAcademicTitle')}</strong>
                      <p className="text-muted text-sm">{t('matiasAcademicBio')}</p>
                    </div>
                    <div className="mb-4">
                      <strong className="block mb-2">{t('matiasCulturalTitle')}</strong>
                      <p className="text-muted text-sm">{t('matiasCulturalBio')}</p>
                    </div>
                  </>
                }
              />
            </div>

            {/* Celeste */}
            <div className="card">
              <div className="prof-header">
                <img src="/Celeste2.jpeg" alt="Celeste Labaronnie" className="prof-image" />
                <h3 className="card-title" style={{ color: 'var(--primary)' }}>Dr. Celeste Labaronnie</h3>
                <span className="badge mb-4">{t('celesteTitle')}</span>
              </div>
              <p className="mb-4">{t('celesteBio1')}</p>
              <Collapsible
                moreText={t('seeMore')}
                lessText={t('seeLess')}
                extra={
                  <>
                    <p className="mb-4 text-muted text-sm">{t('celesteBio2')}</p>
                    <p className="mb-4 text-muted text-sm">{t('celesteBio3')}</p>
                  </>
                }
              />
            </div>

          </div>
        </div>
      </section>

      {/* Fees and Policies */}
      <section className="py-20 bg-light">
        <div className="container">
          <h2 className="section-title">{t('feesRebates')}</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-header">
                <div className="card-icon" style={{ width: 48, height: 48 }}><Shield size={24} /></div>
                <h3 className="mb-0">{t('medicare')}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('medicareText1')}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('medicareText2')}</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-header">
                <div className="card-icon" style={{ width: 48, height: 48 }}><Heart size={24} /></div>
                <h3 className="mb-0">{t('couplesTherapyFees')}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('couplesTherapyFeesText')}</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-header">
                <div className="card-icon" style={{ width: 48, height: 48 }}><HeartHandshake size={24} /></div>
                <h3 className="mb-0">{t('ndisFunding')}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('ndisFundingText1')}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('ndisFundingText2')}</p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-header">
                <div className="card-icon" style={{ width: 48, height: 48 }}><BriefcaseBusiness size={24} /></div>
                <h3 className="mb-0">{t('workCover')}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('workCoverText1')}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('workCoverText2')}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('workCoverText3')}</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-header">
                <div className="card-icon" style={{ width: 48, height: 48 }}><BookHeart size={24} /></div>
                <h3 className="mb-0">{t('privateHealth')}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('privateHealthText1')}</p>
              <ul className="card-list">
                <li>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('privateHealthText2')}</p>
                </li>
                <li>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('privateHealthText3')}</p>
                </li>
              </ul>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('privateHealthText4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center text-muted">
          <img src={logo} alt="Logo" style={{ height: 40, margin: '0 auto 1rem auto', filter: 'grayscale(1)', opacity: 0.5 }} />
          <p>&copy; {new Date().getFullYear()} Counselling and Clinical Psychology WA. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals Rendering */}
      {activeModal && (
        <IntakeForm onClose={closeModal} initialTherapyType={activeModal === 'couplesForm' ? 'couples' : 'individual'} />
      )}

      
    </div>
  );
};

// Reusable Modal Wrapper
const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="close-btn" onClick={onClose}><X size={20} /></button>
      {title && <h2 className="mb-6">{title}</h2>}
      {children}
    </div>
  </div>
);


const Collapsible = ({ extra, moreText, lessText }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className={`collapsible ${expanded ? 'expanded' : ''}`}>
        {extra}
      </div>
      <button
        type="button"
        className="collapsible-toggle"
        onClick={() => setExpanded(!expanded)}
      >
        <span>{expanded ? lessText : moreText}</span>
        <ChevronDown size={16} className={expanded ? 'chevron-open' : ''} />
      </button>
    </div>
  );
};

const IntakeForm = ({ onClose, initialTherapyType = 'individual' }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    therapyType: initialTherapyType,
    medicare: 'no',
    ndis: 'no',
    certificates: 'no',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendEmail('admin@counsellingandclinicalpsychologywa.com.au', form);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('There was an error submitting the form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Modal onClose={onClose}>
        <div className="text-center py-8">
          <div className="card-icon" style={{ margin: '0 auto 1.5rem auto', background: '#dcfce7', color: '#16a34a' }}>
            <Check size={32} />
          </div>
          <h3 className="mb-4">{t('requestSent')}</h3>
          <p className="text-muted">{t('successMessage')}</p>
          <button className="btn btn-primary mt-8" onClick={onClose}>{t('returnHome')}</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={t('intakeFormTitle')} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>{error}</div>}

        <p className="form-label mb-2">{t('therapyType')}</p>
        <div className="flex gap-4 mb-6">
          <label className="form-check flex-1">
            <input type="radio" name="therapyType" className="form-check-input" checked={form.therapyType === 'individual'} onChange={() => setForm({...form, therapyType: 'individual'})} />
            <span className="form-check-label font-medium">{t('individualTherapyBtn')}</span>
          </label>
          <label className="form-check flex-1">
            <input type="radio" name="therapyType" className="form-check-input" checked={form.therapyType === 'couples'} onChange={() => setForm({...form, therapyType: 'couples'})} />
            <span className="form-check-label font-medium">{t('couplesTherapyBtn')}</span>
          </label>
        </div>

        {form.therapyType === 'individual' && (
          <div className="flex flex-col gap-3 mb-6">
            <label className="form-check">
              <input type="checkbox" className="form-check-input" checked={form.medicare === 'yes'} onChange={() => setForm({...form, medicare: form.medicare === 'yes' ? 'no' : 'yes'})} />
              <span className="form-check-label font-medium">{t('hasMedicare')}</span>
            </label>
            <label className="form-check">
              <input type="checkbox" className="form-check-input" checked={form.ndis === 'yes'} onChange={() => setForm({...form, ndis: form.ndis === 'yes' ? 'no' : 'yes'})} />
              <span className="form-check-label font-medium">{t('hasNDIS')}</span>
            </label>
            <label className="form-check">
              <input type="checkbox" className="form-check-input" checked={form.certificates === 'yes'} onChange={() => setForm({...form, certificates: form.certificates === 'yes' ? 'no' : 'yes'})} />
              <span className="form-check-label font-medium">{t('needsReports')}</span>
            </label>
          </div>
        )}

        <input className="form-control mb-4" type="text" placeholder={t('yourNamePlaceholder')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        
        <input className="form-control mb-8" type="email" placeholder={t('emailAddress')} required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />

        <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Sending...' : t('submit')}
        </button>
      </form>
    </Modal>
  );
};

export default App;
