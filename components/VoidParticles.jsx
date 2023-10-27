'use client'

import { useState, useRef, useEffect } from 'react';
import Particle from '@/utils/background/voidParticle';

export default function VoidParticles(){
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState();
  const particleList = useRef([]);
  const animationFrame = useRef(0);


  const drawRectangle = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawParticle(ctx, particle, animationFrame) {
    particle.setRadius(animationFrame);
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.colour;
    ctx.fill();
  }

  useEffect(()=>{

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numColumns = 25; // Number of columns in the grid
    const numRows = 25;    // Number of rows in the grid
    const spacingX = canvas.width / numColumns;
    const spacingY = canvas.height / numRows;

    let animationFrameId;

    if (!particles){
      for (let x=0; x<numColumns; x++){
        for (let y=0; y<numRows; y++  ){
          particleList.current.push(new Particle(
            x*spacingX+spacingX/2,
            y*spacingY+spacingY/2,
            35,
            [10, 50, 135]
            ))
        }
      }
      setParticles(particleList.current);
    }

    function render(){
      animationFrame.current ++;
      drawRectangle(context);
      for (let particle of particles){
        drawParticle(context, particle, animationFrame.current);
      }
      animationFrameId = requestAnimationFrame(render);
    }

    if (particles){
      console.log('here');
      render();
    }

    if (animationFrameId){
      return () =>{
        cancelAnimationFrame(animationFrameId)
      } 
    }

  }, [particles])


  return <canvas ref={canvasRef} className='h-full w-full bg-blue-600' ></canvas>
}