import React, { useState } from "react";
import "./card.css";
import { motion } from "framer-motion";

interface ValentinesCardProps {
  onClose: () => void;
}

export const ValentinesCard: React.FC<ValentinesCardProps> = ({ onClose }) => {
  return (
    <div className="card-overlay">
      <motion.div
        className="valentines-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2>¡Feliz Día de San Valentín! 💖</h2>
        <p>GRACIAS POR DECIR QUE SÍ :D</p>
        <p>Ahora que has aceptado ser mi valentine, he preparado un pequeño lugar para que nos relajemos un poco. ¡Espero que te guste!</p>
        <button onClick={onClose} className="close-button">¡DÉJAME VER!</button>
      </motion.div>
    </div>
  );
};
