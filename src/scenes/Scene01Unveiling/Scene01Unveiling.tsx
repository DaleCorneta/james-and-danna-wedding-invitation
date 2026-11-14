import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import { drawCurtains } from './curtain';
import { InvitationCard } from './InvitationCard';
import './scene01.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene01Unveiling() {
  const sceneRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLCanvasElement>(null);
  const { couple, ceremony, unveiling } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const stage = scene?.querySelector<HTMLElement>('.unveiling__stage');
    const canvas = curtainRef.current;
    if (!scene || !stage || !canvas) return;

    const cloth = { open: 0 };
    let width = stage.clientWidth;
    let height = stage.clientHeight;
    let lastFrame = '';
    let animated = false;
    const paint = () => {
      if (!animated) return;
      const open = Math.round(cloth.open * 600) / 600;
      const frame = `${width}:${height}:${window.devicePixelRatio}:${open}`;
      if (frame === lastFrame) return;
      lastFrame = frame;
      drawCurtains(canvas, width, height, open);
    };
    const resize = new ResizeObserver(() => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      paint();
    });
    resize.observe(stage);

    const media = gsap.matchMedia(scene);
    media.add({ animated: '(prefers-reduced-motion: no-preference)', still: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
      animated = Boolean(conditions?.animated);
      cloth.open = 0;
      paint();
      if (!conditions?.animated) return;

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: () => `+=${scene.querySelector<HTMLElement>('.unveiling__endpoint')?.offsetTop ?? 0}`,
          scrub: 0.28,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .set('.unveiling__face--back', { visibility: 'hidden' }, 0)
        .to('.unveiling__cue', { autoAlpha: 0, duration: 0.34, ease: 'sine.inOut' }, 0.06)
        .to('.unveiling__seal', {
          opacity: 0, yPercent: -55, rotationX: -26, rotationY: 32, duration: 0.56, ease: 'sine.inOut',
        }, 0.04)
        .to('.unveiling__pearls', {
          yPercent: -48, scale: 0.72, opacity: 0, duration: 0.76, ease: 'sine.inOut',
        }, 0.06)
        .to('.unveiling__inscription', { '--matte-opacity': 0, duration: 0.60, ease: 'sine.inOut' }, 0.14)
        .to('.unveiling__sun', { y: () => -stage.clientHeight * 0.065, duration: 0.98 }, 0)
        .to('.unveiling__tides', { y: () => -stage.clientHeight * 0.16, duration: 0.98 }, 0)
        .to('.unveiling__impression', { y: () => -stage.clientHeight * 0.105, duration: 0.98 }, 0)
        .from('.unveiling__turn-cue', { autoAlpha: 0, y: 8, duration: 0.25 }, 0.73)
        .to('.unveiling__location', { autoAlpha: 0, duration: 0.28 }, 0.54)
        .to(cloth, { open: 1, onUpdate: paint, duration: 0.96, ease: 'sine.inOut' }, 0.02)
        .to('.unveiling__inscription', {
          y: () => -stage.clientHeight * 0.30,
          '--title-scale': 0.73, duration: 0.76, ease: 'sine.inOut',
        }, 0.08)
        .fromTo('.unveiling__reveal', { autoAlpha: 0, scale: 0.97, y: () => stage.clientHeight * 0.075 }, {
          autoAlpha: 1, scale: 1, y: 0, duration: 0.74, ease: 'sine.inOut',
        }, 0.24)
        .from('.unveiling__foil', { scaleX: 0, autoAlpha: 0, duration: 0.78, ease: 'sine.out' }, 0.62)
        .from('.unveiling__folio--sage', {
          xPercent: 9, yPercent: 8, rotation: 0, opacity: 0, duration: 0.58, ease: 'sine.out',
        }, 0.75)
        .from('.unveiling__folio--champagne', {
          xPercent: -10, yPercent: -4, rotation: 0, opacity: 0, duration: 0.58, ease: 'sine.out',
        }, 0.86)
        .to('.unveiling__turn-cue', { autoAlpha: 0, y: -8, duration: 0.26 }, 1.36)
        .to('.unveiling__card-turn', { rotationY: 180, duration: 0.83, ease: 'sine.inOut' }, 1.42)
        .set('.unveiling__face--front', { visibility: 'hidden' }, 1.835)
        .set('.unveiling__face--back', { visibility: 'visible' }, 1.835)
        .to('.unveiling__folio--sage', { xPercent: 5, yPercent: 7, rotation: -3, duration: 0.83 }, 1.42)
        .to('.unveiling__folio--champagne', { xPercent: -6, yPercent: 3, rotation: 3, duration: 0.83 }, 1.42);
    });

    return () => {
      resize.disconnect();
      media.revert();
    };
  }, []);

  return (
    <section id="invitation-start" className="unveiling" ref={sceneRef} aria-labelledby="wedding-title" tabIndex={-1}>
      <span id="unveiling-reveal" className="unveiling__endpoint" tabIndex={-1} aria-label="Invitation reveal" />
      <div className="unveiling__stage">
        <div className="unveiling__engraving" aria-hidden="true">
          <div className="unveiling__sun" />
          <div className="unveiling__tides" />
          <div className="unveiling__impression" />
          <div className="unveiling__foil" />
        </div>
        <InvitationCard />
        <canvas ref={curtainRef} className="unveiling__curtains" aria-hidden="true" />
        <div className="unveiling__border" aria-hidden="true" />
        <div className="unveiling__ornaments" aria-hidden="true">
          <div className="unveiling__pearls"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="unveiling__seal" aria-hidden="true">C<span>&amp;</span>D</div>
        <header className="unveiling__inscription">
          <p className="unveiling__eyebrow">{unveiling.introduction}</p>
          <h1 id="wedding-title" aria-label={`${couple.first.fullName} and ${couple.second.fullName}`}>
            <span>{couple.first.displayName}</span>
            <span className="unveiling__ampersand" aria-hidden="true">&amp;</span>
            <span>{couple.second.displayName}</span>
          </h1>
          <time dateTime={ceremony.dateTime}>{ceremony.displayDate}</time>
        </header>
        <p className="unveiling__location">
          {ceremony.venue}<br />
          {ceremony.location}
        </p>
        <a className="unveiling__cue" href="#unveiling-reveal">
          <span className="unveiling__cue-content">
            {unveiling.cue}
            <span className="unveiling__arrow" aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
