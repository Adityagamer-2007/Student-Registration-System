function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  placeholder,
  autoComplete,
  icon,
  options,
  action,
  max,
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const sharedProps = {
    id,
    name: id,
    value,
    onChange,
    onFocus,
    onBlur,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    autoComplete,
    max,
  };

  return (
    <div className={`form-field${error ? ' has-error' : ''}`}>
      <label className="field-label" htmlFor={id}>{label}<span className="required-mark"> *</span></label>
      <div className={`control-wrap${icon ? ' has-icon' : ''}${action ? ' has-action' : ''}`}>
        {icon && <span className="field-icon" aria-hidden="true">{icon}</span>}
        {type === 'select' ? (
          <select {...sharedProps}>
            <option value="">{placeholder}</option>
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        ) : type === 'textarea' ? (
          <textarea {...sharedProps} placeholder={placeholder} rows="3" />
        ) : (
          <input {...sharedProps} type={type} placeholder={placeholder} />
        )}
        {type === 'select' && (
          <span className="select-chevron" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" /></svg>
          </span>
        )}
        {action && <span className="field-action">{action}</span>}
      </div>
      {error && <p className="field-error" id={describedBy} role="alert">{error}</p>}
    </div>
  );
}

export default FormInput;
