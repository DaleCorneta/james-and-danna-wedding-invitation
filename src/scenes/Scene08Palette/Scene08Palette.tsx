import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene08.css';

gsap.registerPlugin(ScrollTrigger);

const { attire, colors, attireNote } = weddingContent.guestNotes;

export function Scene08Palette() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const guide = section?.querySelector('.palette__guide');
    if (!section || !guide) return;

    const media = gsap.matchMedia(section);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        defaults: { ease: 'sine.out' },
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 12%', scrub: 0.24 },
      })
        .from('.palette__silk', { scaleY: 0.35, duration: 0.52 }, 0)
        .from('.palette__heading', { y: 24, duration: 0.64 }, 0.15)
        .from('.palette__cloth', {
          rotateX: -69, y: -30, scaleY: 0.56, stagger: 0.14, duration: 0.52,
        }, 0.23);

      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: { trigger: guide, start: 'top 94%', end: 'top 46%', scrub: 0.24 },
      })
        .from('.palette__crease', { scaleX: 0.15 }, 0)
        .from('.palette__guide-copy', { y: 18 }, 0);
    });

    return () => media.revert();
  }, []);

  return (
    <section className="palette" ref={sectionRef} aria-labelledby="palette-title">
      <div className="palette__silk" aria-hidden="true" />
      <div className="palette__content">
        <header className="palette__heading">
          <h2 id="palette-title">The Wedding Palette</h2>
        </header>
        <ul className="palette__swatches" role="list">
          {colors.map(color => (
            <li key={color}>
              <div className="palette__cloth" aria-hidden="true" />
              <span>{color}</span>
            </li>
          ))}
        </ul>
        <div className="palette__guide">
          <div className="palette__crease" aria-hidden="true" />
          <div className="palette__guide-copy">
            <h3>Dress code</h3>
            <p>{attire}</p>
            <p>{attireNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
