import React, { useEffect, useState } from "react";
import "./bio.css";

const useScramble = (text, speed = 40, delay = 100) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノАБВГДЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯअइभमसहഅആഇഈഖഗȺȾĐŋǤȴĦƵɄᚠᚢᚦᚨᚱᚲᚷᚹᛁᛃᛇᛉᛏᛒᛗᛟᛞz0123456789";

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

const Bio = () => {
  return (
    <div className="container">
      <div className="card">
        <h1><ScrambleText>Hi,</ScrambleText></h1>

        <p>
          I’m Melvin Francy, a self-motivated final-year Integrated MCA student with a solid grasp of languages like PHP, Python, C, C#, C++, and JavaScript, along with comfort using Bash and PowerShell command-line interfaces. My foundation spans cloud computing, artificial intelligence, and system maintenance, reinforced by both academic learning and hands-on project experience.
        </p>
        <p>
          I’m passionate about exploring new technologies and enjoy diving into diverse tools and languages, even outside formal settings. I thrive in collaborative, innovation-focused environments and am committed to continuous growth. I look forward to applying my skills meaningfully, contributing to dynamic teams, and expanding my technical horizons.
        </p>

        <div className="section-title">
          <ScrambleText>Profiles</ScrambleText>
        </div>
        <ul className="profiles-list">
          <li>
            <a href="https://www.linkedin.com/in/melvinfrancy" target="_blank" rel="noopener noreferrer">
                LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/Melvinfused" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
          </li>
        </ul>

        <div className="section-title">
          <ScrambleText>Education and Training</ScrambleText>
        </div>
        <p>
          <strong><span className="date-text"><ScrambleText>Expected in July 2025</ScrambleText></span></strong><br />
          De Paul Institute of Science And Technology, Angamaly, Kerala<br />
          Integrated Master of Computer Application (MCA)
        </p>
        <p>
          <strong><span className="date-text"><ScrambleText>March 2020</ScrambleText></span></strong><br />
          Technical Higher Secondary School, Aluva, Kerala<br />
          Plus 2
        </p>
        <p>
          <strong><span className="date-text"><ScrambleText>July 2017</ScrambleText></span></strong><br />
          St. Mary's High School, Aluva, Kerala<br />
          SSLC
        </p>

        <div className="section-title">
          <ScrambleText>Languages</ScrambleText>
        </div>
        <ul className="languages-list">
          <li><span className="lang-name">Malayalam</span> - Native</li>
          <li><span className="lang-name">English</span> - Professional</li>
          <li><span className="lang-name">Hindi</span> - Beginner</li>
        </ul>

        <div className="section-title">
          <ScrambleText>Skills</ScrambleText>
        </div>
        <ul className="skills-list">
          <li><strong>Problem-Solving</strong></li>
          <li><strong>Adaptability</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default Bio;
