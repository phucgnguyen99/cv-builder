import { useState } from "react";
import Section from "./components/Section";
import GeneralForm from "./components/GeneralForm";
import EducationForm from "./components/EducationForm";
import ExperienceForm from "./components/ExperienceForm";

function CVPreview({ general, education, experience }) {
  return (
    <div className="card">
      <h2>Preview</h2>

      <section>
        <h3>{general.fullName || "Your Name"}</h3>
        <p>
          {general.email && <span>{general.email}</span>}
          {general.email && general.phone && <span> • </span>}
          {general.phone && <span>{general.phone}</span>}
        </p>
      </section>

      <section>
        <h3>Education</h3>
        {education.length === 0 && <p className="muted">No entries yet.</p>}
        {education.map((e) => (
          <div className="item" key={e.id}>
            <strong>{e.school || "School"}</strong>
            <div>{e.title || "Program/Title"}</div>
            <div className="muted">
              {e.startDate || "Start"} — {e.endDate || "End"}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Experience</h3>
        {experience.length === 0 && <p className="muted">No entries yet.</p>}
        {experience.map((x) => (
          <div className="item" key={x.id}>
            <strong>{x.company || "Company"}</strong>
            <div>{x.position || "Position"}</div>
            <div className="muted">
              {x.startDate || "Start"} — {x.endDate || "End"}
            </div>
            {x.responsibilities && (
              <ul className="bullets">
                {x.responsibilities
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

function App() {
  const [general, setGeneral] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  // Edit mode per section
  const [editGeneral, setEditGeneral] = useState(true);
  const [editEducation, setEditEducation] = useState(true);
  const [editExperience, setEditExperience] = useState(true);

  return (
    <div className="container">
      <header>
        <h1>CV Builder</h1>
        <p className="muted">
          Fill in each section. Click <em>Submit</em> to lock and preview;
          click <em>Edit</em> to make changes again.
        </p>
      </header>

      <main className="grid">
        <div className="left">
          <Section
            title="General Information"
            isEditing={editGeneral}
            onEdit={() => setEditGeneral(true)}
            onSubmit={() => setEditGeneral(false)}
          >
            {editGeneral ? (
              <GeneralForm value={general} onChange={setGeneral} />
            ) : (
              <div className="card">
                <div><strong>{general.fullName || "Your Name"}</strong></div>
                <div>{general.email || "email@example.com"}</div>
                <div>{general.phone || "555-555-5555"}</div>
              </div>
            )}
          </Section>

          <Section
            title="Education"
            isEditing={editEducation}
            onEdit={() => setEditEducation(true)}
            onSubmit={() => setEditEducation(false)}
          >
            <EducationForm
              isEditing={editEducation}
              value={education}
              onChange={setEducation}
            />
          </Section>

          <Section
            title="Experience"
            isEditing={editExperience}
            onEdit={() => setEditExperience(true)}
            onSubmit={() => setEditExperience(false)}
          >
            <ExperienceForm
              isEditing={editExperience}
              value={experience}
              onChange={setExperience}
            />
          </Section>
        </div>

        <div className="right">
          <CVPreview
            general={general}
            education={education}
            experience={experience}
          />
        </div>
      </main>

      <footer className="muted">
        Note: In development, React.StrictMode intentionally double-invokes some
        lifecycle logic to help catch bugs. That’s why you may see duplicate
        console logs; it won’t happen in production.
      </footer>
    </div>
  );
}

export default App;
