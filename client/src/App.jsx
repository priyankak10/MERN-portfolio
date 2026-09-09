import { useEffect, useState } from "react";
import { fallbackProfile } from "./portfolioData";

const apiBase = import.meta.env.VITE_API_BASE_URL;

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

  useEffect(() => {
    fetchProfile().then((data) => setProfile(data));
  }, []);

  return (
    <div className="site-shell">
      <header className="hero section-animate">
        <p className="kicker">MERN Portfolio</p>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p className="summary">{profile.summary}</p>
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
