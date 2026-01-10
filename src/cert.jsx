import React, { useEffect, useState } from "react";
import "./cert.css";
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

const ScrambleText = ({ children, speed, delay }) => {
  const scrambled = useScramble(children, speed, delay);
  return <>{scrambled}</>;
};

// Use data from portfolio.json
const certsData = portfolioData.certs;

const Certs = () => {
  const [badgeImages, setBadgeImages] = useState([]);

  useEffect(() => {
    const images = import.meta.glob("/src/assets/Badges/*.{png,jpg,jpeg,svg}", {
      eager: true,
      import: "default",
    });

    const imageList = Object.values(images);
    setBadgeImages(imageList);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1><ScrambleText>Certifications</ScrambleText></h1>

        <div className="section-title">
          <ScrambleText>Courses & Certifications</ScrambleText>
        </div>
        <ul className="skills-list">
          {certsData.certifications.map((cert, i) => (
            <li key={i}>
              • {cert.link ? (
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  {cert.name}
                </a>
              ) : (
                cert.name
              )}
              , {cert.org} ({cert.year})
            </li>
          ))}
        </ul>

        <div className="section-title">
          <ScrambleText>Technical Skills</ScrambleText>
        </div>
        <ul className="skills-list">
          {certsData.techSkills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>

        <div className="section-title">
          <ScrambleText>Badges</ScrambleText>
        </div>
        <div className="badges-slider">
          <div className="badges-track">
            {badgeImages.map((src, idx) => (
              <img key={`file-${idx}`} src={src} alt={`Badge ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certs;
