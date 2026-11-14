import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import { drawRing } from './ring';
import './scene04.css';

gsap.registerPlugin(ScrollTrigger);

export function Scene04Forever() {
  const sceneRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLCanvasElement>(null);
  const { ceremony } = weddingContent;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const canvas = ringRef.current;
    const loop = scene?.previousElementSibling?.querySelector<HTMLElement>('.written__join');
    const mount = canvas?.parentElement;
    const stage = mount?.closest<HTMLElement>('.forever__stage');
    if (!scene || !canvas || !loop || !mount || !stage) return;

    const spin = { progress: 0 };
    let size = canvas.clientWidth;
    const paint = () => drawRing(canvas, size, spin.progress);
    const resize = new ResizeObserver(() => {
      size = canvas.clientWidth;
      paint();
    });
    resize.observe(canvas);

    const media = gsap.matchMedia(scene);
    media.add({
      animated: '(prefers-reduced-motion: no-preference)',
      still: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
      spin.progress = conditions?.animated ? 0 : 0.32;
      paint();
      if (!conditions?.animated) return;

      const align = () => {
        const source = loop.getBoundingClientRect();
        const target = mount.getBoundingClientRect();
        const previousTop = loop.closest('.written__stage')!.getBoundingClientRect().top;
        const stageTop = stage.getBoundingClientRect().top;
        return {
          x: source.left + source.width / 2 - target.left - target.width / 2,
          y: source.top - previousTop + source.height / 2 - (target.top - stageTop + target.height / 2),
          scale: Math.max(0.12, source.width * 0.66 / target.width),
        };
      };
      let origin = align();
      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: () => `+=${scene.offsetHeight - 2 * stage.offsetHeight}`,
          scrub: 0.25,
          invalidateOnRefresh: true,
          onRefreshInit: () => { origin = align(); },
        },
      })
        .from('.forever__light', { opacity: 0, duration: 0.35 }, 0)
        .fromTo(canvas, {
          x: () => origin.x, y: () => origin.y, scale: () => origin.scale, opacity: 0,
        }, {
          x: 0, y: 0, scale: 1, opacity: 1, duration: 0.43,
        }, 0)
        .to(spin, { progress: 1, duration: 0.92, ease: 'none', onUpdate: paint }, 0.08)
        .from('.forever__details', { autoAlpha: 0, y: 20, duration: 0.37 }, 0.31)
        .from('.forever__horizon', { opacity: 0, scaleX: 0.4, duration: 0.37 }, 0.63)
        .from('.forever__flare', { opacity: 0, scale: 0.28, duration: 0.35 }, 0.65);
    });

    return () => {
      media.revert();
      resize.disconnect();
    };
  }, []);

  return (
    <section className="forever" ref={sceneRef} aria-labelledby="forever-title">
      <div className="forever__stage">
        <div className="forever__light" aria-hidden="true" />
        <div className="forever__horizon" aria-hidden="true" />
        <div className="forever__flare" aria-hidden="true" />
        <div className="forever__layout">
          <div className="forever__mount" aria-hidden="true">
            <canvas className="forever__ring" ref={ringRef} />
          </div>
          <header className="forever__details">
            <h2 id="forever-title">Forever Begins</h2>
            <time dateTime={ceremony.dateTime}>
              <span>{ceremony.displayDate}</span>
              <span>{ceremony.displayTime}</span>
            </time>
          </header>
        </div>
      </div>
    </section>
  );
}
