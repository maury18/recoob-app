/* eslint-disable no-useless-escape */
/* eslint-disable no-use-before-define */
// Variables
const form = document.querySelector('#form');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const btnSubmit = document.querySelector('#submit');

// Regular expression for emails
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

// All eventListeners
function eventListeners() {
  // StartingApp
  document.addEventListener('DOMContentLoaded', startApp);

  // Form fields
  email.addEventListener('blur', formValidation);
  message.addEventListener('blur', formValidation);
}

// Send email
form.addEventListener('submit', sendEmail);

// Functions
function startApp() {
  btnSubmit.disabled = true;
  btnSubmit.classList.add('btn-disabled');
}

// Form validation
function formValidation(e) {
  if (e.target.value.length > 0) {
    // console.log('Si hay algo');
    const error = document.querySelector('.error');
    if (error) {
      error.remove();
    }
    e.target.classList.remove('invalid-form');
    e.target.classList.add('valid-form');
  } else {
    e.target.classList.add('invalid-form');
    // console.log('no hay nada');
    showError('El email y mensaje son campos requeridos');
  }
  // Email validation
  if (e.target.type === 'email') {
    if (er.test(e.target.value)) {
      const error = document.querySelector('.error');
      if (error) {
        error.remove();
      }
      e.target.classList.remove('invalid-form');
      e.target.classList.add('valid-form');
    } else {
      e.target.classList.remove('valid-form');
      e.target.classList.add('invalid-form');
      showError('Email inválido');
    }
  }

  if (er.test(email.value)) {
    btnSubmit.disabled = false;
    btnSubmit.classList.remove('btn-disabled');
  } else {
    startApp();
  }
}

function showError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.classList.add('email-field-required', 'error');
  const errors = document.querySelectorAll('.error');
  if (errors.length === 0) {
    form.appendChild(errorMessage);
  }
}

// Send the email
function sendEmail(e) {
  e.preventDefault();
  // Show spinner
  const spinner = document.querySelector('.spinner');
  spinner.style.display = 'flex';
  // Close the spinner after 3 seconds
  setTimeout(() => {
    spinner.style.display = 'none';
    // Message for email sent
    const paragraph = document.createElement('p');
    paragraph.textContent = 'El mensaje se envió correctamente';
    paragraph.classList.add('form-paragraph');
    // Inserta el párrafo antes del spinner
    form.insertBefore(paragraph, spinner);
    setTimeout(() => {
      paragraph.remove(); // Eliminar el mensaje de éxito
      resetForm();
    }, 5000);
  }, 3000);
}

// Reset form function
function resetForm() {
  form.reset();
  startApp();
}