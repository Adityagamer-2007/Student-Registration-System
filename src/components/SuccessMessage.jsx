function SuccessMessage({ name }) {
  return (
    <div className="success-message" role="status" aria-live="polite">
      <span className="success-check" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3.2 3.2L15.5 6" /></svg>
      </span>
      <span><strong>You’re registered, {name}!</strong><small>Your student profile has been added below.</small></span>
    </div>
  );
}

export default SuccessMessage;
