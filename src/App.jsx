import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowRight, User, Users, Check, X, ArrowLeft, Heart, Shield, Sparkles } from 'lucide-react';

const App = () => {
  const { t, i18n } = useTranslation();
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'couplesForm', 'individualQuiz', 'individualNdis', 'individualResult', 'intakeForm'
  const [individualResult, setIndividualResult] = useState(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('en') ? 'es' : 'en');
  };

  const closeModal = () => {
    setActiveModal(null);
    setIndividualResult(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header container flex justify-between items-center">
        <img src="/logo.jpeg" alt="Counselling and Clinical Psychology WA" className="logo" />
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost" onClick={toggleLanguage}>
            {i18n.language.startsWith('en') ? 'Español' : 'English'}
          </button>
          <a href="#services" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
            {t('bookAppointmentBtn')}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container grid md:grid-cols-2 items-center gap-12">
          <div className="animate-slide-up">
            <span className="badge">Perth, WA, Australia</span>
            <h1 className="hero-title">
              {i18n.language.startsWith('en') ? 'A safe space for your healing journey.' : 'Un espacio seguro para tu sanación.'}
            </h1>
            <p className="hero-subtitle">
              {i18n.language.startsWith('en') ? 
                'We provide expert clinical psychology and counselling for individuals and couples, tailored to your unique needs.' : 
                'Brindamos psicología clínica y asesoramiento experto para individuos y parejas, adaptado a tus necesidades únicas.'}
            </p>
            <div className="flex gap-4">
              <a href="#services" className="btn btn-primary">
                {t('exploreServices')} <ArrowRight className="ml-2" size={18} />
              </a>
              <a href="https://maps.google.com/?q=Counselling+and+Clinical+Psychology+WA+Perth" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <MapPin className="mr-2" size={18} /> {t('location')}
              </a>
            </div>
          </div>
          
          <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img src="/phones.jpeg" alt="Emergency Contacts" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-light">
        <div className="container">
          <h2 className="section-title">{t('servicesTitle')}</h2>
          <p className="section-subtitle">
            {t('generalInquiriesText2')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Individual Therapy Card */}
            <div className="card">
              <div className="card-icon"><User size={32} /></div>
              <h3 className="card-title">{t('individualTherapyBtn')}</h3>
              <p className="mb-8 text-muted" style={{ flexGrow: 1 }}>
                {t('indivTherapySubtitle')} {t('indivTherapyIntro')}
              </p>
              <div className="flex gap-4">
                <button className="btn btn-primary w-full" onClick={() => setActiveModal('individualNdis')} style={{ flex: 1 }}>
                  {t('ndisBtn')}
                </button>
                <button className="btn btn-outline w-full" onClick={() => setActiveModal('individualQuiz')} style={{ flex: 1 }}>
                  {t('noNdisBtn')}
                </button>
              </div>
            </div>

            {/* Couples Therapy Card */}
            <div className="card">
              <div className="card-icon"><Users size={32} /></div>
              <h3 className="card-title">{t('couplesTherapyBtn')}</h3>
              <p className="mb-4" style={{ fontWeight: 600, color: 'var(--primary)' }}>{t('couplesTherapyCost')}</p>
              <p className="mb-8 text-muted" style={{ flexGrow: 1 }}>
                {t('couplesTherapyIntro')}
              </p>
              <button className="btn btn-primary w-full" onClick={() => setActiveModal('couplesForm')}>
                {t('requestTimesBtn')}
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
              <img src="/Matias.png" alt="Matías de Ambrosio" className="prof-image" />
              <h3 className="card-title" style={{ color: 'var(--primary)' }}>Matías de Ambrosio</h3>
              <span className="badge mb-4">{t('matiasTitle')}</span>
              <p className="mb-4">{t('matiasBio1')}</p>
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
            </div>

            {/* Celeste */}
            <div className="card">
              <img src="/Celeste2.jpeg" alt="Celeste Labaronnie" className="prof-image" />
              <h3 className="card-title" style={{ color: 'var(--primary)' }}>Celeste Labaronnie</h3>
              <span className="badge mb-4">{t('celesteTitle')}</span>
              <p className="mb-4">{t('celesteBio1')}</p>
              <p className="mb-4 text-muted text-sm">{t('celesteBio2')}</p>
              <p className="mb-4 text-muted text-sm">{t('celesteBio3')}</p>
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
              <div className="card-icon" style={{ width: 48, height: 48 }}><Shield size={24} /></div>
              <h3 className="mb-4">{t('medicare')}</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('medicareText')}</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-icon" style={{ width: 48, height: 48 }}><Heart size={24} /></div>
              <h3 className="mb-4">{t('couplesTherapyFees')}</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('couplesTherapyFeesText')}</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="card-icon" style={{ width: 48, height: 48 }}><Sparkles size={24} /></div>
              <h3 className="mb-4">{t('ndisFunding')}</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t('ndisFundingText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center text-muted">
          <img src="/logo.jpeg" alt="Logo" style={{ height: 40, margin: '0 auto 1rem auto', filter: 'grayscale(1)', opacity: 0.5 }} />
          <p>&copy; {new Date().getFullYear()} Counselling and Clinical Psychology WA. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals Rendering */}
      {activeModal === 'individualNdis' && (
        <Modal title={t('ndisBtn')} onClose={closeModal}>
          <p className="mb-6">{t('ndisFundingText')}</p>
          <div className="flex flex-col gap-4">
            <button className="btn btn-primary" onClick={() => setActiveModal('intakeForm')}>{t('selfManagedPlan')}</button>
            <button className="btn btn-primary" onClick={() => setActiveModal('intakeForm')}>{t('planManagedPlan')}</button>
            <button className="btn btn-primary" onClick={() => setActiveModal('intakeForm')}>{t('agencyManagedPlan')}</button>
          </div>
        </Modal>
      )}

      {activeModal === 'individualQuiz' && (
        <IndividualQuiz 
          onClose={closeModal} 
          onComplete={(result) => {
            setIndividualResult(result);
            setActiveModal('individualResult');
          }} 
        />
      )}

      {activeModal === 'individualResult' && (
        <IndividualResult 
          result={individualResult} 
          onBook={() => setActiveModal('intakeForm')} 
          onClose={closeModal} 
        />
      )}

      {activeModal === 'couplesForm' && (
        <CouplesIntakeForm onClose={closeModal} />
      )}

      {activeModal === 'intakeForm' && (
        <IndividualIntakeForm onClose={closeModal} />
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

// Quiz Logic remains the same, just updated class names if needed
const IndividualQuiz = ({ onClose, onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ reason: '', medicare: '', lang: '', reports: '' });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      if (answers.medicare === 'No' || answers.reports === 'Yes, I need formal certificates/reports.' || answers.reports === 'Yes, both apply.') {
        onComplete('matias');
      } else {
        onComplete('celeste');
      }
    }
  };

  return (
    <Modal title={t('indivTherapyTitle')} onClose={onClose}>
      <p className="mb-6 text-muted">{t('indivTherapyIntro')}</p>
      
      {step === 1 && (
        <div className="animate-fade-in">
          <h4 className="mb-2">{t('q1Title')}</h4>
          <p className="mb-4 text-muted text-sm">{t('q1Subtitle')}</p>
          <textarea className="form-control mb-4" rows="4" value={answers.reason} onChange={e => setAnswers({...answers, reason: e.target.value})}></textarea>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h4 className="mb-4">{t('q2Title')}</h4>
          <div className="flex flex-col gap-2">
            {['Yes', 'No', 'Unsure'].map(opt => (
              <label key={opt} className="form-check">
                <input type="radio" name="medicare" className="form-check-input" checked={answers.medicare === opt} onChange={() => setAnswers({...answers, medicare: opt})} />
                <span className="form-check-label font-medium">{t(`opt${opt}`)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h4 className="mb-4">{t('q3Title')}</h4>
          <div className="flex flex-col gap-2">
            {['English', 'Spanish', 'Either'].map(opt => (
              <label key={opt} className="form-check">
                <input type="radio" name="lang" className="form-check-input" checked={answers.lang === opt} onChange={() => setAnswers({...answers, lang: opt})} />
                <span className="form-check-label font-medium">{t(`opt${opt}`)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in">
          <h4 className="mb-4">{t('q4Title')}</h4>
          <div className="flex flex-col gap-2">
            {[
              { id: 'A', val: 'Yes, I need formal certificates/reports.' },
              { id: 'B', val: 'Yes, an institution/workplace will be paying for the sessions.' },
              { id: 'C', val: 'Yes, both apply.' },
              { id: 'D', val: 'No, neither applies.' }
            ].map(opt => (
              <label key={opt.id} className="form-check">
                <input type="radio" name="reports" className="form-check-input" checked={answers.reports === opt.val} onChange={() => setAnswers({...answers, reports: opt.val})} />
                <span className="form-check-label font-medium">{t(`optQ4${opt.id}`)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
        {step > 1 ? <button className="btn btn-secondary" onClick={() => setStep(step-1)}><ArrowLeft size={16} className="mr-2"/> {t('back')}</button> : <div></div>}
        <button className="btn btn-primary" onClick={handleNext}>{step === 4 ? t('submit') : t('next')}</button>
      </div>
    </Modal>
  );
};

const IndividualResult = ({ result, onBook, onClose }) => {
  const { t } = useTranslation();
  
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        {result === 'matias' ? (
          <div>
            <img src="/Matias.png" alt="Matías de Ambrosio" className="prof-image" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 className="mb-4" style={{ color: 'var(--primary)' }}>{t('recommendationMatiasTitle')}</h2>
            <p className="mb-4 text-left">{t('matiasBio1')}</p>
            <p className="mb-8 text-left text-muted">{t('matiasCulturalBio')}</p>
            <button className="btn btn-primary w-full" style={{ width: '100%' }} onClick={onBook}>{t('bookWithMatias')}</button>
          </div>
        ) : (
          <div>
            <img src="/Celeste2.jpeg" alt="Celeste Labaronnie" className="prof-image" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 className="mb-4" style={{ color: 'var(--primary)' }}>{t('recommendationCelesteTitle')}</h2>
            <p className="mb-4 text-left">{t('celesteBio1')}</p>
            <p className="mb-8 text-left text-muted">{t('celesteBio3')}</p>
            <button className="btn btn-primary w-full" style={{ width: '100%' }} onClick={onBook}>{t('bookWithCeleste')}</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

const CouplesIntakeForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Modal onClose={onClose}>
        <div className="text-center py-8">
          <div className="card-icon" style={{ margin: '0 auto 1.5rem auto', background: '#dcfce7', color: '#16a34a' }}>
            <Check size={32} />
          </div>
          <h3 className="mb-4">Request Sent</h3>
          <p className="text-muted">{t('successMessage')}</p>
          <button className="btn btn-primary mt-8" onClick={onClose}>Return to Home</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Couples Therapy Intake" onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
        <h4 className="mb-4" style={{ color: 'var(--primary)' }}>1. Client 1 (Primary Contact)</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" placeholder={t('firstName')} required />
          <input className="form-control" placeholder={t('lastName')} required />
          <input className="form-control" placeholder={t('emailAddress')} type="email" required />
          <input className="form-control" placeholder={t('phoneNumber')} required />
        </div>

        <h4 className="mb-4" style={{ color: 'var(--primary)' }}>2. Client 2</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" placeholder={t('firstName')} />
          <input className="form-control" placeholder={t('lastName')} />
          <input className="form-control" placeholder={t('emailAddress')} type="email" />
        </div>

        <h4 className="mb-4" style={{ color: 'var(--primary)' }}>3. Session Preference</h4>
        <div className="flex gap-4 mb-8">
           <label className="form-check flex-1"><input type="radio" name="sessPref" className="form-check-input" required/><span className="form-check-label">{t('inPerson')}</span></label>
           <label className="form-check flex-1"><input type="radio" name="sessPref" className="form-check-input" required/><span className="form-check-label">{t('telehealth')}</span></label>
        </div>
        
        <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>{t('submit')}</button>
      </form>
    </Modal>
  );
};

const IndividualIntakeForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Modal onClose={onClose}>
        <div className="text-center py-8">
          <div className="card-icon" style={{ margin: '0 auto 1.5rem auto', background: '#dcfce7', color: '#16a34a' }}>
            <Check size={32} />
          </div>
          <h3 className="mb-4">Request Sent</h3>
          <p className="text-muted">{t('successMessage')}</p>
          <button className="btn btn-primary mt-8" onClick={onClose}>Return to Home</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={t('intakeFormTitle')} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
        <h4 className="mb-4" style={{ color: 'var(--primary)' }}>1. Personal Information</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" placeholder={t('firstName')} required />
          <input className="form-control" placeholder={t('lastName')} required />
          <input className="form-control" placeholder={t('emailAddress')} type="email" required />
          <input className="form-control" placeholder={t('phoneNumber')} required />
          <input className="form-control md:col-span-2" placeholder={t('medicareNumber')} />
        </div>

        <h4 className="mb-4" style={{ color: 'var(--primary)' }}>2. Emergency Contact</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" placeholder={t('firstName')} required />
          <input className="form-control" placeholder={t('phoneNumber')} required />
          <input className="form-control md:col-span-2" placeholder={t('relationshipToYou')} required />
        </div>
        
        <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>{t('submit')}</button>
      </form>
    </Modal>
  );
};

export default App;
