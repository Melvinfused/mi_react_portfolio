import React, { useEffect, useState } from "react";
import Certs from "./cert.jsx"; // adjust path if needed
import Projkts from "./projects.jsx";
import { motion } from "framer-motion";


import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./ctrls.css";
import Bio from "./bio.jsx";

// Scramble hook with delay
const useScramble = (text, speed = 40, delay = 100) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノАБВГДЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯअइभमसहഅആഇഈഖഗȺȾĐŋǤȴĦƵɄᚠᚢᚦᚨᚱᚲᚷᚹᛁᛃᛇᛉᛏᛒᛗᛟᛞz0123456789";

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= text.length) {
          const scrambled = text
            .split("")
            .map((char, idx) => (idx < i ? char : chars[Math.floor(Math.random() * chars.length)]))
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

// Glowing Cube Component
const GlowingCube = () => (
  <div className="glowing-cube"></div>
);

// Subpages
const AboutMe = () => (
  <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}>
      <Bio />
    </motion.div></div>
);

const Certifications = () => (
  <div><motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}>
  <Certs />
</motion.div></div>
);

const Projects = () => (
  <div><motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}>
  <Projkts />
</motion.div></div>
);

// Main CtrlPanel Layout
const CtrlPanelLayout = () => {
  const location = useLocation();
  const showNameAndRole = location.pathname === "/";
  const [showCube, setShowCube] = useState(true);

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowCube(false);
    } else {
      setShowCube(true);
    }
  }, [location]);

  const scrambledName = useScramble("Melvin Francy", 45, 400);
  const scrambledRole = useScramble("Tech Enthusiast & Developer", 30, 500);
  const scrambledBio = useScramble("Bio", 45, 900);
  const scrambledCerts = useScramble("Certifications", 45, 600);
  const scrambledProjects = useScramble("Projects", 45, 800);

  return (
    <div className="container">
      {showCube && <GlowingCube />}

      <div className="left-section">
        {showNameAndRole && (
          <>
            <h1 className="name fade-in">{scrambledName}</h1>
            <p className="role fade-in">{scrambledRole}</p>
          </>
        )}
        <nav>
          <ul>
            <li>
              <Link to="/" className="dot-link"></Link>
            </li>
            <li>
              <Link to="/about-me"><span className="scramble-text">{scrambledBio}</span></Link>
            </li>
            <li>
              <Link to="/certifications"><span className="scramble-text">{scrambledCerts}</span></Link>
            </li>
            <li>
              <Link to="/projects"><span className="scramble-text">{scrambledProjects}</span></Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="content-area">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </div>
  );
};

// Final export with Router wrapper
const CtrlPanel = () => (
  <Router>
    <CtrlPanelLayout />
  </Router>
);

export default CtrlPanel;
