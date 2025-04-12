import React, { useCallback } from 'react';
import { loadSlim } from "@tsparticles/slim";
import { Particles } from "@tsparticles/react";

const ParticlesBackground = () => {
  const init = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const options = {
    particles: {
      color: {
        value: ["#FF69B4", "#FFB6C1", "#FFC0CB"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: ["heart", "circle"],
      },
      size: {
        value: { min: 8, max: 15 },
      },
      rotate: {
        value: 0,
        direction: "clockwise",
        animation: {
          enable: true,
          speed: 5,
          sync: false
        }
      },
    },
    detectRetina: true,
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Particles options={options} init={init} />
    </div>
  );
};

export default ParticlesBackground;