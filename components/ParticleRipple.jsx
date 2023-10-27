'use client'
import { useRef, useEffect, useState } from 'react';

export default function RippleGrid() {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const particlesList=useRef([])

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numColumns = 10; // Number of columns in the grid
    const numRows = 10;    // Number of rows in the grid
    const spacingX = canvas.width / numColumns;
    const spacingY = canvas.height / numRows;

    function createParticle(x, y) {
      return {
        x,
        y,
        radius: .15,
        color: `rgba(255, 255, 255, 0.5)`,
        speed: 2,
      };
    }

    function drawParticle(particle) {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        if (particle.radius > 20) {
          particles.splice(i, 1);
        } else {
          particle.radius += particle.speed;
          drawParticle(particle);
        }
      }
      particlesList.current=[]
      for (let x = 0; x < numColumns; x++) {
        for (let y = 0; y < numRows; y++) {
          const particleX = x * spacingX + spacingX / 2;
          const particleY = y * spacingY + spacingY / 2;
          const newParticle = createParticle(particleX, particleY);
          particlesList.current.push(newParticle);
        }
      }
      setParticles(particlesList.current)

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }, [particles]);

  return (
    <canvas
    className='w-screen h-screen' 
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    ></canvas>
  );
}