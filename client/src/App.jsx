import { useEffect, useState } from "react";
import { fallbackProfile } from "./portfolioData";

const apiBase = import.meta.env.VITE_API_BASE_URL;
const resumeSectionId = "resume-library";

function makeResumeLabel(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getResumeFileType(fileName) {
  return fileName.split(".").pop()?.toUpperCase() || "FILE";
}

const resumeAssetModules = import.meta.glob(
  "../assets/resumes/*.{pdf,doc,docx}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const resumeAssets = Object.entries(resumeAssetModules)
  .map(([path, url]) => {
    const fileName = path.split("/").pop() || "Resume";
    return {
      label: makeResumeLabel(fileName),
      fileName,
      url,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

async function fetchProfile() {
  if (!apiBase) return fallbackProfile;

  try {
    const response = await fetch(`${apiBase}/api/profile`);
    if (!response.ok) throw new Error("Failed to fetch profile");
    return await response.json();
  } catch (error) {
    return fallbackProfile;
  }
}

function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [selectedResume, setSelectedResume] = useState(null);
  const resumeFiles = resumeAssets;

  useEffect(() => {
    fetchProfile().then((data) => setProfile(data));
  }, []);

  useEffect(() => {
    if (resumeFiles.length) {
      setSelectedResume((current) => {
        if (current) {
          const stillPresent = resumeFiles.find(
            (item) => item.fileName === current.fileName,
          );
          if (stillPresent) return stillPresent;
        }
        return resumeFiles[0];
      });
    }
  }, [resumeFiles]);

  const resumeUrl = selectedResume?.url || "";
  const selectedExt = selectedResume?.fileName.split(".").pop()?.toLowerCase();
  const canPreview = selectedExt === "pdf";

  const jumpToResumeSection = () => {
    document.getElementById(resumeSectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="site-shell">
      <header className="hero section-animate">
        <p className="kicker">MERN Portfolio</p>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p className="summary">{profile.summary}</p>
        <div className="hero-actions">
          <button
            type="button"
            className="resume-top-btn"
            onClick={jumpToResumeSection}
          >
            Resume
          </button>
        </div>
        <div className="tech-strip">
          {profile.techStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </header>

      <main>
        <section className="cards section-animate delay-1">
          {profile.highlights.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.details}</p>
            </article>
          ))}
        </section>

        <section className="projects section-animate delay-2">
          <div className="section-head">
            <p className="kicker">Selected Work</p>
            <h3>Projects</h3>
          </div>
          <div className="project-grid">
            {profile.projects.map((project) => (
              <article key={project.name} className="project-card">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p className="impact">{project.impact}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section section-animate delay-2">
          <div className="section-head">
            <p className="kicker">Experience</p>
            <h3>Professional Journey</h3>
          </div>
          {profile.experience.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              className="resume-card"
            >
              <h4>{item.role}</h4>
              <p className="meta">
                {item.company} | {item.location} | {item.period}
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="resume-section section-animate delay-3">
          <div className="section-head">
            <p className="kicker">Resume Snapshot</p>
            <h3>Credentials and Impact</h3>
          </div>
          <div className="snapshot-grid">
            <article className="snapshot-card">
              <h4>Contribution Stats</h4>
              <ul>
                {profile.contributionStats.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="snapshot-card">
              <h4>Education</h4>
              <ul>
                {profile.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="snapshot-card">
              <h4>Certifications</h4>
              <ul>
                {profile.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="snapshot-card">
              <h4>Awards</h4>
              <ul>
                {profile.awards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="snapshot-card">
              <h4>Languages</h4>
              <ul>
                {profile.languages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section
          id={resumeSectionId}
          className="resume-section section-animate delay-3"
        >
          <div className="section-head">
            <p className="kicker">Resume Folder</p>
            <h3>Resume Library</h3>
          </div>
          <div className="resume-library">
            <aside className="resume-list-panel">
              <h4>Select a resume file</h4>
              <div className="resume-list">
                {resumeFiles.map((item) => (
                  <button
                    key={item.fileName}
                    type="button"
                    className={`resume-file-btn ${
                      selectedResume?.fileName === item.fileName ? "active" : ""
                    }`}
                    onClick={() => setSelectedResume(item)}
                  >
                    <span className="resume-file-name">{item.label}</span>
                    <span className="resume-file-type">
                      {getResumeFileType(item.fileName)}
                    </span>
                  </button>
                ))}
              </div>
              {selectedResume && (
                <a
                  className="download-resume-btn"
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Selected File
                </a>
              )}
            </aside>

            <article className="resume-preview-panel">
              <h4>Preview</h4>
              {selectedResume ? (
                canPreview ? (
                  <iframe
                    title={`Preview ${selectedResume.label}`}
                    src={resumeUrl}
                    className="resume-preview-frame"
                  />
                ) : (
                  <div className="preview-unavailable">
                    <p>
                      Preview is available for PDF files. Use the download
                      button to open this document.
                    </p>
                  </div>
                )
              ) : (
                <div className="preview-unavailable">
                  <p>No resume file selected.</p>
                </div>
              )}
            </article>
          </div>
        </section>
      </main>

      <footer className="footer section-animate delay-3">
        <h3>Let's build something meaningful.</h3>
        <ul>
          <li>
            <a href={`mailto:${profile.contact.email}`}>
              {profile.contact.email}
            </a>
          </li>
          <li>
            <a href={profile.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
