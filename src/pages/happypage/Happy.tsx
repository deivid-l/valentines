/* eslint-disable */
import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './Happy.css';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ValentinesCard } from '../card/card';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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
  const group = useRef<THREE.Group>();
  const [scene, setScene] = useState<THREE.Group>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      process.env.PUBLIC_URL + '/models/valentine.glb',
      (gltf) => {
        setScene(gltf.scene);
        setError(null);
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
        setError("Error loading GLTF model: " + (error as Error).message);
      }
    );
  }, []);

  if (error) {
    return <Html center><div className="error-message">{error}</div></Html>;
  }

  return scene ? <primitive object={scene} ref={group} {...props} /> : null;
}

export const Three: React.FC = () => {
  const [showCard, setShowCard] = useState(true);
  const location = useLocation();
  const { spotifyUrl, spotifyTitle } = location.state || {};

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5, ease: "easeInOut" }}
    >
      {showCard && <ValentinesCard onClose={() => setShowCard(false)} />}
      <div className='three-container'>
        {spotifyUrl && (
          <div className='spotify-container'>
            <h2 className='spotify-title'>{spotifyTitle}</h2>
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
