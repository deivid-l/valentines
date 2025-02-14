import React, { useState } from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from 'react-modal';
import { FaWhatsapp, FaInstagram, FaTwitter, FaCopy } from 'react-icons/fa';

interface nameProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const WelcomePage: React.FC<nameProps> = ({ name, setName }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');
  const [copyClicked, setCopyClicked] = useState(false);

  const generateRandomUrl = (name: string, spotifyLink: string) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const spotifyTrackId = spotifyLink.split('/track/')[1]?.split('?')[0];
    return `/home/${randomString}?name=${encodeURIComponent(name)}&spotify=${encodeURIComponent(spotifyTrackId)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSpotifyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpotifyLink(event.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name === '') {
      setAlertMessage('Por favor ingresa un nombre');
      setAlertIsOpen(true);
      return;
    }
    const randomUrl = generateRandomUrl(name, spotifyLink);
    setShareUrl(randomUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeAlert = () => {
    setAlertIsOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopyClicked(true);
    setTimeout(() => setCopyClicked(false), 300); // Reset the effect after 300ms
  };

  const openUrl = () => {
    navigate(shareUrl);
  };

  return (
    <div className="welcome-page-container">
      <h1>Día de San Valentín</h1>
      <p>Crea un regalo para tu persona especial</p>
      <motion.div
        layout
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20 }}
        transition={{ duration: 2 }}
      >
        <form className="name-form">
          <input
            className="text-field"
            type="text"
            placeholder="¿Cómo debería llamarte?"
            onChange={handleChange}
          />
          <input
            className="text-field"
            type="text"
            placeholder="Enlace de Spotify"
            onChange={handleSpotifyChange}
          />
          <button className="submit-button" type="submit" onClick={handleSubmit}>
            CREAR REGALO
          </button>
        </form>
      </motion.div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2 style={{ textAlign: 'center' }}>Comparte tu regalo</h2>
        <div className="url-box">
          <input type="text" value={shareUrl} readOnly />
          <button 
            onClick={copyToClipboard} 
            className={copyClicked ? 'copy-button clicked' : 'copy-button'}
          >
            <FaCopy />
          </button>
        </div>
        <div className="share-buttons">
          <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={32} />
          </a>
          <a href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
            <FaInstagram size={32} />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter size={32} />
          </a>
        </div>
        <button className="open-button" onClick={openUrl}>Abrir URL</button>
        <button className="close-button" onClick={closeModal}>Cerrar</button>
      </Modal>
      <Modal isOpen={alertIsOpen} onRequestClose={closeAlert} className="alert-modal">
        <p>{alertMessage}</p>
        <button className="close-button" onClick={closeAlert}>Cerrar</button>
      </Modal>
    </div>
  );
};
