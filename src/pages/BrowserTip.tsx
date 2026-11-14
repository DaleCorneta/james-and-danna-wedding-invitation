import './browser-tip.css';

function getBrowserIntent() {
  if (!/\bAndroid\b/i.test(navigator.userAgent)) return;

  const url = new URL(window.location.href);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  url.searchParams.delete('fbclid');
  const scheme = url.protocol.slice(0, -1);
  return `intent://${url.host}${url.pathname}${url.search}${url.hash}#Intent;scheme=${scheme};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${encodeURIComponent(url.href)};end`;
}

export function BrowserTip() {
  const browserIntent = getBrowserIntent();

  return (
    <section className="browser-tip" aria-labelledby="browser-tip-title">
      <div className="browser-tip__inner">
        <h1 id="browser-tip-title">Open the wedding invitation in your browser</h1>
        {browserIntent && (
          <a className="browser-tip__open" href={browserIntent}>Open in default browser</a>
        )}
        <p>{browserIntent ? 'If the invitation stays here, tap' : 'Tap'} the app menu (⋯) and choose <strong>Open in browser</strong>, if available.</p>
      </div>
    </section>
  );
}
