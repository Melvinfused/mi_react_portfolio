import React, { useEffect, useState } from "react";
import "./projects.css";

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

const ScrambleText = ({ children, speed = 30, delay = 100 }) => {
  const scrambled = useScramble(children, speed, delay);
  return <>{scrambled}</>;
};

const Projkts = () => {
  return (
    <div className="container">
      <div className="card">
        <h1><ScrambleText >Projects</ScrambleText></h1><br />

        <div className="project-card">
          <h2><ScrambleText >Artist Portfolio Website with Live Show Booking</ScrambleText></h2>
          <p>
            A sleek platform for showcasing an artist's work and managing live event bookings. It features a portfolio gallery, an easy-to-use booking system, and embedded music player. Ideal for musicians, performers, and creatives, it helps connect with fans and organisers, making it simple to schedule gigs and display upcoming shows.
          </p>
        </div>

        <div className="project-card">
          <h2><ScrambleText >Personal Portfolio Website</ScrambleText></h2>
          <p>
            This is basically my space on the web to show off what I’ve been working on. It’s where I put together all my projects, talk a bit about what I do, and list the skills I’ve picked up. Think of it like a digital resume but with more personality—it’s where I can let my work speak for itself. Plus, it makes it easy for anyone interested in collaborating or hiring to get in touch with me directly. It’s my own little corner of the internet.
          </p>
        </div>

        <div className="project-card">
          <h2><ScrambleText >Script to Read Aloud Weather Report</ScrambleText></h2>
          <p>
            My Weather and Air Quality Reader script is a Python tool that provides real-time weather, air quality, and wind updates for Kochi, India. It fetches weather details (temperature, description, wind speed) from OpenWeatherMap and air quality info (AQI) from AQICN. The script then reads this data aloud using gTTS, and plays the audio via Pygame. It can be automated using Windows Task Scheduler or similar tools, making it a convenient hands-free way to stay informed.
          </p>
        </div>

        <div className="project-card">
          <h2><ScrambleText >Intelligent Relocation Service Management System</ScrambleText></h2>
          <p>
            A full-stack application for moving office and home goods. Customers can choose a truck based on size, with pricing calculated using open-source mapping and routing APIs. It takes into account distance, fuel economy, rental rates, and current fuel prices. Ideal for Packers & Movers services looking to optimise logistics and enhance customer experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projkts;
