import re
import os

filepath = r'c:\dev\workspace\psychologywa\src\App.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update states
content = re.sub(
    r"const \[activeModal, setActiveModal\] = useState\(null\);.*?const \[individualResult, setIndividualResult\] = useState\(null\);",
    "const [activeModal, setActiveModal] = useState(null); // 'couplesForm', 'individualIntake'",
    content,
    flags=re.DOTALL
)

# 2. Update card buttons
card_btn_pattern = r'<div className="flex gap-4">\s*<button className="btn btn-primary w-full" onClick=\{\(\) => setActiveModal\(\'individualNdis\'\)\} style=\{\{ flex: 1 \}\}>\s*\{t\(\'ndisBtn\'\)\}\s*</button>\s*<button className="btn btn-outline w-full" onClick=\{\(\) => setActiveModal\(\'individualQuiz\'\)\} style=\{\{ flex: 1 \}\}>\s*\{t\(\'noNdisBtn\'\)\}\s*</button>\s*</div>'
card_btn_replacement = """<button className="btn btn-primary w-full" onClick={() => setActiveModal('individualIntake')}>
                {t('bookAppointmentBtn')}
              </button>"""
content = re.sub(card_btn_pattern, card_btn_replacement, content)

# 3. Update Modals rendering
modals_pattern = r'\{\/\* Modals Rendering \*\/\}.*?\{activeModal === \'couplesForm\''
modals_replacement = """{/* Modals Rendering */}
      {activeModal === 'individualIntake' && (
        <IndividualIntakeFlow onClose={closeModal} />
      )}

      {activeModal === 'couplesForm'"""
content = re.sub(modals_pattern, modals_replacement, content, flags=re.DOTALL)

# Delete intakeForm rendering
intake_pattern = r'\{activeModal === \'intakeForm\' && \(\s*<IndividualIntakeForm onClose=\{closeModal\} />\s*\)\}'
content = re.sub(intake_pattern, '', content)


# 4. Extract CouplesIntakeForm and Reusable Modal Wrapper to keep them, replace the rest
modal_wrapper_idx = content.find('// Reusable Modal Wrapper')
couples_form_idx = content.find('const CouplesIntakeForm')
app_export_idx = content.find('export default App;')

# We want to replace everything from Modal Wrapper to the end (excluding CouplesIntakeForm and Modal Wrapper)
# The order is: Modal Wrapper -> IndividualQuiz -> IndividualResult -> CouplesIntakeForm -> IndividualIntakeForm -> export

new_flow = """
const IndividualIntakeFlow = ({ onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ 
    reason: '', 
    diagnosis: '', 
    medicare: '', 
    reports: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    medicareNumber: '',
    emergName: '',
    emergPhone: '',
    emergRel: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (step === 1) {
      if (!answers.reason) return; // Basic validation
      setStep(2);
    } else if (step === 2) {
      if (!answers.medicare) return;
      if (answers.medicare === 'Yes') {
        setStep(4); // Skip formal reports
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      if (!answers.reports) return;
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 4 && answers.medicare === 'Yes') {
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Determine recipient
    let recipient = 'admin@counsellingandclinicalpsychologywa.com.au';
    if (answers.medicare === 'Yes' || 
        answers.reports === 'Yes, I need formal certificates/reports.' || 
        answers.reports === 'Yes, an institution/workplace will be paying for the sessions.' || 
        answers.reports === 'Yes, both apply.') {
      recipient = 'celeste@counsellingandclinicalpsychologywa.com.au';
    }

    try {
      await sendEmail(recipient, 'Individual Therapy Intake', answers);
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
          <h3 className="mb-4">Request Sent</h3>
          <p className="text-muted">{t('successMessage')}</p>
          <button className="btn btn-primary mt-8" onClick={onClose}>Return to Home</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={t('indivTherapyTitle')} onClose={onClose}>
      {step < 4 ? (
        <div>
          {step === 1 && (
            <div className="animate-fade-in">
              <h4 className="mb-2">What is your primary reason for seeking consultation? *</h4>
              <textarea className="form-control mb-4" rows="4" value={answers.reason} onChange={e => setAnswers({...answers, reason: e.target.value})} required></textarea>
              
              <h4 className="mb-2 mt-4">If you have a relevant prior diagnosis you would like to share, please enter it here.</h4>
              <textarea className="form-control mb-4" rows="2" value={answers.diagnosis} onChange={e => setAnswers({...answers, diagnosis: e.target.value})}></textarea>
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
            {step > 1 ? <button className="btn btn-secondary" onClick={handleBack}><ArrowLeft size={16} className="mr-2"/> {t('back')}</button> : <div></div>}
            <button className="btn btn-primary" onClick={handleNext} disabled={(step === 1 && !answers.reason) || (step === 2 && !answers.medicare) || (step === 3 && !answers.reports)}>{t('next')}</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>{error}</div>}
          <h4 className="mb-4" style={{ color: 'var(--primary)' }}>Personal Information</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required value={answers.firstName} onChange={e => setAnswers({...answers, firstName: e.target.value})} />
            <input className="form-control" placeholder={t('lastName')} required value={answers.lastName} onChange={e => setAnswers({...answers, lastName: e.target.value})} />
            <input className="form-control" placeholder={t('emailAddress')} type="email" required value={answers.email} onChange={e => setAnswers({...answers, email: e.target.value})} />
            <input className="form-control" placeholder={t('phoneNumber')} required value={answers.phone} onChange={e => setAnswers({...answers, phone: e.target.value})} />
            <input className="form-control md:col-span-2" placeholder={t('medicareNumber')} value={answers.medicareNumber} onChange={e => setAnswers({...answers, medicareNumber: e.target.value})} />
          </div>

          <h4 className="mb-4" style={{ color: 'var(--primary)' }}>Emergency Contact</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required value={answers.emergName} onChange={e => setAnswers({...answers, emergName: e.target.value})} />
            <input className="form-control" placeholder={t('phoneNumber')} required value={answers.emergPhone} onChange={e => setAnswers({...answers, emergPhone: e.target.value})} />
            <input className="form-control md:col-span-2" placeholder={t('relationshipToYou')} required value={answers.emergRel} onChange={e => setAnswers({...answers, emergRel: e.target.value})} />
          </div>
          
          <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={handleBack}><ArrowLeft size={16} className="mr-2"/> {t('back')}</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : t('submit')}</button>
          </div>
        </form>
      )}
    </Modal>
  );
};
"""

# Now we need to carefully replace the bottom part.
modal_wrapper_idx = content.find('// Reusable Modal Wrapper')
couples_form_idx = content.find('const CouplesIntakeForm')
app_export_idx = content.find('export default App;')

modal_wrapper_code = content[modal_wrapper_idx:content.find('// Quiz Logic')]
couples_form_code = content[couples_form_idx:content.find('const IndividualIntakeForm')]
export_code = content[app_export_idx:]

new_content = content[:modal_wrapper_idx] + modal_wrapper_code + new_flow + '\n' + couples_form_code + export_code

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
