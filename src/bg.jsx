import React, { useEffect, useState } from 'react';
import './bg.css';

const Bg = () => {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRotate(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="background">
      <div className={`indicator-wrapper ${rotate ? 'rotate' : ''}`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="indicator" key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default Bg;
