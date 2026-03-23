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

const skillConfig = {
    "Python": { bg: "3776AB", logo: "python", color: "white" },
    "C#": { bg: "239120", logo: "csharp", color: "white" },
    "PHP": { bg: "777BB4", logo: "php", color: "white" },
    "Bash": { bg: "4EAA25", logo: "gnubash", color: "white" },
    "Django": { bg: "092E20", logo: "django", color: "white" },
    "MySQL": { bg: "4479A1", logo: "mysql", color: "white" },
    "PostgreSQL": { bg: "4169E1", logo: "postgresql", color: "white" },
    "Redis": { bg: "DC382D", logo: "redis", color: "white" },
    "Git": { bg: "F05032", logo: "git", color: "white" },
    "GitHub": { bg: "181717", logo: "github", color: "white" },
    "Linux": { bg: "FCC624", logo: "linux", color: "black" },
    "Windows": { bg: "0078D6", logo: "windows", color: "white" },
    "Docker": { bg: "2496ED", logo: "docker", color: "white" },
    "Postman": { bg: "FF6C37", logo: "postman", color: "white" },
    "DBeaver": { bg: "382923", logo: "dbeaver", color: "white" },
    "NGINX": { bg: "009639", logo: "nginx", color: "white" },
    "Apache": { bg: "D22128", logo: "apache", color: "white" }
};

const SkillBadge = ({ name }) => {
    const config = skillConfig[name] || { bg: "222222", logo: "", color: "white" };
    // shields.io requires -- to render a literal -
    const safeName = encodeURIComponent(name.replace(/-/g, '--'));
    let url = `https://img.shields.io/badge/-${safeName}-${config.bg}?style=for-the-badge`;
    if (config.logo) {
        url += `&logo=${config.logo}&logoColor=${config.color}`;
    }
    return <img src={url} alt={name} className="skill-badge" />;
};

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
        <div className="tech-skills-grid">
          {certsData.techSkills.map((item, i) => {
            if (item.includes(":")) {
               const [category, skills] = item.split(":");
               const skillList = skills.split(",").map(s => s.trim());
               return (
                   <div key={i} className="skill-category">
                       <h3 className="category-title">{category.trim()}</h3>
                       <div className="badge-grid">
                          {skillList.map(skill => <SkillBadge name={skill} key={skill} />)}
                       </div>
                   </div>
               )
            }
            return (
              <div key={i} className="skill-category">
                  <h3 className="category-title">General</h3>
                  <div className="badge-grid">
                      <SkillBadge name={item.trim()} />
                  </div>
              </div>
            );
          })}
        </div>

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
