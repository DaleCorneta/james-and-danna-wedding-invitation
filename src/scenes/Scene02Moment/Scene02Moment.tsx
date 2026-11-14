import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import couplePortrait from '../../assets/couple-save-the-date.jpg';
import { weddingContent } from '../../content/weddingContent';
import './scene02.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene02Moment() {
  const sceneRef = useRef<HTMLElement>(null);
  const { couple, unveiling } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const previousStage = scene.previousElementSibling?.querySelector<HTMLElement>('.unveiling__stage');
    const previousReveal = previousStage?.querySelector<HTMLElement>('.unveiling__reveal');
    const previousCard = previousStage?.querySelector<HTMLElement>('.unveiling__card');
    const plate = scene.querySelector<HTMLElement>('.moment__plate');
    const stage = scene.querySelector<HTMLElement>('.moment__stage');
    if (!previousReveal || !previousCard || !plate || !stage) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      // Measure layout coordinates, which stay stable while either stage is sticky.
      const measure = () => {
        const photo = plate.getBoundingClientRect();
        const cardX = previousReveal.offsetLeft + previousCard.offsetLeft + previousCard.offsetWidth / 2;
        const cardY = previousReveal.offsetTop + previousCard.offsetTop + previousCard.offsetHeight / 2;
        return {
          x: stage.getBoundingClientRect().left + cardX - photo.left - photo.width / 2,
          y: cardY
            - (photo.top - stage.getBoundingClientRect().top + photo.height / 2),
          scaleX: previousCard.offsetWidth / photo.width,
          scaleY: previousCard.offsetHeight / photo.height,
        };
      };

      let origin = measure();
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: () => `+=${scene.offsetHeight - stage.offsetHeight * 2}`,
          scrub: 0.24,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            gsap.set(plate, { clearProps: 'transform' });
            origin = measure();
          },
        },
      })
        .from('.moment__wash', { opacity: 0, duration: 0.34, ease: 'sine.inOut' }, 0)
        .fromTo(plate, {
          x: () => origin.x, y: () => origin.y,
          scaleX: () => origin.scaleX, scaleY: () => origin.scaleY,
        }, {
          x: 0, y: 0, scaleX: 1, scaleY: 1,
          duration: 0.39, ease: 'sine.inOut',
        }, 0)
        .from('.moment__photo', { opacity: 0, duration: 0.25, ease: 'sine.inOut' }, 0.05)
        .from('.moment__layout', { opacity: 0, duration: 0.19, ease: 'sine.inOut' }, 0)
        .from('.moment__heading', { opacity: 0, y: 20, duration: 0.25, ease: 'sine.out' }, 0.19)
        .to('.moment__photo img', { scale: 1.075, yPercent: -2, duration: 0.61 }, 0.39)
        .to('.moment__rule', { scaleX: 1.65, duration: 0.55 }, 0.24)
        .fromTo('.moment__paper', { yPercent: 100 }, {
          yPercent: 0, duration: 0.54, ease: 'sine.inOut',
        }, 0.46);
    });

    return () => media.revert();
  }, []);

  return (
    <section className="moment" ref={sceneRef} aria-labelledby="moment-title">
      <div className="moment__stage">
        <div className="moment__wash" aria-hidden="true" />
        <div className="moment__paper" aria-hidden="true" />
        <div className="moment__layout">
          <header className="moment__heading">
            <span className="moment__rule" aria-hidden="true" />
            <h2 id="moment-title">A Moment <em>in Time</em></h2>
            <p>{couple.first.displayName} <span>&amp;</span> {couple.second.displayName}</p>
          </header>
          <figure className="moment__plate">
            <div className="moment__photo">
              <img src={couplePortrait} alt={unveiling.photoDescription} width={1234} height={986} decoding="async" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
