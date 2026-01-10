import React, { useEffect, useState } from "react";
import Certs from "./cert.jsx";
import Projkts from "./projects.jsx";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import "./ctrls.css";
import Bio from "./bio.jsx";
import BgSound from "./bgsound";
import PowerEdit from "./PowerEdit.jsx";
import { EditProvider } from "./EditContext.jsx";
import clickSound from "./assets/Sounds/click.mp3";
import HomeSound from "./assets/Sounds/Hclick.mp3";

const playClickSound = () => {
  const audio = new Audio(clickSound);
  audio.play();
};

const playHomeSound = () => {
  const audio = new Audio(HomeSound);
  audio.play();
};


const useScramble = (text, speed = 40, delay = 100, intervalTime = 10000) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let scrambleInterval;
    const scrambleText = () => {
      let i = 0;
      const chars = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z + - × ÷ = ≠ < > ≤ ≥ % √ ∞ ± ∑ ∏ $ € £ ¥ ₹ @ # & * _ ~ ^ | \\ / ( ) [ ] { } . , ; : ? ! … ' 0 1 2 3 4 5 6 7 8 9";

      const interval = setInterval(() => {
        if (i <= text.length) {
          const scrambled = text
            .split("")
            .map((char, idx) =>
              idx < i ? char : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("");
          setDisplay(scrambled);
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    };

    const startScrambling = () => {
      setTimeout(scrambleText, delay);
    };

    startScrambling();
    scrambleInterval = setInterval(startScrambling, intervalTime);

    return () => clearInterval(scrambleInterval);
  }, [text, speed, delay, intervalTime]);

  return display;
};


const AboutMe = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
    <Bio />
  </motion.div>
);

const Certifications = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
    <Certs />
  </motion.div>
);

const Projects = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
    <Projkts />
  </motion.div>
);

const CtrlPanelLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCube, setShowCube] = useState(true);

  const routes = ["/", "/about-me", "/certifications", "/projects"];
  const currentIndex = routes.indexOf(location.pathname);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const next = currentIndex + 1;
      if (next < routes.length) {
        routes[next] === "/" ? playHomeSound() : playClickSound(); // play correct sound
        navigate(routes[next]);
      }
    },
    onSwipedRight: () => {
      const prev = currentIndex - 1;
      if (prev >= 0) {
        routes[prev] === "/" ? playHomeSound() : playClickSound(); // play correct sound
        navigate(routes[prev]);
      }
    },
    trackMouse: true,
  });




  const scrambledName = useScramble("Melvin Francy", 45, 400);
  const scrambledRole = useScramble("Tech Enthusiast & Developer", 30, 500);
  const scrambledBio = useScramble("Bio", 50, 400);
  const scrambledCerts = useScramble("Certifications", 35, 550);
  const scrambledProjects = useScramble("Projects", 40, 700);

  return (
    <div className="container" {...swipeHandlers}>

      <div className="left-section">
        {location.pathname === "/" && (
          <>
            <h1 className="name fade-in">{scrambledName}</h1>
            <p className="role fade-in">{scrambledRole}</p>
          </>
        )}

        <nav>
          <ul>
            <li><Link to="/" onClick={playHomeSound} className="dot-link"></Link></li>
            <li>
              <Link to="/about-me" onClick={playClickSound} className={location.pathname === "/about-me" ? "active-link" : ""}>
                <span className="scramble-text">{scrambledBio}</span>
              </Link>
            </li>
            <li>
              <Link to="/certifications" onClick={playClickSound} className={location.pathname === "/certifications" ? "active-link" : ""}>
                <span className="scramble-text">{scrambledCerts}</span>
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={playClickSound} className={location.pathname === "/projects" ? "active-link" : ""}>
                <span className="scramble-text">{scrambledProjects}</span>
              </Link>
            </li>
            <li>
              <BgSound /> {/* ✅ Now aligned as a nav item */}
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
          <Route path="/power-edit" element={<PowerEdit />} />
        </Routes>
      </div>
    </div>
  );
};

const CtrlPanel = () => (
  <Router>
    <EditProvider>
      <CtrlPanelLayout />
    </EditProvider>
  </Router>
);

export default CtrlPanel;
