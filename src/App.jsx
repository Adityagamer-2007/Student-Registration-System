import { useState } from 'react';
import StudentForm from './components/StudentForm.jsx';
import StudentDetails from './components/StudentDetails.jsx';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  function addStudent(student) {
    setStudents((currentStudents) => [
      { ...student, id: `${Date.now()}-${Math.random()}` },
      ...currentStudents,
    ]);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Forma home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 18V8.5a3.5 3.5 0 0 1 7 0V18M5 12h7m0 6V7.5a3.5 3.5 0 0 1 7 0V18" />
            </svg>
          </span>
          <span>forma<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-note">
          <span className="status-dot" />
          Admissions are open
        </div>
      </header>

      <div className="page-content" id="home">
        <section className="intro" aria-labelledby="page-title">
          <div className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1 id="page-title">Make room for <span>what’s next.</span></h1>
          <p>Tell us a little about yourself and we’ll help you find your place.</p>
        </section>

        <div className="content-grid">
          <section className="form-card" aria-labelledby="form-title">
            <div className="card-heading">
              <div>
                <p className="section-kicker">STUDENT ENROLLMENT</p>
                <h2 id="form-title">Create your profile</h2>
                <p className="card-subtitle">A few details, and you’re on your way.</p>
              </div>
              <div className="form-step" aria-label="Step 1 of 1">
                <span>01</span><i /> <span>01</span>
              </div>
            </div>
            <StudentForm onRegister={addStudent} />
          </section>

          <aside className="side-column" aria-label="Registration information">
            <div className="aside-card welcome-card">
              <div className="welcome-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="m4 12 12-6 12 6-12 6-12-6Z" />
                  <path d="M9 15v7c4.2 3.3 9.8 3.3 14 0v-7M28 12v9" />
                </svg>
              </div>
              <p className="section-kicker">A GOOD PLACE TO BEGIN</p>
              <h2>Learn at your own pace.</h2>
              <p>Build practical skills with courses designed around where you want to go.</p>
              <div className="welcome-rule" />
              <div className="welcome-stat">
                <strong>5</strong>
                <span>career-focused courses<br />to choose from</span>
              </div>
            </div>

            <div className="aside-card count-card">
              <div className="count-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20m6.5-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-6.7a3.5 3.5 0 0 1 0 6.8m4 8.9v-1.6a3.4 3.4 0 0 0-2.5-3.3" />
                </svg>
              </div>
              <div>
                <strong>{students.length}</strong>
                <span>{students.length === 1 ? 'student registered' : 'students registered'}</span>
              </div>
              <span className="count-arrow" aria-hidden="true">↗</span>
            </div>
          </aside>
        </div>

        <StudentDetails students={students} />
        <footer className="page-footer">
          <span>FORMA <i>•</i> STUDENT ENROLLMENT</span>
          <span>Your information stays yours.</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
