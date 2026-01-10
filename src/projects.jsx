import React, { useEffect, useState } from "react";
import "./projects.css";
import portfolioData from "./data/portfolio.json";

// Scramble hook
const useScramble = (text, speed = 40, delay = 100) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const chars =
      "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z + - × ÷ = ≠ < > ≤ ≥ % √ ∞ ± ∑ ∏ $ € £ ¥ ₹ @ # & * _ ~ ^ | \\ / ( ) [ ] { } . , ; : ? ! … ' 0 1 2 3 4 5 6 7 8 9";

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= text.length) {
          const scrambled = text
            .split("")
            .map((char, idx) =>
              idx < i
                ? char
                : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("");
          setDisplay(scrambled);
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => clearTimeout(start);
  }, [text, speed, delay]);

  return display;
};

const ScrambleText = ({ children, speed = 30, delay = 100 }) => {
  const scrambled = useScramble(children, speed, delay);
  return <>{scrambled}</>;
};

// Use data from portfolio.json
const projectsData = portfolioData.projects;

const Projkts = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1><ScrambleText>Projects</ScrambleText></h1><br />

        {projectsData.map((project, i) => (
          <div
            key={i}
            className="project-card clickable"
            onClick={() => openModal(project)}
          >
            <h2>
              <ScrambleText>{project.title}</ScrambleText>
            </h2>
            <p>{project.description}</p>
            <span className="read-more">Click to read more →</span>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{selectedProject.title}</h2>
            <div className="modal-content">
              <p>{selectedProject.details || selectedProject.description}</p>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projkts;
