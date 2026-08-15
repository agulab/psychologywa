import emailjs from '@emailjs/browser';

/**
 * Sends an email using EmailJS.
 *
 * @param {string} recipientEmail - The target email address (e.g. admin@).
 * @param {Object} formData - The data collected from the form (name, therapyType, medicare, ndis, certificates, workCover, none, email).
 * @returns {Promise} Resolves when the email is sent successfully.
 */
export const sendEmail = async (recipientEmail, formData) => {
  // You will need to replace these with your actual EmailJS credentials
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';

  // We pass the recipientEmail to the template so EmailJS knows where to send it.
  // In your EmailJS template, you MUST set the "To Email" field to {{to_email}}
  const templateParams = {
    to_email: recipientEmail,
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
