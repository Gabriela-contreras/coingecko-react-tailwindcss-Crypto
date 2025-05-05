import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Spinner from '../Spinner/Spinner';

const FloatingBitcoin = () => {
  const controls = useAnimation();
    const [coin, setCoin] = useState({})
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      const url = `https://api.coingecko.com/api/v3/coins/bitcoin`
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setCoin(data)
          setLoading(false)
        })
    }, [])

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: { 
        y: { 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut" 
        },
        rotate: { 
          repeat: Infinity, 
          duration: 6,
          ease: "easeInOut" 
        }
      }
    });
  }, [controls]);

  return (
    <>
    {loading ? (
        <Spinner />
      ) : (
    <motion.div 
      className="relative w-64 h-64 mx-auto md:w-80 md:h-80"
      animate={controls}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 bg-yellow-500 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />
      <img 
        src={coin.image?.large}
        alt="Bitcoin" 
        className="w-full h-full object-contain relative z-10"
        onError={(e) => {
          // Fallback to a SVG Bitcoin logo if image fails to load
          e.target.onerror = null;
          e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHBhdGggZmlsbD0iI2Y3OTMxYSIgZD0iTTYzLjA0IDM5Ljc0MWMtNC4yNzQgMTcuMTQzLTIxLjYzNyAyNy41NzYtMzguNzgyIDIzLjMwMS0xNy4xMzgtNC4yNzQtMjcuNTcxLTIxLjYzOC0yMy4yOTUtMzguNzgxIDQuMjcyLTE3LjE0NSAyMS42MzUtMjcuNTc5IDM4Ljc3NS0yMy4zMDUgMTcuMTQ0IDQuMjc0IDI3LjU3NiAyMS42NCAyMy4zMDIgMzguNzg1eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00Ni4xMDkgMjcuNjA4YzEuMDEtNi43MjktNC4xNzUtMTAuMzQtMTEuMjQ5LTEyLjc4MWwySC4wMzcgMTMuNjQ4bC0xLjQ0OCA1LjgxMSA0LjIxMS0uMDUyYzEuMTQ4LS4wMTQgMS40OTcuOTgxIDEuNDU3IDEuNjM0bC0uMzQ5IDIuMzNEMTQuNjQgMjUuNDY1IDE3LjM1NyAyNS4wOTUgMTQuODQgNDAuMTI3bC4zNzctMi41MmMtLjA0NC0uMjY4LS4xNjEtLjUyMi0uMzQ3LS43MjctLjE4Ni0uMjA1LS40MjQtLjM0Ny0uNjg1LS40MDkgMS4wOTktMi4yMjcgMS41MDQtNC43NTIgMS4xOTktNy4yMTIgMy4yODkuMTc4IDYuMDM0IDEuNTIyIDcuMzYyIDQuNTg5LjE3NSAxLjA1Mi4wMzMgMi4xNDUtLjQwNCAzLjA4NS0uNDM3Ljk0LTEuMTcyIDEuNzE0LTIuMDczIDIuMTc4IDE0LjkzLjAzNyAxOC4wNDktMS42ODEgMTUuNzYyLTExLjUwNHptLTE3LjA2OCA2LjZjLTMgLjAzOC00LjY4My0uNTQ4LTUuMTgtMy41MDUuNDgyLTMuNzYzIDIuMzk4LTQuMjM2IDUuNDM1LTQuMTU0IDIuOTM3LjgxIDQuNTkgMS4yMTcgNC43NzQgMy44ODIuMTA3IDIuNzU4LTEuOTMgMy43NzctNS4wMyAzLjc3N3ptLjkyNS0xMC44NjJjLTIuMTYxLS4xMDctMy4yNDktMS4yMjEtMy4zMDQtMy4xNzIuMDM0LTIuMTM0IDEuMTgzLTMuMjcgMy40NDQtMy4xNzIgMi4xNjEuMDUyIDMuMjQ5IDEuMzM5IDMuMTk0IDMuMjI0LS4wNTMgMS44ODYtMS4xODMgMy4xNy0zLjMzNCAzLjEyeiIvPjwvc3ZnPg==";
        }}
      />
    </motion.div>
      )}
    </>
  );
};

export default FloatingBitcoin;