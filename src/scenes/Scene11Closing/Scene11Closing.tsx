import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene11.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene11Closing() {
  const sceneRef = useRef<HTMLElement>(null);
  const { couple, ceremony } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const responseCard = scene?.previousElementSibling?.querySelector('.respond__card');
    if (!scene || !responseCard) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom bottom', scrub: 0.25 },
      })
        .to(responseCard, { yPercent: -7, scale: 0.96, autoAlpha: 0, duration: 0.36 }, 0.04)
        .from('.closing__coast', { opacity: 0, duration: 0.55 }, 0)
        .from('.closing__sun', { scale: 0.45, yPercent: -24, duration: 0.58 }, 0.05)
        .from('.closing__reflection', { scaleX: 0.18, opacity: 0, duration: 0.58 }, 0.16)
        .from('.closing__ripples', { yPercent: -16, opacity: 0, duration: 0.61 }, 0.19)
        .from('.closing__dedication', { autoAlpha: 0, y: 20, duration: 0.37 }, 0.49)
        .from('.closing__replay', { autoAlpha: 0, duration: 0.23 }, 0.77);
    });

    return () => media.revert();
  }, []);

  return (
    <section className="closing" ref={sceneRef} aria-labelledby="closing-title">
      <div className="closing__stage">
        <div className="closing__coast" aria-hidden="true">
          <div className="closing__sun" />
          <div className="closing__water">
            <div className="closing__reflection" />
            <div className="closing__ripples" />
          </div>
        </div>
        <header className="closing__dedication">
          <h2 id="closing-title">Until We Meet</h2>
          <p className="closing__names">
            <span>{couple.first.displayName}</span>
            <span className="closing__join">&amp;</span>
            <span>{couple.second.displayName}</span>
          </p>
          <time dateTime={ceremony.dateTime}>{ceremony.displayDate}</time>
        </header>
        <a className="closing__replay" href="#invitation-start">Back to the beginning <span aria-hidden="true">↑</span></a>
      </div>
    </section>
  );
}
