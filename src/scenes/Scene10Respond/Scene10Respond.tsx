import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import { RespondForm } from './RespondForm';
import './scene10.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene10Respond() {
  const sectionRef = useRef<HTMLElement>(null);
  const { rsvp } = weddingContent;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const envelope = section?.previousElementSibling?.querySelector<HTMLElement>('.guest-notes__envelope');
    const stage = section?.querySelector<HTMLElement>('.respond__stage');
    if (!section || !envelope || !stage) return;

    const media = gsap.matchMedia(section);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${section.offsetHeight - stage.offsetHeight - window.innerHeight}`,
          scrub: 0.24,
        },
      })
        .fromTo(envelope, { '--response-seal': 1 }, { '--response-seal': 0, duration: 0.14 }, 0.08)
        .fromTo(envelope, { '--response-flap': '0deg' }, { '--response-flap': '-166deg', duration: 0.24 }, 0.19)
        .from('.respond__card', {
          autoAlpha: 0, y: '36dvh', scale: 0.72, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.36,
        }, 0.35)
        .to(envelope, { y: 70, opacity: 0, duration: 0.25 }, 0.49)
        .from('.respond__light', { opacity: 0, duration: 0.45 }, 0.55);
    });

    return () => media.revert();
  }, []);

  return (
    <section id="rsvp" className="respond" ref={sectionRef} aria-labelledby="respond-title">
      <div className="respond__stage">
        <div className="respond__light" aria-hidden="true" />
        <div className="respond__card">
          <h2 id="respond-title" className="sr-only">An Invitation to Respond</h2>
          <RespondForm />
          <a className="respond__fallback" href={rsvp.formUrl} target="_blank" rel="noopener noreferrer">
            Open the RSVP form in a new tab
          </a>
        </div>
      </div>
    </section>
  );
}
