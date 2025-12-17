import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      // Config
      const gridSize = 60; 
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // 1. Draw Base Grid (Faint Blue/Slate)
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.2)'; // Slate 900ish, reduced alpha
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const y = j * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw "Nebula Blocks" (Random filled rectangles)
      const blockCount = Math.floor((width * height) / 25000); 
      for (let i = 0; i < blockCount; i++) {
        const w = Math.floor(Math.random() * 2 + 1) * gridSize;
        const h = Math.floor(Math.random() * 2 + 1) * gridSize;
        const x = Math.floor(Math.random() * (cols - 1)) * gridSize;
        const y = Math.floor(Math.random() * (rows - 1)) * gridSize;

        // Colors: Blue, Green, Orange
        const rand = Math.random();
        if (rand > 0.6) {
            ctx.fillStyle = 'rgba(14, 165, 233, 0.04)'; // Blue
        } else if (rand > 0.3) {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.04)'; // Green
        } else {
            ctx.fillStyle = 'rgba(249, 115, 22, 0.04)'; // Orange
        }
        
        ctx.fillRect(x, y, w, h);
      }

      // 3. Draw "Laser Traces"
      const traceCount = Math.floor((width * height) / 12000);
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      for (let i = 0; i < traceCount; i++) {
         const startX = Math.floor(Math.random() * cols) * gridSize;
         const startY = Math.floor(Math.random() * rows) * gridSize;
         const len = Math.floor(Math.random() * 3 + 1) * gridSize; 
         
         const isHorizontal = Math.random() > 0.5;
         
         // Neon Colors
         const rand = Math.random();
         if (rand > 0.6) {
             ctx.strokeStyle = '#0EA5E9'; // Blue
             ctx.shadowColor = '#0EA5E9';
         } else if (rand > 0.3) {
             ctx.strokeStyle = '#10B981'; // Green
             ctx.shadowColor = '#10B981';
         } else {
             ctx.strokeStyle = '#F97316'; // Orange
             ctx.shadowColor = '#F97316';
         }
         
         ctx.shadowBlur = 10;
         ctx.globalAlpha = 0.2; // Reduced alpha
         
         ctx.beginPath();
         ctx.moveTo(startX, startY);
         
         if (isHorizontal) {
             ctx.lineTo(startX + len, startY);
         } else {
             ctx.lineTo(startX, startY + len);
         }
         ctx.stroke();
         
         // Reset shadow and alpha
         ctx.shadowBlur = 0;
         ctx.globalAlpha = 1.0;
      }

      // 4. Draw Crosshairs
      const markerCount = 15;
      ctx.fillStyle = '#FFFFFF'; 
      for (let i = 0; i < markerCount; i++) {
          const mx = Math.floor(Math.random() * cols) * gridSize;
          const my = Math.floor(Math.random() * rows) * gridSize;
          
          ctx.globalAlpha = 0.25; // Reduced alpha
          ctx.beginPath();
          ctx.arc(mx, my, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
      }
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1, mixBlendMode: 'screen' }} 
    />
  );
};

export default ParticleBackground;