import React, { useEffect, useState } from "react";
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
  return (
    <div className="container">
      <div className="card">
        <h1><ScrambleText>Hi,</ScrambleText></h1>

        <p>{bioData.intro1}</p>
        <p>{bioData.intro2}</p>

        <div className="section-title">
          <ScrambleText>Profiles</ScrambleText>
        </div>
        <ul className="profiles-list">
          {bioData.profiles.map((profile, i) => (
            <li key={i}>
              <a href={profile.url} target="_blank" rel="noopener noreferrer">
                {profile.name}
              </a>
            </li>
          ))}
        </ul>

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
