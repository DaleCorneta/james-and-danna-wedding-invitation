import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene07.css';

gsap.registerPlugin(ScrollTrigger);

const { bestMen, maidsOfHonor, groomsmen, bridesmaids, flowerLadies } = weddingContent.weddingParty;
const roles = [
  { label: 'Best Men', names: bestMen },
  { label: 'Maids of Honor', names: maidsOfHonor },
  { label: 'Groomsmen', names: groomsmen },
  { label: 'Bridesmaids', names: bridesmaids },
  { label: 'Flower Ladies', names: flowerLadies },
];

export function Scene07Entourage() {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const heading = scene?.querySelector('.entourage__heading');
    const hem = scene?.querySelector('.entourage__hem');
    if (!scene || !heading || !hem) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: { trigger: heading, start: 'top bottom', end: 'center 42%', scrub: 0.22 },
      })
        .from('.entourage__rule', { scaleX: 0.12, duration: 0.7 }, 0)
        .from('.entourage__bloom--ivory', { yPercent: 28, rotation: -23, scale: 0.8, opacity: 0.2 }, 0.08)
        .from('.entourage__bloom--gold', { yPercent: 48, rotation: 22, scale: 0.72, opacity: 0.2 }, 0.26);

      for (const group of scene.querySelectorAll('.entourage__group')) {
        gsap.timeline({
          defaults: { ease: 'sine.out' },
          scrollTrigger: { trigger: group, start: 'top 95%', end: 'top 52%', scrub: 0.22 },
        })
          .from(group.querySelector('.entourage__divider'), { scaleX: 0.15 }, 0)
          .from(group.querySelector('.entourage__petals'), { rotation: -55, scale: 0.48, opacity: 0.25 }, 0.08)
          .from(group.querySelector('ul'), { y: 14 }, 0.15);
      }

      gsap.from('.entourage__silk', {
        yPercent: 44,
        scaleY: 0.5,
        opacity: 0.35,
        ease: 'sine.out',
        scrollTrigger: { trigger: hem, start: 'top bottom', end: 'bottom bottom', scrub: 0.22 },
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section className="entourage" ref={sceneRef} aria-labelledby="entourage-title">
      <div className="entourage__content">
        <header className="entourage__heading">
          <div className="entourage__florals" aria-hidden="true">
            <span className="entourage__bloom entourage__bloom--ivory" />
            <span className="entourage__bloom entourage__bloom--gold" />
          </div>
          <span className="entourage__rule" aria-hidden="true" />
          <h2 id="entourage-title">Standing Beside Us</h2>
        </header>
        <div className="entourage__groups">
          {roles.map(({ label, names }) => (
            <div className="entourage__group" key={label}>
              <div className="entourage__divider" aria-hidden="true">
                <span className="entourage__petals" />
              </div>
              <h3>{label}</h3>
              <ul role="list">
                {names.map(name => <li key={name}>{name}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="entourage__hem" aria-hidden="true">
        <div className="entourage__silk" />
      </div>
    </section>
  );
}
