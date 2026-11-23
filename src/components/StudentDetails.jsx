function StudentDetails({ students }) {
  if (students.length === 0) {
    return (
      <section className="details-section" aria-labelledby="details-title">
        <div className="details-heading">
          <div>
            <p className="section-kicker">YOUR ENROLLMENTS</p>
            <h2 id="details-title">Student details</h2>
          </div>
          <span className="record-count">0 records</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-9 10a9 9 0 0 1 18 0" />
              <path d="M23 8h5m-2.5-2.5v5" />
            </svg>
          </div>
          <strong>Your first registration is waiting.</strong>
          <p>Once you submit the form, your student details will appear here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="details-section" aria-labelledby="details-title">
      <div className="details-heading">
        <div>
          <p className="section-kicker">YOUR ENROLLMENTS</p>
          <h2 id="details-title">Student details</h2>
        </div>
        <span className="record-count">{students.length} {students.length === 1 ? 'record' : 'records'}</span>
      </div>
      <div className="student-list">
        {students.map((student) => (
          <article className="student-card" key={student.id}>
            <div className="student-card-top">
              <div className="student-avatar" aria-hidden="true">
                {student.fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}
              </div>
              <div className="student-identity">
                <h3>{student.fullName}</h3>
                <p>{student.course}</p>
              </div>
              <span className="registered-badge"><i /> Registered</span>
            </div>
            <div className="student-info-grid">
              <div><span>Email address</span><strong>{student.email}</strong></div>
              <div><span>Phone number</span><strong>{student.phone}</strong></div>
              <div><span>Date of birth</span><strong>{student.dateOfBirth}</strong></div>
              <div><span>Gender</span><strong>{student.gender}</strong></div>
              <div className="student-address"><span>Address</span><strong>{student.address}</strong></div>
            </div>
            <div className="student-skills">
              <span>SKILLS</span>
              <div>{student.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StudentDetails;
