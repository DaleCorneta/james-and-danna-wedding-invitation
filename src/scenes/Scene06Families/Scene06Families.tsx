import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene06.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene06Families() {
  const sceneRef = useRef<HTMLElement>(null);
  const { family, weddingParty } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const entrance = scene?.querySelector<HTMLElement>('.families__entrance');
    const stage = scene?.querySelector<HTMLElement>('.families__stage');
    const register = scene?.querySelector<HTMLElement>('.families__register');
    const venuePaper = scene?.previousElementSibling?.querySelector<HTMLElement>('.venue__paper');
    const venueDetails = venuePaper?.querySelector<HTMLElement>('.venue__details');
    if (!scene || !entrance || !stage || !register || !venuePaper || !venueDetails) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('.families__parents > div', { autoAlpha: 0, y: 26 });

      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: entrance,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.22,
          invalidateOnRefresh: true,
        },
      })
        .fromTo('.families__sheet', { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.57)
        .to(venueDetails, { autoAlpha: 0, y: -12, duration: 0.25 }, 0.04)
        .fromTo(venuePaper, { '--paper-extension': '0px' }, {
          '--paper-extension': () => `${Math.max(0, stage.clientHeight - venuePaper.offsetHeight) + 1}px`,
          duration: 0.53,
        }, 0.04)
        .from('.families__crease', { scaleY: 0, opacity: 0, duration: 0.29 }, 0.48)
        .from('.families__fold--left', { rotationY: -72, xPercent: 32, opacity: 0, duration: 0.32 }, 0.49)
        .from('.families__fold--right', { rotationY: 72, xPercent: -32, opacity: 0, duration: 0.32 }, 0.53)
        .from('.families__seal', { rotation: -26, scale: 0.7, duration: 0.23 }, 0.55)
        .from('.families__heading', { autoAlpha: 0, y: 20, duration: 0.27 }, 0.57)
        .to('.families__parents > div', { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.08 }, 0.68);

      gsap.from('.families__register-rule', {
        scaleX: 0.12,
        ease: 'sine.inOut',
        scrollTrigger: { trigger: register, start: 'top bottom', end: 'top 35%', scrub: 0.22 },
      });
      gsap.from('.families__register-rail', {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: { trigger: register, start: 'top 78%', end: 'bottom bottom', scrub: 0.22 },
      });

      for (const row of register.querySelectorAll('li')) {
        gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 92%', end: 'bottom 28%', scrub: 0.18 },
        })
          .fromTo(row, { '--impression': 0 }, { '--impression': 1, duration: 0.45, ease: 'sine.out' })
          .to(row, { '--impression': 0, duration: 0.55, ease: 'sine.inOut' });
      }

      gsap.fromTo('.families__register-corner', { y: 18, opacity: 0.25 }, {
        y: 0, opacity: 1, stagger: 0.12,
        scrollTrigger: { trigger: register, start: 'top bottom', end: 'top 25%', scrub: 0.22 },
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section className="families" ref={sceneRef} aria-labelledby="families-title">
      <div className="families__entrance">
        <div className="families__stage">
          <div className="families__sheet" aria-hidden="true" />
          <div className="families__crease" aria-hidden="true" />
          <div className="families__folds" aria-hidden="true">
            <div className="families__fold families__fold--left" />
            <div className="families__fold families__fold--right" />
          </div>
          <div className="families__dedication">
            <header className="families__heading">
              <span className="families__seal" aria-hidden="true">C &amp; D</span>
              <h2 id="families-title">With Our Families</h2>
            </header>
            <dl className="families__parents">
              <div>
                <dt>Parents of the Groom</dt>
                <dd>{family.groomParents[0]}<br />&amp; {family.groomParents[1]}</dd>
              </div>
              <div>
                <dt>Parents of the Bride</dt>
                <dd>{family.brideParents[0]}<br />&amp; {family.brideParents[1]}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="families__register">
        <div className="families__register-rail" aria-hidden="true" />
        <span className="families__register-corner families__register-corner--left" aria-hidden="true" />
        <span className="families__register-corner families__register-corner--right" aria-hidden="true" />
        <h3>Principal Sponsors</h3>
        <div className="families__register-rule" aria-hidden="true" />
        <ul role="list">
          {weddingParty.principalSponsors.map(sponsor => <li key={sponsor}>{sponsor}</li>)}
        </ul>
      </div>
    </section>
  );
}
