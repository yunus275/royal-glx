import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  currentX: number;
  currentY: number;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
};

export default function RoyalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const root = document.documentElement;
    const mouse = { x: -1000, y: -1000 };
    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let isLight = root.classList.contains("light");

    const resize = () => {
      const density = window.innerWidth < 700 ? 48 : 42;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      particles.length = 0;
      for (let x = 0; x < width; x += density) {
        for (let y = 0; y < height; y += density) {
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: 1.35,
            currentX: x,
            currentY: y,
          });
        }
      }
    };

    const updateTheme = () => {
      isLight = root.classList.contains("light");
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const onMouseDown = (event: MouseEvent) => {
      ripples.push({ x: event.clientX, y: event.clientY, radius: 0, opacity: 0.8 });
    };

    const animate = () => {
      const background = isLight ? "#f8f5ef" : "#050505";
      const dotColor = isLight ? "rgba(117, 95, 64, 0.42)" : "rgba(197, 160, 89, 0.25)";
      const lineColor = isLight ? "rgba(117, 95, 64, 0.20)" : "rgba(197, 160, 89, 0.18)";
      const gold = isLight ? "rgba(155, 106, 37, 0.9)" : "rgba(197, 160, 89, 0.9)";

      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        const dx = mouse.x - particle.baseX;
        const dy = mouse.y - particle.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let offsetX = 0;
        let offsetY = 0;
        let color = dotColor;

        if (distance > 0 && distance < 220) {
          const force = (220 - distance) / 220;
          offsetX = (dx / distance) * force * 13;
          offsetY = (dy / distance) * force * 13;
          color = isLight
            ? `rgba(155, 106, 37, ${0.18 + force * 0.68})`
                    : `rgba(197, 160, 89, ${0.38 + force * 0.62})`;
        }

        ripples.forEach((ripple) => {
          const rippleDx = ripple.x - particle.baseX;
          const rippleDy = ripple.y - particle.baseY;
          const rippleDistance = Math.sqrt(rippleDx * rippleDx + rippleDy * rippleDy);
          if (rippleDistance > 0 && Math.abs(rippleDistance - ripple.radius) < 26) {
            color = gold;
            offsetX += (rippleDx / rippleDistance) * 4;
            offsetY += (rippleDy / rippleDistance) * 4;
          }
        });

        particle.currentX = particle.baseX + offsetX;
        particle.currentY = particle.baseY + offsetY;
        context.fillStyle = color;
        context.beginPath();
        context.arc(particle.currentX, particle.currentY, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      context.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.currentX - second.currentX;
          const dy = first.currentY - second.currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 59) {
            const mouseDx = mouse.x - first.currentX;
            const mouseDy = mouse.y - first.currentY;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const opacity = 1 - distance / 59;
            context.strokeStyle =
              mouseDistance < 170
                ? (isLight
                    ? `rgba(155, 106, 37, ${opacity * 0.45})`
                    : `rgba(197, 160, 89, ${opacity * 0.65})`)
                : lineColor;
            context.beginPath();
            context.moveTo(first.currentX, first.currentY);
            context.lineTo(second.currentX, second.currentY);
            context.stroke();
          }
        }
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        ripples[index].radius += 6;
        ripples[index].opacity -= 0.015;
        if (ripples[index].opacity <= 0) ripples.splice(index, 1);
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="royal-background-canvas" aria-hidden="true" />;
}