import { useState } from 'react';
import FormInput from './FormInput.jsx';
import SuccessMessage from './SuccessMessage.jsx';

const initialFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  course: '',
  gender: '',
  skills: [],
  dateOfBirth: '',
  address: '',
  termsAccepted: false,
};

const courses = [
  'React JS',
  'JavaScript',
  'Node.js',
  'Full Stack Development',
  'Web Development',
];
const availableSkills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

function validateForm(data) {
  const errors = {};

  if (!data.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!data.password) {
    errors.password = 'Please create a password.';
  } else if (data.password.length < 8) {
    errors.password = 'Use at least 8 characters.';
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  const digits = data.phone.replace(/\D/g, '');
  if (!data.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!/^\+?[0-9().\-\s]+$/.test(data.phone.trim()) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Enter a valid phone number (7–15 digits).';
  }
  if (!data.course) errors.course = 'Please select a course.';
  if (!data.gender) errors.gender = 'Please select a gender.';
  if (data.skills.length === 0) errors.skills = 'Select at least one skill.';
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Please select your date of birth.';
  } else if (data.dateOfBirth > getTodayLocal()) {
    errors.dateOfBirth = 'Date of birth cannot be in the future.';
  }
  if (!data.address.trim()) errors.address = 'Please enter your address.';
  if (!data.termsAccepted) errors.termsAccepted = 'Please accept the terms to continue.';

  return errors;
}

function getTodayLocal() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function FieldIcon({ name }) {
  const paths = {
    person: <><circle cx="12" cy="8" r="3.3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    mail: <><rect x="3.5" y="5" width="17" height="14" rx="3" /><path d="m5 7 7 5 7-5" /></>,
    phone: <path d="M7 3.5h3l1.5 4-2 1.5a14 14 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5Z" />,
    course: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 11.5v5c3 2.4 7 2.4 10 0v-5M21 9v7" /></>,
    calendar: <><rect x="4" y="5.5" width="16" height="15" rx="2.5" /><path d="M8 3.5v4m8-4v4M4 10h16" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
  };

  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function StudentForm({ onRegister }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successName, setSuccessName] = useState('');

  function handleFocus() {
    setSuccessName('');
  }

  function validateField(fieldName, value, currentData = formData) {
    const nextData = { ...currentData, [fieldName]: value };
    const fieldErrors = validateForm(nextData);
    setErrors((currentErrors) => {
      const updatedErrors = { ...currentErrors };
      if (fieldErrors[fieldName]) {
        updatedErrors[fieldName] = fieldErrors[fieldName];
      } else {
        delete updatedErrors[fieldName];
      }

      if (fieldName === 'password' && currentData.confirmPassword) {
        if (fieldErrors.confirmPassword) {
          updatedErrors.confirmPassword = fieldErrors.confirmPassword;
        } else {
          delete updatedErrors.confirmPassword;
        }
      }
      return updatedErrors;
    });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' && name !== 'termsAccepted'
      ? checked
        ? [...formData.skills, value]
        : formData.skills.filter((skill) => skill !== value)
      : type === 'checkbox'
        ? checked
        : value;

    const nextData = { ...formData, [name]: nextValue };
    setFormData(nextData);
    setSuccessName('');

    if (errors[name] || (name === 'password' && errors.confirmPassword)) {
      validateField(name, nextValue, formData);
    }
  }

  function handleBlur(event) {
    const { name, value, type, checked } = event.target;
    const currentValue = type === 'checkbox' && name !== 'termsAccepted'
      ? formData.skills
      : type === 'checkbox'
        ? checked
        : value;
    validateField(name, currentValue);
  }

  function handleReset() {
    setFormData({ ...initialFormData });
    setErrors({});
    setSuccessName('');
    setShowPasswords(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setSuccessName('');

    if (Object.keys(validationErrors).length > 0) return;

    const submittedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      gender: formData.gender,
      skills: [...formData.skills],
      dateOfBirth: formData.dateOfBirth,
      address: formData.address.trim(),
    };

    setIsSubmitting(true);
    window.setTimeout(() => {
      onRegister(submittedData);
      handleReset();
      setSuccessName(submittedData.fullName);
      setIsSubmitting(false);
    }, 650);
  }

  const maxDate = getTodayLocal();
  const passwordAction = (
    <button
      className="password-toggle"
      type="button"
      onClick={() => setShowPasswords((visible) => !visible)}
      aria-label={showPasswords ? 'Hide passwords' : 'Show passwords'}
      aria-pressed={showPasswords}
    >
      {showPasswords ? 'Hide' : 'Show'}
    </button>
  );
  const inputProps = {
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return (
    <>
      {successName && <SuccessMessage name={successName} />}
      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="form-section-label"><span>01</span> PERSONAL INFORMATION</div>
        <div className="field-grid">
          <FormInput
            {...inputProps}
            id="fullName"
            label="Full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="e.g. Alex Morgan"
            autoComplete="name"
            icon={<FieldIcon name="person" />}
          />
          <FormInput
            {...inputProps}
            id="email"
            label="Email address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
            icon={<FieldIcon name="mail" />}
          />
          <FormInput
            {...inputProps}
            id="password"
            label="Password"
            type={showPasswords ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            action={passwordAction}
          />
          <FormInput
            {...inputProps}
            id="confirmPassword"
            label="Confirm password"
            type={showPasswords ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
          <FormInput
            {...inputProps}
            id="phone"
            label="Phone number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            icon={<FieldIcon name="phone" />}
          />
          <FormInput
            {...inputProps}
            id="course"
            label="Select course"
            type="select"
            value={formData.course}
            onChange={handleChange}
            error={errors.course}
            placeholder="Choose a course"
            options={courses}
            icon={<FieldIcon name="course" />}
          />
          <FormInput
            {...inputProps}
            id="dateOfBirth"
            label="Date of birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            max={maxDate}
            icon={<FieldIcon name="calendar" />}
          />
          <FormInput
            {...inputProps}
            id="address"
            label="Address"
            type="textarea"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Street, city, and region"
            autoComplete="street-address"
            icon={<FieldIcon name="location" />}
          />
        </div>

        <div className="form-section-label form-section-spaced"><span>02</span> A LITTLE MORE ABOUT YOU</div>
        <div className="option-grid">
          <fieldset className={`choice-group${errors.gender ? ' has-error' : ''}`}>
            <legend className="field-label">Gender<span className="required-mark"> *</span></legend>
            <div className="radio-options">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label className={`choice-pill${formData.gender === gender ? ' is-selected' : ''}`} key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.gender)}
                  />
                  <span className="custom-radio" />
                  {gender}
                </label>
              ))}
            </div>
            {errors.gender && <p className="field-error" role="alert">{errors.gender}</p>}
          </fieldset>

          <fieldset className={`choice-group${errors.skills ? ' has-error' : ''}`}>
            <legend className="field-label">Skills<span className="required-mark"> *</span></legend>
            <div className="skills-options">
              {availableSkills.map((skill) => (
                <label className={`skill-choice${formData.skills.includes(skill) ? ' is-selected' : ''}`} key={skill}>
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.skills)}
                  />
                  <span className="custom-checkbox">
                    <svg viewBox="0 0 12 12" fill="none"><path d="m2 6 2.5 2.5L10 3" /></svg>
                  </span>
                  {skill}
                </label>
              ))}
            </div>
            {errors.skills && <p className="field-error" role="alert">{errors.skills}</p>}
          </fieldset>
        </div>

        <div className={`terms-row${errors.termsAccepted ? ' has-error' : ''}`}>
          <label className="terms-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.termsAccepted)}
            />
            <span className="custom-checkbox">
              <svg viewBox="0 0 12 12" fill="none"><path d="m2 6 2.5 2.5L10 3" /></svg>
            </span>
            <span>I agree to the <strong>Terms and Conditions</strong> and privacy policy.</span>
          </label>
          {errors.termsAccepted && <p className="field-error" role="alert">{errors.termsAccepted}</p>}
        </div>

        <div className="form-actions">
          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><span className="button-spinner" /> Creating your profile…</>
            ) : (
              <>Complete registration <span aria-hidden="true">↗</span></>
            )}
          </button>
          <button className="reset-button" type="button" onClick={handleReset} disabled={isSubmitting}>
            Reset form
          </button>
        </div>
        <p className="form-footnote"><span aria-hidden="true">⌑</span> Your details are kept private and secure.</p>
      </form>
    </>
  );
}

export default StudentForm;
