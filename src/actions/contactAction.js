export const SUBMIT_CONTACT_FORM = 'SUBMIT_CONTACT_FORM';

export const submitContactForm = (formData) => ({
    type: SUBMIT_CONTACT_FORM,
    payload: formData
  });
  