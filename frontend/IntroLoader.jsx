import React, { useState, useEffect } from 'react';
import './IntroLoader.css';

export default function IntroLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(1); // 1: Compteur/Voiture, 2: Itachi/Sharingan, 3: Course

  // 1. Gestion du compteur de 0% à 100%
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 2, 100)); // Vitesse d'accélération
      }, 30); // 30ms par step
      return () => clearTimeout(timer);
    } else {
      // Dès qu'on atteint 100%, passage à la Phase 2 (Itachi)
      setTimeout(() => setPhase(2), 400);
    }
  }, [progress]);

  // 2. Gestion des enchaînements de phases
  useEffect(() => {
    if (phase === 2) {
      // Reste 3 secondes sur l'ambiance Itachi / Sharingan
      const timer = setTimeout(() => setPhase(3), 3200);
      return () => clearTimeout(timer);
    } else if (phase === 3) {
      // La course dure 2.5 secondes puis bascule sur le site principal
      const timer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, onFinish]);

  return (
    <div className="intro-overlay">
      
      {/* PHASE 1 : COMPTEUR + VOITURES */}
      {phase === 1 && (
        <div className="phase-container phase-1">
          <h2 className="loader-title">INITIALISATION D'AUTOCHAIN...</h2>
          
          <div className="car-track">
            <div className="car-icon" style={{ left: ${progress}% }}>
              🏎️ 💨
            </div>
          </div>

          <div className="percentage-text">{progress}%</div>
        </div>
      )}

      {/* PHASE 2 : ITACHI & LE SHARINGAN (LA RACINE) */}
      {phase === 2 && (
        <div className="phase-container phase-2 animate-fade-in">
          <div className="sharingan-eye">
            <div className="sharingan-pupil"></div>
            <div className="tomoe tomoe-1"></div>
            <div className="tomoe tomoe-2"></div>
            <div className="tomoe tomoe-3"></div>
          </div>

          <h1 className="itachi-quote">
            "BIENVENUE DANS LE MONDE DE LA RACINE."
          </h1>
          <p className="itachi-subtext">— Itachi Uchiha —</p>
        </div>
      )}

      {/* PHASE 3 : COURSE DE TRANSITION FAST & FURIOUS */}
      {phase === 3 && (
        <div className="phase-container phase-3">
          <div className="speed-lines"></div>
          <div className="racing-cars">
            <div className="racing-car car-1">🏎️💨</div>
            <div className="racing-car car-2">🚗💨</div>
            <div className="racing-car car-3">🏎️⚡</div>
          </div>
          <h1 className="launch-text">ENTRÉE DANS LE GARAGE...</h1>
        </div>
      )}

    </div>
  );
}