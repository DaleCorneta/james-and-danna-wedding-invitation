import { useEffect, useRef, useState } from 'react';
import { weddingContent } from '../../content/weddingContent';

const { rsvp } = weddingContent;
const formOrigin = new URL(rsvp.formUrl).origin;
const loadTimeout = 20_000;

export function RespondForm() {
  const regionRef = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    const nearby = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRequested(true);
      nearby.disconnect();
    }, { rootMargin: '75% 0px' });
    nearby.observe(region);
    return () => nearby.disconnect();
  }, []);

  useEffect(() => {
    if (!requested || status !== 'loading') return;

    const handleBlocked = (event: SecurityPolicyViolationEvent) => {
      if (event.disposition === 'enforce' && ['frame-src', 'child-src'].includes(event.effectiveDirective)
        && (event.blockedURI === formOrigin || event.blockedURI.startsWith(`${formOrigin}/`))) {
        setStatus('failed');
      }
    };
    document.addEventListener('securitypolicyviolation', handleBlocked);
    const timer = window.setTimeout(() => setStatus('failed'), loadTimeout);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleBlocked);
      window.clearTimeout(timer);
    };
  }, [requested, status]);

  useEffect(() => {
    const region = regionRef.current;
    if (status !== 'failed' || !region || history.state?.rsvpRedirected) return;

    const openIfVisible = () => {
      const { top, bottom, height } = region.getBoundingClientRect();
      const visibleHeight = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
      if (document.visibilityState === 'visible' && height > 0 && visibleHeight >= height / 2
        && getComputedStyle(region).visibility === 'visible') {
        window.clearInterval(timer);
        history.replaceState({ ...history.state, rsvpRedirected: true }, '');
        window.location.assign(rsvp.formUrl);
      }
    };

    // Check after the scroll reveal, which changes CSS visibility without moving the section.
    const timer = window.setInterval(openIfVisible, 250);
    openIfVisible();
    return () => window.clearInterval(timer);
  }, [status]);

  return (
    <div className="respond__form-region" ref={regionRef}>
      {requested && status !== 'failed' && (
        <iframe
          className="respond__form"
          src={rsvp.formUrl}
          title="Christian James and Dana Cheyenne's RSVP form"
          // Cross-origin frame load can also fire on error pages. Keep the direct link available.
          onLoad={() => setStatus(current => current === 'loading' ? 'loaded' : current)}
          onError={() => setStatus('failed')}
        />
      )}
      {status !== 'loaded' && (
        <div className="respond__status" role="status">
          <p>{status === 'failed' ? 'The embedded RSVP form couldn’t load.' : 'Loading the RSVP form…'}</p>
          <p>Kindly reply by <time dateTime={rsvp.deadline}>{rsvp.displayDeadline}</time>.</p>
        </div>
      )}
    </div>
  );
}
