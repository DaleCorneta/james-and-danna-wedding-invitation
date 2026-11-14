import './browser-tip.css';

function getBrowserHandoff() {
  const url = new URL(window.location.href);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  url.searchParams.delete('fbclid');
  if (/\b(?:iPhone|iPad|iPod)\b/i.test(navigator.userAgent) && url.protocol === 'https:') {
    return { href: `x-safari-${url.href}`, label: 'Open in Safari' };
  }
  if (!/\bAndroid\b/i.test(navigator.userAgent)) return;

  const scheme = url.protocol.slice(0, -1);
  return {
    href: `intent://${url.host}${url.pathname}${url.search}${url.hash}#Intent;scheme=${scheme};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${encodeURIComponent(url.href)};end`,
    label: 'Open in default browser',
  };
}

export function BrowserTip() {
  const handoff = getBrowserHandoff();

  return (
    <section className="browser-tip" aria-labelledby="browser-tip-title">
      <div className="browser-tip__inner">
        <h1 id="browser-tip-title">Open the wedding invitation in your browser</h1>
        {handoff && (
          <a className="browser-tip__open" href={handoff.href}>{handoff.label}</a>
        )}
        <p>{handoff ? 'If the invitation stays here, tap' : 'Tap'} the app menu (⋯) and choose <strong>Open in browser</strong>, if available.</p>
      </div>
    </section>
  );
}
