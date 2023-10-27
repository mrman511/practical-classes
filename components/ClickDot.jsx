'use client'

import { useState, useRef, useEffect } from 'react';
import Particle from '@/utils/background/ripple/particle';
import ParticleGrid from '@/utils/background/ripple/particleGrid';

export default function ClickDot(){
  const canvasRef = useRef(null);
  const particleGrid = useRef();
  const [animationFrame, setAnimationFrame] = useState(0);
  const [activeParticles, setActiveParticles] = useState();
  const activeClicks = useRef(0)


  // const drawRectangle = (ctx) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // }

  function drawParticles(ctx) {
    for (let particle of particleGrid.current.activeParticles){
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.colour;
      ctx.fill();
    }
  }

  function handleClick(e){
    e.preventDefault();
    const x = e.offsetX;
    const y = e.offsetY;
    if (activeClicks.current===0){
      console.log('here');
      particleGrid.current.startRipple(x,y,5);
    } else {
      particleGrid.current.continueRipple(.5);
    }
    activeClicks.current += 1;
    setActiveParticles((prev)=>[ ...particleGrid.current.activeParticles ]);
    setAnimationFrame(animationFrame+1);
  }

  useEffect(()=>{
    window.addEventListener('click', handleClick)
    let animationFrameId;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = context.canvas.clientWidth;
    canvas.height = context.canvas.clientHeight;

    if (!particleGrid.current){
      particleGrid.current = new ParticleGrid(canvas.height, canvas.width, 20, 20, 2, true);
      particleGrid.current.fillGrid(4, 'rgb(75, 125, 75)');
    }
    
    // let animationFrameId;

    function render(){

      drawParticles(context);
      particleGrid.current.continueRipple(1)
      animationFrameId = requestAnimationFrame(render);
      setActiveParticles(particleGrid.current.activeParticles);
    }

    if (particleGrid.current.activeParticles.length>0){
      render();
    } else {
      // setAnimationFrame(0)
    }

    if (animationFrameId){
      
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeClicks.current])


  return <canvas ref={canvasRef} className='h-full w-full'></canvas>
}