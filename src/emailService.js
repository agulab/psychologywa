import emailjs from '@emailjs/browser';

/**
 * Sends an email using EmailJS.
 *
 * @param {string} recipientEmail - The target email address (e.g. matias@, celeste@, admin@).
 * @param {string} formType - The type of form (e.g. 'Couples Intake', 'Individual Intake').
 * @param {Object} formData - The data collected from the form.
 * @returns {Promise} Resolves when the email is sent successfully.
 */
export const sendEmail = async (recipientEmail, formType, formData) => {
  // You will need to replace these with your actual EmailJS credentials
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  
  // Select the appropriate template based on the form type
  const TEMPLATE_ID = formType === 'Couples Therapy Intake'
    ? import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COUPLES
    : import.meta.env.VITE_EMAILJS_TEMPLATE_ID_INDIVIDUAL;

  // We pass the recipientEmail to the template so EmailJS knows where to send it.
  // In your EmailJS template, you MUST set the "To Email" field to {{to_email}}
  const templateParams = {
    to_email: recipientEmail,
    form_type: formType,
    ...formData,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    console.log('Email successfully sent!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
