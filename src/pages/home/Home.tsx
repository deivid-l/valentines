import React, { useState, useEffect } from 'react'
import './Home.css'
import { motion } from 'framer-motion'
import { Animator, ScrollContainer, ScrollPage } from 'react-scroll-motion'
import { batch } from 'react-scroll-motion'
import { Fade, MoveOut, MoveIn, Sticky } from 'react-scroll-motion'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

interface nameProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>; // Function to update the player list
}

export const Home: React.FC<nameProps> = ( {name, setName} ) => {
  const { randomUrlPart } = useParams<{ randomUrlPart: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nameFromUrl = queryParams.get('name');
    const spotifyFromUrl = queryParams.get('spotify');
    if (nameFromUrl) {
      setName(nameFromUrl);
    }
    if (spotifyFromUrl) {
      setSpotifyUrl(`https://open.spotify.com/embed/track/${spotifyFromUrl}?utm_source=generator`);
    }
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.search, setName]);

  useEffect(() => {
    if (spotifyUrl) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = spotifyUrl;
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      document.body.appendChild(iframe);
      iframe.onload = () => {
        setIsPlaying(true);
      };
      return () => {
        document.body.removeChild(iframe);
      };
    }
  }, [spotifyUrl]);

  const handleClick = () => {
    navigate(`/question?spotify=${spotifyUrl}`);
  }

  const handlePlayMusic = () => {
    if (spotifyUrl) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = spotifyUrl;
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      document.body.appendChild(iframe);
      setIsPlaying(true);
    }
  };

  name = String(name).charAt(0).toUpperCase() + String(name).slice(1);

  return (
    <motion.div
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{ opacity: 0}}
      transition={{ duration: 1 }}
    >
      <div className='home-container'>
        {spotifyUrl && (
          <div className='spotify-container'>
            <h2>Esta fue la canción que eligió tu enamorado:</h2>
            <iframe
              src={spotifyUrl}
              width="300"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}
        {!isPlaying && spotifyUrl && (
          <button className='music-player' onClick={handlePlayMusic}>Reproducir Música</button>
        )}
        <ScrollContainer>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveIn(-100, 500), MoveOut(0, -500))}>
              <h1>Hola,&nbsp;&nbsp;{name}! &nbsp; (- ‿◦ )</h1>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveIn(-100, 500), MoveOut(100, -500))}>
              <h1><i>Para ser honesto</i>, mi segundo favor es más una pregunta. <br/><br/> Bueno, aquí va nada...</h1>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveIn(0, 1000), MoveOut(0, -500))}>
              <button className='home-button' onClick={handleClick}>Mi pregunta es...</button>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </motion.div>
  )
}
