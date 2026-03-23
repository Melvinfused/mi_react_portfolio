import React, { useEffect, useState } from "react";
import LinkedinBoxFillIcon from "remixicon-react/LinkedinBoxFillIcon";
import "./bio.css";
import portfolioData from "./data/portfolio.json";

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

const ScrambleText = ({ children, speed = 40, delay = 100 }) => {
  const scrambled = useScramble(children, speed, delay);
  return <>{scrambled}</>;
};

// Use data from portfolio.json
const bioData = portfolioData.bio;

const Bio = () => {
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Melvinfused')
      .then(res => res.json())
      .then(data => setGithubUser(data))
      .catch(err => console.error("Error fetching GitHub user:", err));
  }, []);

  const linkedinProfile = bioData.profiles.find(p => p.name.toLowerCase() === 'linkedin');

  return (
    <div className="container">
      <div className="card">
        <h1><ScrambleText>Hi,</ScrambleText></h1>

        <p>{bioData.intro1}</p>
        <p>{bioData.intro2}</p>

        <div className="section-title">
          <ScrambleText>Résumé</ScrambleText>
        </div>
        {bioData.resumeUrl ? (
          <div className="resume-section">
            <a href={bioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-download-resume">
              View Résumé
            </a>
            <a href={bioData.resumeUrl} download="Melvin_Francy_Résumé.pdf" className="btn-download-resume">
              Download PDF
            </a>
          </div>
        ) : (
          <p style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.9em' }}>No résumé available.</p>
        )}

        <div className="section-title">
          <ScrambleText>Profiles</ScrambleText>
        </div>

        <div className="profiles-grid">
          {githubUser && (
            <a href={githubUser.html_url} target="_blank" rel="noopener noreferrer" className="profile-widget">
              <img src={githubUser.avatar_url} alt="GitHub Avatar" className="profile-avatar" />
              <div className="profile-info">
                <span className="profile-name"><ScrambleText>{githubUser.login}</ScrambleText></span>
                <span className="profile-bio">{githubUser.bio || "Software Developer"}</span>
              </div>
            </a>
          )}

          {linkedinProfile && (
            <a href={linkedinProfile.url} target="_blank" rel="noopener noreferrer" className="profile-widget">
              <div className="profile-avatar linkedin-icon-wrapper">
                <LinkedinBoxFillIcon size={34} color="#fff" />
              </div>
              <div className="profile-info">
                <span className="profile-name"><ScrambleText>LinkedIn</ScrambleText></span>
                <span className="profile-bio">Connect with me professionally</span>
              </div>
            </a>
          )}
        </div>

        <div className="section-title" style={{ marginTop: '25px' }}>
          <ScrambleText>Git Contributions</ScrambleText>
        </div>
        <div className="heatmap-container">
          <a href={githubUser ? githubUser.html_url : "https://github.com/Melvinfused"} target="_blank" rel="noopener noreferrer">
            <img
              className="heatmap-img"
              src="https://ghchart.rshah.org/00ffcc/Melvinfused"
              alt="GitHub Contributions Heatmap"
            />
          </a>
        </div>

        <div className="section-title">
          <ScrambleText>Education and Training</ScrambleText>
        </div>
        {bioData.education.map((edu, i) => (
          <p key={i}>
            <strong><span className="date-text"><ScrambleText>{edu.date}</ScrambleText></span></strong><br />
            {edu.institution}<br />
            {edu.degree}
          </p>
        ))}

        <div className="section-title">
          <ScrambleText>Languages</ScrambleText>
        </div>
        <ul className="languages-list">
          {bioData.languages.map((lang, i) => (
            <li key={i}><span className="lang-name">{lang.name}</span> - {lang.level}</li>
          ))}
        </ul>

        <div className="section-title">
          <ScrambleText>Skills</ScrambleText>
        </div>
        <ul className="skills-list">
          {bioData.skills.map((skill, i) => (
            <li key={i}><strong>{skill}</strong></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bio;
