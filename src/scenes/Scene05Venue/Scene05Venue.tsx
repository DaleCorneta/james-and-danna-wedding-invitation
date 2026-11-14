import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene05.css';

gsap.registerPlugin(ScrollTrigger);

const destination = encodeURIComponent('Seaside Sunset Beach Resort, C88M+QPW, Caba, La Union, Philippines');
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

export function Scene05Venue() {
  const sceneRef = useRef<HTMLElement>(null);
  const { ceremony } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const stage = scene?.querySelector<HTMLElement>('.venue__stage');
    if (!scene || !stage) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: () => `+=${scene.offsetHeight - 2 * stage.offsetHeight}`,
          invalidateOnRefresh: true,
          scrub: 0.25,
        },
      })
        .from('.venue__coast', { opacity: 0, duration: 0.37 }, 0)
        .from('.venue__sun', { yPercent: 38, scale: 0.56, duration: 0.55 }, 0)
        .from('.venue__reflection', { scaleX: 0.24, yPercent: -23, duration: 0.62 }, 0.09)
        .from('.venue__tide', { yPercent: -25, opacity: 0, duration: 0.74 }, 0.13)
        .from('.venue__paper', { yPercent: 104, duration: 0.75 }, 0.25)
        .from('.venue__details', { autoAlpha: 0, y: 24, duration: 0.43 }, 0.46);
    });

    return () => media.revert();
  }, []);

  return (
    <section className="venue" ref={sceneRef} aria-labelledby="venue-title">
      <div className="venue__stage">
        <div className="venue__coast" aria-hidden="true">
          <div className="venue__sun" />
          <div className="venue__water">
            <div className="venue__reflection" />
            <div className="venue__tide" />
          </div>
        </div>
        <div className="venue__paper">
          <header className="venue__details">
            <h2 id="venue-title">Where We Say I Do</h2>
            <p className="venue__name">{ceremony.venue}</p>
            <p className="venue__location">{ceremony.location}</p>
            <a className="venue__directions" href={directionsUrl}>
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </header>
        </div>
      </div>
    </section>
  );
}
