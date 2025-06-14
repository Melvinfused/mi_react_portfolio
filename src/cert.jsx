import React, { useEffect, useState } from "react";
import "./cert.css";

// Scramble hook
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

const ScrambleText = ({ children, speed, delay }) => {
  const scrambled = useScramble(children, speed, delay);
  return <>{scrambled}</>;
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
          <li>
          •{" "}<a
              href="https://www.linkedin.com/learning/certificates/ace5594ca7bf4da20addc125787808fe1906304f4966fce8659fe92afb372a1d"
              target="_blank"
              rel="noopener noreferrer"
            >
              Career Essentials in Generative AI
            </a>
            , Microsoft & LinkedIn (2023)
          </li>
          <li>
          •{" "}<a
              href="https://www.credly.com/badges/6194a241-a84f-4249-8477-d6e03ccb2459/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              LFS101: Introduction to Linux
            </a>
            , The Linux Foundation (2024)
          </li>
          <li>
          •{" "}<a
              href="https://www.credly.com/badges/6250dc1b-9072-498d-bb14-2405ddbd76bd/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Python Essentials 1
            </a>
            , Cisco (2024)
          </li>
          <li>
          •{" "}<a
              href="https://www.credly.com/badges/f571ea2e-62eb-4b3b-81e7-c9b2a0f56eac/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Operating Systems Basics
            </a>
            , Cisco (2024)
          </li>
          <li>
          •{" "}<a
              href="https://www.credly.com/badges/f8608d4b-0dc0-48e1-aa2f-d497aa0577d5/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Computer Hardware Basics
            </a>
            , Cisco (2024)
          </li>
        </ul>

        <div className="section-title">
          <ScrambleText>Technical Skills</ScrambleText>
        </div>
        <ul className="skills-list">
          <li>Web Development</li>
          <li>Python</li>
          <li>C#</li>
          <li>Cloud Computing</li>
          <li>Technical Troubleshooting</li>
          <li>Hardware Maintenance</li>
          <li>Operating Systems</li>
          <li>Computer Networks</li>
          <li>Artificial Intelligence</li>
        </ul>

        <div className="section-title">
          <ScrambleText>Badges</ScrambleText>
        </div>
        <div className="badges-slider">
          <div className="badges-track">
            {badgeImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Badge ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certs;
