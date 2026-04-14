import React, { useEffect, useRef } from 'react';

/* ── Canvas-based Starfield (performant, beautiful) ────────────── */
const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    /* ── Resize handling ── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    /* ── Generate stars ── */
    const NUM_STARS = 280;
    const stars = Array.from({ length: NUM_STARS }, () => {
      const r = Math.random();
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        // Size: mostly tiny, some medium, few large
        size: r < 0.7 ? Math.random() * 1.2 + 0.3
             : r < 0.92 ? Math.random() * 1.8 + 1.2
             : Math.random() * 2.5 + 2,
        // Twinkle speed & offset
        speed: Math.random() * 0.015 + 0.005,
        offset: Math.random() * Math.PI * 2,
        // Colors: white, blue-white, cyan, purple-ish
        hue: [0, 210, 240, 260, 180][Math.floor(Math.random() * 5)],
        sat: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 60 + 30),
        baseAlpha: Math.random() * 0.5 + 0.3,
      };
    });

    /* ── Shooting stars ── */
    const NUM_SHOOTERS = 6;
    const shooters = Array.from({ length: NUM_SHOOTERS }, (_, i) => ({
      x: 0, y: 0, len: 0, speed: 0, angle: 0,
      active: false,
      delay: i * 2800 + Math.random() * 3000, // stagger launches
    }));

    const launchShooter = (s) => {
      s.x = Math.random() * W * 0.7;
      s.y = Math.random() * H * 0.4;
      s.len = Math.random() * 180 + 80;
      s.speed = Math.random() * 14 + 8;
      s.angle = Math.PI / 5 + Math.random() * 0.4;
      s.alpha = 1;
      s.active = true;
    };

    /* ── Nebula blobs (static gradient circles) ── */
    const nebulas = [
      { x: W * 0.12, y: H * 0.18, r: 220, color: 'rgba(99,102,241,0.07)' },
      { x: W * 0.85, y: H * 0.75, r: 260, color: 'rgba(168,85,247,0.06)' },
      { x: W * 0.55, y: H * 0.5,  r: 180, color: 'rgba(6,182,212,0.05)'  },
      { x: W * 0.3,  y: H * 0.85, r: 200, color: 'rgba(99,102,241,0.05)' },
      { x: W * 0.9,  y: H * 0.2,  r: 150, color: 'rgba(168,85,247,0.07)' },
    ];

    let t = 0;
    let shooterTimers = shooters.map((s) => s.delay);
    let animId;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, W, H);

      /* Nebula blobs */
      nebulas.forEach(({ x, y, r, color }) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* Stars */
      stars.forEach((s) => {
        const twinkle = s.baseAlpha + Math.sin(t * s.speed + s.offset) * 0.35;
        const alpha = Math.max(0.05, Math.min(1, twinkle));

        ctx.save();
        ctx.globalAlpha = alpha;

        if (s.size > 2.5) {
          /* Large star — draw with 4-point spike + outer glow */
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 6);
          glow.addColorStop(0, `hsla(${s.hue},${s.sat}%,92%,0.6)`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 6, 0, Math.PI * 2);
          ctx.fill();

          // 4-point cross spike
          ctx.strokeStyle = `hsla(${s.hue},${s.sat}%,95%,${alpha * 0.7})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 4, s.y);
          ctx.lineTo(s.x + s.size * 4, s.y);
          ctx.moveTo(s.x, s.y - s.size * 4);
          ctx.lineTo(s.x, s.y + s.size * 4);
          ctx.stroke();
        }

        /* Core dot */
        ctx.fillStyle = `hsla(${s.hue},${s.sat}%,96%,1)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      /* Shooting stars */
      shooters.forEach((s, i) => {
        shooterTimers[i] -= 16; // ~60fps delta
        if (!s.active && shooterTimers[i] <= 0) {
          launchShooter(s);
          shooterTimers[i] = Math.random() * 5000 + 3500; // re-fire interval
        }

        if (s.active) {
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.alpha -= 0.018;

          if (s.alpha <= 0 || s.x > W || s.y > H) {
            s.active = false;
            return;
          }

          const tailX = s.x - Math.cos(s.angle) * s.len;
          const tailY = s.y - Math.sin(s.angle) * s.len;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(0.6, `rgba(180,180,255,${s.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);

          ctx.save();
          ctx.globalAlpha = s.alpha;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();

          /* Bright head */
          const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
          headGlow.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
          headGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarField;
