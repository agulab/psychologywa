import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Info, DollarSign, Users, User, X, Check, ArrowLeft } from 'lucide-react';

const App = () => {
  const { t, i18n } = useTranslation();
  const [activeView, setActiveView] = useState('home'); // 'home', 'general', 'fees', 'couples', 'couplesForm', 'individual', 'individualQuiz', 'individualNdis', 'intakeForm'
  const [individualResult, setIndividualResult] = useState(null); // 'matias' or 'celeste'
  
  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const Modal = ({ title, onClose, children }) => (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        {title && <h2 className="mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="container py-16 animate-fade-in">
      <div className="flex-col items-center gap-4 text-center">
        <h1 className="mb-8 text-center" style={{ fontSize: '2.5rem' }}>Counselling and Clinical Psychology WA</h1>
        
        <div className="flex flex-col gap-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <a href="https://maps.google.com/?q=Counselling+and+Clinical+Psychology+WA+Perth" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            <MapPin className="mr-2" /> Location
          </a>
          
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setActiveView('general')}>
            <Info className="mr-2" /> {t('generalInquiries')}
          </button>
          
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setActiveView('fees')}>
            <DollarSign className="mr-2" /> {t('feesRebates')}
          </button>
          
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setActiveView('couples')}>
            <Users className="mr-2" /> {t('couplesTherapyBtn')}
          </button>
          
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setActiveView('individual')}>
            <User className="mr-2" /> {t('individualTherapyBtn')}
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch(activeView) {
      case 'home':
        return <HomeView />;
      case 'general':
        return (
          <Modal title={t('generalInquiries')} onClose={() => setActiveView('home')}>
            <p className="mb-4">{t('generalInquiriesText1')}</p>
            <p className="mb-4">{t('generalInquiriesText2')}</p>
            <p>{t('generalInquiriesText3')}</p>
          </Modal>
        );
      case 'fees':
        return (
          <Modal title={t('feesRebates')} onClose={() => setActiveView('home')}>
            <h3 className="mb-2">{t('medicare')}</h3>
            <p className="mb-4">{t('medicareText')}</p>
            
            <h3 className="mb-2">{t('couplesTherapyFees')}</h3>
            <p className="mb-4">{t('couplesTherapyFeesText')}</p>
            
            <h3 className="mb-2">{t('ndisFunding')}</h3>
            <p className="mb-4">{t('ndisFundingText')}</p>
          </Modal>
        );
      case 'couples':
        return (
          <Modal title={t('couplesTherapyBtn')} onClose={() => setActiveView('home')}>
            <p className="mb-4" style={{ fontWeight: '600', color: 'var(--primary)' }}>{t('couplesTherapyCost')}</p>
            
            <div className="card mb-4" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 className="mb-2">{t('couplesTherapyTitle')}</h3>
                <p className="mb-4">{t('couplesTherapyIntro')}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2">{t('couplesCoreFocusTitle')}</h4>
              <p className="mb-2">{t('couplesCoreFocusText')}</p>
              <ul className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                <li>{t('couplesCoreFocus1')}</li>
                <li>{t('couplesCoreFocus2')}</li>
                <li>{t('couplesCoreFocus3')}</li>
              </ul>

              <h4 className="mb-2">{t('couplesSpecializationTitle')}</h4>
              <p className="mb-2">{t('couplesSpecializationText')}</p>
              <ul className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                <li>{t('couplesSpecialization1')}</li>
                <li>{t('couplesSpecialization2')}</li>
              </ul>
              
              <p className="mb-4"><em>{t('couplesConclusion')}</em></p>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} onClick={() => setActiveView('couplesForm')}>
              {t('requestTimesBtn')}
            </button>
            
            <hr className="mb-4" />
            <h3 className="mb-2">{t('aboutMatias')}</h3>
            <p className="mb-4">{t('matiasBio1')}</p>
            
            <h4 className="mb-2">{t('matiasHospitalTitle')}</h4>
            <p className="mb-4">{t('matiasHospitalBio')}</p>
            
            <h4 className="mb-2">{t('matiasAcademicTitle')}</h4>
            <p className="mb-4">{t('matiasAcademicBio')}</p>
            
            <h4 className="mb-2">{t('matiasCulturalTitle')}</h4>
            <p className="mb-4">{t('matiasCulturalBio')}</p>
          </Modal>
        );
      case 'individual':
        return (
          <Modal title={t('individualTherapyBtn')} onClose={() => setActiveView('home')}>
             <div className="flex flex-col gap-4">
                <button className="btn btn-primary" onClick={() => setActiveView('individualNdis')}>{t('ndisBtn')}</button>
                <button className="btn btn-outline" onClick={() => setActiveView('individualQuiz')}>{t('noNdisBtn')}</button>
             </div>
          </Modal>
        );
      case 'individualNdis':
        return (
          <Modal title={t('ndisBtn')} onClose={() => setActiveView('individual')}>
             <button className="btn btn-secondary mb-4" onClick={() => setActiveView('individual')}><ArrowLeft size={16} className="mr-2"/> {t('back')}</button>
             <div className="flex flex-col gap-4">
                <button className="btn btn-primary" onClick={() => setActiveView('intakeForm')}>{t('selfManagedPlan')}</button>
                <button className="btn btn-primary" onClick={() => setActiveView('intakeForm')}>{t('planManagedPlan')}</button>
                <button className="btn btn-primary" onClick={() => setActiveView('intakeForm')}>{t('agencyManagedPlan')}</button>
             </div>
          </Modal>
        );
      case 'individualQuiz':
        return <IndividualQuiz onClose={() => setActiveView('individual')} onComplete={(result) => {
          setIndividualResult(result);
          setActiveView('individualResult');
        }} />;
      case 'individualResult':
        return <IndividualResult result={individualResult} onBook={() => setActiveView('intakeForm')} onClose={() => setActiveView('home')} />;
      case 'couplesForm':
        return <CouplesIntakeForm onClose={() => setActiveView('couples')} />;
      case 'intakeForm':
        return <IndividualIntakeForm onClose={() => setActiveView('home')} />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="app">
      <div className="emergency-banner">
        <img src="/phones.jpeg" alt="Emergency Contacts" />
      </div>
      
      <header className="header container py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.jpeg" alt="Clinic Logo" className="logo" />
        </div>
        <button className="btn btn-secondary" onClick={toggleLanguage}>
          {i18n.language.startsWith('en') ? 'Español' : 'English'}
        </button>
      </header>
      
      <main>
        {renderActiveView()}
      </main>

      <footer className="container py-8 text-center text-muted" style={{ borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
        <p>&copy; {new Date().getFullYear()} Counselling and Clinical Psychology WA. Perth, WA, Australia.</p>
      </footer>
    </div>
  );
};

// Forms and logic extracted for readability

const IndividualQuiz = ({ onClose, onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ reason: '', medicare: '', lang: '', reports: '' });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      // Logic for recommendation
      // 1. If Medicare is "No" -> recommend Matias
      // 2. If Reports is "Yes..." -> recommend Matias
      // 3. Else -> recommend Celeste
      if (answers.medicare === 'No' || answers.reports === 'Yes, I need formal certificates/reports.' || answers.reports === 'Yes, both apply.') {
        onComplete('matias');
      } else {
        onComplete('celeste');
      }
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <h2 className="mb-4">{t('indivTherapyTitle')}</h2>
        <p className="mb-4">{t('indivTherapyIntro')}</p>
        
        {step === 1 && (
          <div className="animate-fade-in">
            <h4 className="mb-2">{t('q1Title')}</h4>
            <p className="mb-2" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('q1Subtitle')}</p>
            <textarea className="form-control mb-4" rows="3" value={answers.reason} onChange={e => setAnswers({...answers, reason: e.target.value})}></textarea>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h4 className="mb-4">{t('q2Title')}</h4>
            <div className="flex flex-col gap-2 mb-4">
              {['Yes', 'No', 'Unsure'].map(opt => (
                <label key={opt} className="form-check">
                  <input type="radio" name="medicare" className="form-check-input" checked={answers.medicare === opt} onChange={() => setAnswers({...answers, medicare: opt})} />
                  <span className="form-check-label">{t(`opt${opt}`)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h4 className="mb-4">{t('q3Title')}</h4>
            <div className="flex flex-col gap-2 mb-4">
              {['English', 'Spanish', 'Either'].map(opt => (
                <label key={opt} className="form-check">
                  <input type="radio" name="lang" className="form-check-input" checked={answers.lang === opt} onChange={() => setAnswers({...answers, lang: opt})} />
                  <span className="form-check-label">{t(`opt${opt}`)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h4 className="mb-4">{t('q4Title')}</h4>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { id: 'A', val: 'Yes, I need formal certificates/reports.' },
                { id: 'B', val: 'Yes, an institution/workplace will be paying for the sessions.' },
                { id: 'C', val: 'Yes, both apply.' },
                { id: 'D', val: 'No, neither applies.' }
              ].map(opt => (
                <label key={opt.id} className="form-check">
                  <input type="radio" name="reports" className="form-check-input" checked={answers.reports === opt.val} onChange={() => setAnswers({...answers, reports: opt.val})} />
                  <span className="form-check-label">{t(`optQ4${opt.id}`)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? <button className="btn btn-secondary" onClick={() => setStep(step-1)}>{t('back')}</button> : <div></div>}
          <button className="btn btn-primary" onClick={handleNext}>{step === 4 ? t('submit') : t('next')}</button>
        </div>
      </div>
    </div>
  );
};

const IndividualResult = ({ result, onBook, onClose }) => {
  const { t } = useTranslation();
  
  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        {result === 'matias' ? (
          <div>
            <h3 className="mb-4" style={{ color: 'var(--primary)' }}>{t('recommendationMatiasTitle')}</h3>
            <p className="mb-4">{t('matiasBio1')}</p>
            <p className="mb-8">{t('matiasCulturalBio')}</p>
            <button className="btn btn-primary w-full" style={{ width: '100%' }} onClick={onBook}>{t('bookWithMatias')}</button>
          </div>
        ) : (
          <div>
            <h3 className="mb-4" style={{ color: 'var(--primary)' }}>{t('recommendationCelesteTitle')}</h3>
            <p className="mb-4">{t('celesteBio1')}</p>
            <p className="mb-4">{t('celesteBio2')}</p>
            <p className="mb-8">{t('celesteBio3')}</p>
            <button className="btn btn-primary w-full" style={{ width: '100%' }} onClick={onBook}>{t('bookWithCeleste')}</button>
          </div>
        )}
      </div>
    </div>
  );
};

const CouplesIntakeForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="modal-overlay animate-fade-in" onClick={onClose}>
        <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
          <Check size={48} className="mb-4 text-center" style={{ color: 'green', margin: '0 auto' }} />
          <p>{t('successMessage')}</p>
          <button className="btn btn-primary mt-8" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <button className="btn btn-secondary mb-4" onClick={onClose}><ArrowLeft size={16} className="mr-2"/> {t('back')}</button>
        <h2 className="mb-4">Couples Therapy Intake Form</h2>
        
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          <h4 className="mb-4 border-b pb-2">1. Client 1: Personal Information</h4>
          <div className="flex flex-col gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required />
            <input className="form-control" placeholder={t('lastName')} required />
            <input className="form-control" placeholder={t('emailAddress')} type="email" required />
            <input className="form-control" placeholder={t('phoneNumber')} required />
          </div>

          <h4 className="mb-4 border-b pb-2">2. Client 2: Personal Information</h4>
          <div className="flex flex-col gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} />
            <input className="form-control" placeholder={t('lastName')} />
            <input className="form-control" placeholder={t('emailAddress')} type="email" />
          </div>

          <h4 className="mb-4 border-b pb-2">3. Session Preference</h4>
          <div className="flex gap-4 mb-8">
             <label className="form-check"><input type="radio" name="sessPref" className="form-check-input" required/><span className="form-check-label">{t('inPerson')}</span></label>
             <label className="form-check"><input type="radio" name="sessPref" className="form-check-input" required/><span className="form-check-label">{t('telehealth')}</span></label>
          </div>
          
          <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>{t('submit')}</button>
        </form>
      </div>
    </div>
  );
};

const IndividualIntakeForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="modal-overlay animate-fade-in" onClick={onClose}>
        <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
          <Check size={48} className="mb-4 text-center" style={{ color: 'green', margin: '0 auto' }} />
          <p>{t('successMessage')}</p>
          <button className="btn btn-primary mt-8" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <h2 className="mb-4">{t('intakeFormTitle')}</h2>
        
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          <h4 className="mb-4 border-b pb-2">1. Personal Information</h4>
          <div className="flex flex-col gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required />
            <input className="form-control" placeholder={t('lastName')} required />
            <input className="form-control" placeholder={t('emailAddress')} type="email" required />
            <input className="form-control" placeholder={t('phoneNumber')} required />
            <input className="form-control" placeholder={t('medicareNumber')} />
          </div>

          <h4 className="mb-4 border-b pb-2">2. Emergency Contact</h4>
          <div className="flex flex-col gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required />
            <input className="form-control" placeholder={t('phoneNumber')} required />
            <input className="form-control" placeholder={t('relationshipToYou')} required />
          </div>
          
          <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>{t('submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default App;
