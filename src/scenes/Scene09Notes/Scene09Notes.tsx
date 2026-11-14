import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingContent } from '../../content/weddingContent';
import './scene09.css';

gsap.registerPlugin(ScrollTrigger);

const { guestNotes, rsvp } = weddingContent;
const notes = [
  { title: 'An Adults-Only Celebration', copy: guestNotes.agePolicy },
  { title: 'Reserved Seats', copy: `${rsvp.plusOne} We can only accommodate the guests named on your invitation.` },
  { title: 'A Note on Gifts', copy: guestNotes.gifts },
  { title: 'After the Reception', copy: guestNotes.afterParty },
];

export function Scene09Notes() {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const paper = scene?.querySelector('.guest-notes__paper');
    const ending = scene?.querySelector('.guest-notes__ending');
    const handoff = scene?.querySelector('.guest-notes__handoff');
    if (!scene || !paper || !ending || !handoff) return;

    const media = gsap.matchMedia(scene);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.guest-notes__title-rule', {
        scaleX: 0.12,
        ease: 'sine.out',
        scrollTrigger: { trigger: paper, start: 'top bottom', end: 'top 32%', scrub: 0.22 },
      });

      for (const note of scene.querySelectorAll('.guest-notes__entry')) {
        gsap.from(note.querySelector('.guest-notes__entry-rule'), {
          scaleX: 0.12,
          ease: 'sine.out',
          scrollTrigger: { trigger: note, start: 'top 96%', end: 'top 56%', scrub: 0.22 },
        });
      }

      gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: ending, start: 'top 92%',
          end: () => {
            // The handoff is one and a half scene heights, including when the phone toolbar moves.
            const sceneHeight = handoff.clientHeight / 1.5;
            return ending.getBoundingClientRect().bottom + window.scrollY - handoff.clientHeight - sceneHeight;
          },
          scrub: 0.24,
          invalidateOnRefresh: true,
        },
      })
        .from('.guest-notes__letter', { yPercent: -80, duration: 0.58 }, 0)
        .from('.guest-notes__flap', { rotationX: -166, duration: 0.48 }, 0.48)
        .from('.guest-notes__seal', { opacity: 0, scale: 0.64, duration: 0.24 }, 0.76);
    });

    return () => media.revert();
  }, []);

  return (
    <section className="guest-notes" ref={sceneRef} aria-labelledby="guest-notes-title">
      <div className="guest-notes__paper">
        <header className="guest-notes__heading">
          <span className="guest-notes__title-rule" aria-hidden="true" />
          <h2 id="guest-notes-title">A Few Loving Notes</h2>
        </header>
        <div className="guest-notes__entries">
          {notes.map(({ title, copy }) => (
            <div className="guest-notes__entry" key={title}>
              <div className="guest-notes__entry-rule" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="guest-notes__ending" aria-hidden="true">
        <div className="guest-notes__envelope-stage">
          <div className="guest-notes__envelope">
            <div className="guest-notes__letter" />
            <div className="guest-notes__pocket" />
            <div className="guest-notes__flap" />
            <span className="guest-notes__seal">C &amp; D</span>
          </div>
        </div>
        <div className="guest-notes__handoff" />
      </div>
    </section>
  );
}
