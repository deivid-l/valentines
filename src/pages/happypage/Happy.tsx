/* eslint-disable */
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './Happy.css';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ValentinesCard } from '../card/card';
import { useLocation } from 'react-router-dom';

// Loading Component
function Loader() {
  const { progress } = useProgress(); // Get loading progress

  if (progress === 100) {
    return <Html center><div></div></Html>;
  }

  return (
    <Html center>
      <div className="loading-container">
        <p>Loading... {Math.round(progress)}%</p>
        <div className="loading-spinner"></div>
      </div>
    </Html>
  );
}

// Custom Model Component
function MyModel(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/valentinescene10.glb');
  return <primitive object={scene} {...props} />;
}

export const Three: React.FC = () => {
  const location = useLocation();
  const { spotifyUrl, spotifyTitle } = location.state || {};
  const [showCard, setShowCard] = useState(true);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5, ease: "easeInOut" }}
    >
      {showCard && <ValentinesCard onClose={() => setShowCard(false)} />}
      {spotifyUrl && (
        <div className='spotify-container'>
          <h2 className='spotify-title'>{spotifyTitle}</h2>
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
      <div className='three-container'>
        <Canvas>
          <ambientLight intensity={0.2} />
          <pointLight intensity={5} position={[0, 1, 0.9]} />
          <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI/2} minDistance={2} maxDistance={10} />
          <Loader />
          <MyModel position={[-2, -1, 1]} scale={2} />
        </Canvas>
      </div>
    </motion.div>
  );
};
