import re

filepath = r'c:\dev\workspace\psychologywa\src\App.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update IndividualIntakeFlow answers state
content = content.replace(
    "medicareNumber: '',",
    "medicareNumber: '',\n    prefLang: '',\n    prefName: '',\n    country: '',\n    gender: '',\n    pronouns: '',"
)

# Update IndividualIntakeFlow rendering
individual_info_old = """<h4 className="mb-4" style={{ color: 'var(--primary)' }}>Personal Information</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required value={answers.firstName} onChange={e => setAnswers({...answers, firstName: e.target.value})} />
            <input className="form-control" placeholder={t('lastName')} required value={answers.lastName} onChange={e => setAnswers({...answers, lastName: e.target.value})} />
            <input className="form-control" placeholder={t('emailAddress')} type="email" required value={answers.email} onChange={e => setAnswers({...answers, email: e.target.value})} />
            <input className="form-control" placeholder={t('phoneNumber')} required value={answers.phone} onChange={e => setAnswers({...answers, phone: e.target.value})} />
            <input className="form-control md:col-span-2" placeholder={t('medicareNumber')} value={answers.medicareNumber} onChange={e => setAnswers({...answers, medicareNumber: e.target.value})} />
          </div>"""

individual_info_new = """<h4 className="mb-4" style={{ color: 'var(--primary)' }}>Personal Information</h4>
          
          <div className="mb-6">
            <h5 className="form-label">Preferred language for the sessions</h5>
            <div className="flex gap-4">
              {['English', 'Spanish', 'Either'].map(opt => (
                <label key={opt} className="form-check flex-1">
                  <input type="radio" name="prefLang" value={opt} className="form-check-input" checked={answers.prefLang === opt} onChange={e => setAnswers({...answers, prefLang: e.target.value})} required/>
                  <span className="form-check-label">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input className="form-control" placeholder={t('firstName')} required value={answers.firstName} onChange={e => setAnswers({...answers, firstName: e.target.value})} />
            <input className="form-control" placeholder={t('lastName')} required value={answers.lastName} onChange={e => setAnswers({...answers, lastName: e.target.value})} />
            <input className="form-control" placeholder="Preferred Name" value={answers.prefName} onChange={e => setAnswers({...answers, prefName: e.target.value})} />
            <input className="form-control" placeholder={t('emailAddress')} type="email" required value={answers.email} onChange={e => setAnswers({...answers, email: e.target.value})} />
            <input className="form-control" placeholder={t('phoneNumber')} required value={answers.phone} onChange={e => setAnswers({...answers, phone: e.target.value})} />
            <input className="form-control" placeholder="Country of Birth" value={answers.country} onChange={e => setAnswers({...answers, country: e.target.value})} />
            
            <select className="form-control" value={answers.gender} onChange={e => setAnswers({...answers, gender: e.target.value})} required>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
            
            <select className="form-control" value={answers.pronouns} onChange={e => setAnswers({...answers, pronouns: e.target.value})} required>
              <option value="" disabled>Select Pronouns</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>

            <input className="form-control md:col-span-2" placeholder={t('medicareNumber')} value={answers.medicareNumber} onChange={e => setAnswers({...answers, medicareNumber: e.target.value})} />
          </div>"""

content = content.replace(individual_info_old, individual_info_new)


# Update CouplesIntakeForm rendering - Client 1
client1_old = """<h4 className="mb-4" style={{ color: 'var(--primary)' }}>1. Client 1 (Primary Contact)</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" name="client1_firstName" placeholder={t('firstName')} required />
          <input className="form-control" name="client1_lastName" placeholder={t('lastName')} required />
          <input className="form-control" name="client1_email" placeholder={t('emailAddress')} type="email" required />
          <input className="form-control" name="client1_phone" placeholder={t('phoneNumber')} required />
        </div>"""

client1_new = """<h4 className="mb-4" style={{ color: 'var(--primary)' }}>1. Client 1 (Primary Contact)</h4>
        
        <div className="mb-6">
          <h5 className="form-label">Preferred language for the sessions</h5>
          <div className="flex gap-4">
            {['English', 'Spanish', 'Either'].map(opt => (
              <label key={`client1_${opt}`} className="form-check flex-1">
                <input type="radio" name="client1_prefLang" value={opt} className="form-check-input" required/>
                <span className="form-check-label">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" name="client1_firstName" placeholder={t('firstName')} required />
          <input className="form-control" name="client1_lastName" placeholder={t('lastName')} required />
          <input className="form-control" name="client1_prefName" placeholder="Preferred Name" />
          <input className="form-control" name="client1_email" placeholder={t('emailAddress')} type="email" required />
          <input className="form-control" name="client1_phone" placeholder={t('phoneNumber')} required />
          <input className="form-control" name="client1_country" placeholder="Country of Birth" />
          
          <select className="form-control" name="client1_gender" defaultValue="" required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Other">Other</option>
          </select>
          
          <select className="form-control" name="client1_pronouns" defaultValue="" required>
            <option value="" disabled>Select Pronouns</option>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Other">Other</option>
          </select>
        </div>"""

content = content.replace(client1_old, client1_new)

# Update CouplesIntakeForm rendering - Client 2
client2_old = """<h4 className="mb-4" style={{ color: 'var(--primary)' }}>2. Client 2</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" name="client2_firstName" placeholder={t('firstName')} />
          <input className="form-control" name="client2_lastName" placeholder={t('lastName')} />
          <input className="form-control" name="client2_email" placeholder={t('emailAddress')} type="email" />
        </div>"""

client2_new = """<h4 className="mb-4" style={{ color: 'var(--primary)' }}>2. Client 2</h4>
        
        <div className="mb-6">
          <h5 className="form-label">Preferred language for the sessions</h5>
          <div className="flex gap-4">
            {['English', 'Spanish', 'Either'].map(opt => (
              <label key={`client2_${opt}`} className="form-check flex-1">
                <input type="radio" name="client2_prefLang" value={opt} className="form-check-input" />
                <span className="form-check-label">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className="form-control" name="client2_firstName" placeholder={t('firstName')} />
          <input className="form-control" name="client2_lastName" placeholder={t('lastName')} />
          <input className="form-control" name="client2_prefName" placeholder="Preferred Name" />
          <input className="form-control" name="client2_email" placeholder={t('emailAddress')} type="email" />
          <input className="form-control" name="client2_phone" placeholder={t('phoneNumber')} />
          <input className="form-control" name="client2_country" placeholder="Country of Birth" />
          
          <select className="form-control" name="client2_gender" defaultValue="">
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Other">Other</option>
          </select>
          
          <select className="form-control" name="client2_pronouns" defaultValue="">
            <option value="" disabled>Select Pronouns</option>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Other">Other</option>
          </select>
        </div>"""

content = content.replace(client2_old, client2_new)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
