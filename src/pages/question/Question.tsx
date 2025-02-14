import React, { useEffect, useState } from 'react';
import './Question.css';
import { motion } from 'framer-motion';
import { Animator, ScrollContainer, ScrollPage } from 'react-scroll-motion';
import { batch } from 'react-scroll-motion';
import { Fade, MoveOut, MoveIn, Sticky } from 'react-scroll-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import image2 from '../../assets/image2.gif';
import image3 from '../../assets/image3.gif';
import image4 from '../../assets/image4.gif';
import image5 from '../../assets/image5.gif';

interface nameProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>; 
}

export const Question: React.FC<nameProps> = ({ name, setName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);

  name = name.toUpperCase();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const spotifyFromUrl = queryParams.get('spotify');
    if (spotifyFromUrl) {
      setSpotifyUrl(spotifyFromUrl);
    }
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.search]);

  const handleNo = () => {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setNoButtonSize((prevSize) => prevSize * 0.5);
  };

  const handleYes = () => {
    navigate('/happy', { state: { spotifyUrl, spotifyTitle: 'Esta fue la canción que eligió tu enamorado' } });
  };

  // Move the "No" button to a random position every second
  useEffect(() => {
    console.log(window.innerWidth, window.innerHeight);
    const interval = setInterval(() => {
      setNoButtonPosition({
        x: (Math.random() * 2 - 1) * (window.innerWidth)/3, // Ensure it stays within screen width
        y: (Math.random() * 2 - 1) * (window.innerHeight)/3, // Ensure it stays within screen height
      });
    }, 300); // Change position every second

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className='question-container'>
        {spotifyUrl && (
          <div className='spotify-container'>
            <h2 className='spotify-title'>Esta fue la canción que eligió tu enamorado</h2>
            <iframe
              title="spotify-player"
              src={spotifyUrl}
              width="300"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}
        {/* Floating Images */}
        <img className="image1-down" src={image5} alt="" />
        <img className="image2-down" src={image2} alt="" />
        <img className="image3-down" src={image3} alt="" />
        <img className="image4-down" src={image4} alt="" />
        <img className="image5-down" src={image5} alt="" />
        <img className="image6-down" src={image2} alt="" />
        <img className="image1" src={image5} alt="" />
        <img className="image2" src={image2} alt="" />
        <img className="image3" src={image3} alt="" />
        <img className="image4" src={image4} alt="" />
        <img className="image5" src={image5} alt="" />
        <img className="image6" src={image2} alt="" />

        <ScrollContainer>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveIn(-100, 500), MoveOut(0, -500))}>
              <div>
                <h1>{name}... &nbsp;QUIERES SER MI </h1>
              </div>
              <div className='valentine'>
                <span>V</span>
                <span>A</span>
                <span>L</span>
                <span>E</span>
                <span>N</span>
                <span>T</span>
                <span>I</span>
                <span>N</span>
                <span>E</span>
                <span>?</span>
                <div className='clear-thing'></div>
              </div>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveIn(0, 1000), MoveOut(0, -500))}>
              <div className='question-buttons'>
                {/* Yes Button */}
                <button
                  className='question-button-yes'
                  onClick={handleYes}
                >
                  YES
                </button>

                {/* No Button */}
                <button
                  className='question-button-no'
                  onClick={handleNo}
                  style={{
                    position: 'absolute',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    scale: `${noButtonSize}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  no.
                </button>
              </div>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </motion.div>
  );
};
