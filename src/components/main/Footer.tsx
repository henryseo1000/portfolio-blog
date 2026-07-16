
import { Point, Wave } from '@/types/footerTypes';
import React, { useEffect, useRef, useState } from 'react'

function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
  const [waveCount, setWaveCount] = useState<number>(3);
  const [wavePoints, setWavePoints] = useState<number>(6);
  const [stageWidth, setStageWidth] = useState<number>(500);
  const [stageHeight, setStageHeight] = useState<number>(400);
  const [waves, setWaves] = useState<Wave[]>([]);
  const [speed, setSpeed] = useState<number>(0.05);
  const [max, setMax] = useState<number>(175);
  const color = ["rgba(117, 117, 117, 0.4)", "rgba(166,166,166,0.4)", "rgba(64,64,64,0.4)"]

  useEffect(() => {
    generateWaves();

    if (canvasRef && canvasRef?.current) {
      setCtx(canvasRef.current.getContext('2d'));
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      requestAnimationFrame(animate.bind(this));
      
      handleResize();
      window.addEventListener('resize', handleResize.bind(this), false);
    }
  }, [ctx])

  function generateWaves() {
    const arr : Wave[] = [];

    for(let i = 0; i < waveCount; i++) {
      const points: Point[] = [];

      for(let j = 0; j < wavePoints; j++) {
          points.push({
            x: stageWidth / (wavePoints - 1) * j,
            y: stageHeight / 2,
            fixedY: stageHeight / 2,
            cur: i + j
          });
      }
      
      arr.push({
        index: i,
        totalPoints: wavePoints,
        color: color[i],
        points: points,
        pointGap: stageWidth / (wavePoints - 1)
      })
    }

    setWaves(arr);
  }

  function draw() {
    for(let i = 0; i < waveCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = color[i];

      let prevX = waves[i].points[0].x;
      let prevY = waves[i].points[0].y;

      ctx.moveTo(prevX, prevY);

      for (let j = 1; j < wavePoints; j++) {
            if (j < wavePoints - 1) {
                waves[i].points[j].cur += speed;
                waves[i].points[j].y = waves[i].points[j].fixedY + Math.sin(waves[i].points[j].cur) * max;
            }

            const cx = (prevX + waves[i].points[j].x) / 2;
            const cy = (prevY + waves[i].points[j].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = waves[i].points[j].x;
            prevY = waves[i].points[j].y;
      }

      ctx.lineTo(prevX, prevY);
      ctx.lineTo(stageWidth, stageHeight);
      ctx.lineTo(waves[i].points[0].x, stageHeight);
      ctx.fill();
      ctx.closePath();
    }
  }

  function animate(t) {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    draw();
    requestAnimationFrame(animate.bind(this));
  }

  function handleResize() {
    setStageWidth(document.body.clientWidth);
    setStageHeight(document.body.clientHeight);

    canvasRef.current.width = stageWidth;
    canvasRef.current.height = stageHeight;
    ctx.scale(1, 1);

    generateWaves();
    //this.wave.resize(this.stageWidth, this.stageHeight);
  }

  return (
    <div className='flex relative justify-center w-screen h-[300px] bg-[#222222]'>
        <canvas className='w-full h-full' width={"100%"} height={"100%"} ref={canvasRef}></canvas>
        <div className='flex flex-col absolute items-center justify-center w-full h-full px-[40px] gap-[10px]'>
          <div/>

          <div className='w-full h-[1px] bg-[var(--border-light)]'/>

          <div className='flex flex-col items-center justify-center w-full text-[14px] text-[var(--border-light)]'>
            <p >Copyright @ 2026 by henryseo1000. All rights reserved.</p>
            <p>Created by @서호준,  Powered by @서호준</p>
          </div>
        </div>
    </div>
  )
}

export default Footer;