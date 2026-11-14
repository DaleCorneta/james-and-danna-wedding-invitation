import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene03.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene03Written() {
  const sceneRef = useRef<HTMLElement>(null);
  const { couple } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: () => `+=${scene.offsetHeight - 2 * window.innerHeight}`,
          scrub: 0.25,
        },
      })
        .from('.written__paper', { opacity: 0, duration: 0.32 }, 0)
        .from('.written__frame', { opacity: 0, scale: 0.96, duration: 0.39 }, 0.12)
        .from('.written__intro', { autoAlpha: 0, y: 10, duration: 0.24 }, 0.19)
        .from('.written__name', {
          clipPath: 'inset(0 100% 0 0)', autoAlpha: 0, duration: 0.32, stagger: 0.10,
        }, 0.26)
        .from('.written__botanicals--left', {
          xPercent: -22, yPercent: 24, rotation: -9, opacity: 0, duration: 0.48,
        }, 0.23)
        .from('.written__botanicals--right', {
          xPercent: 23, yPercent: 32, rotation: 12, opacity: 0, duration: 0.53,
        }, 0.32)
        .from('.written__ampersand', { opacity: 0, scale: 0.82, duration: 0.2 }, 0.4)
        .to('.written__ampersand', { opacity: 0, scale: 0.75, duration: 0.18 }, 0.82)
        .from('.written__gold-loop', { opacity: 0, scale: 0.65, rotate: -37, duration: 0.22 }, 0.78);
    });

    return () => media.revert();
  }, []);

  return (
    <section className="written" ref={sceneRef} aria-labelledby="written-title">
      <div className="written__stage">
        <div className="written__paper" aria-hidden="true" />
        <div className="written__frame" aria-hidden="true" />
        <div className="written__botanicals written__botanicals--left" aria-hidden="true">
          <span className="written__stem" />
          <span className="written__flower" />
          <span className="written__flower written__flower--bud" />
        </div>
        <div className="written__botanicals written__botanicals--right" aria-hidden="true">
          <span className="written__stem" />
          <span className="written__flower" />
          <span className="written__flower written__flower--bud" />
        </div>
        <header className="written__inscription">
          <p className="written__intro">Together with their families</p>
          <h2 id="written-title" aria-label={`${couple.first.fullName} and ${couple.second.fullName}`}>
            <span className="written__name">{couple.first.fullName}</span>
            <span className="written__join" aria-hidden="true">
              <span className="written__ampersand">&amp;</span>
              <span className="written__gold-loop" />
            </span>
            <span className="written__name">{couple.second.fullName}</span>
          </h2>
        </header>
      </div>
    </section>
  );
}
