import './browser-tip.css';

function getAndroidBrowserHandoff() {
  if (!/\bAndroid\b/i.test(navigator.userAgent)) return;

  const url = new URL(window.location.href);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  url.searchParams.delete('fbclid');
  const scheme = url.protocol.slice(0, -1);

  return {
    href: `intent://${url.host}${url.pathname}${url.search}${url.hash}#Intent;scheme=${scheme};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${encodeURIComponent(url.href)};end`,
    label: 'Open in default browser',
  };
}

export function BrowserTip() {
  const handoff = getAndroidBrowserHandoff();
  const isIPhone = /\biPhone\b/i.test(navigator.userAgent);

  return (
    <section className={isIPhone ? 'browser-tip browser-tip--iphone' : 'browser-tip'} aria-labelledby="browser-tip-title">
      {isIPhone && (
        <div className="browser-tip__pointer" aria-hidden="true">
          <span>Tap &#8943; above</span>
          <span className="browser-tip__arrow" />
        </div>
      )}
      <div className="browser-tip__inner">
        <h1 id="browser-tip-title">{isIPhone ? 'Open your wedding invitation' : 'Open the wedding invitation in your browser'}</h1>
        {isIPhone && (
          <ol className="browser-tip__steps">
            <li><strong>Tap the three dots (&#8943;)</strong><span>Look at the top right of the app toolbar, just above the arrow.</span></li>
            <li><strong>Choose Open in browser</strong><span>It may say “Open in external browser.” The full invitation will open there.</span></li>
          </ol>
        )}
        {handoff && (
          <div className="browser-tip__actions">
            <a className="browser-tip__open" href={handoff.href}>{handoff.label}</a>
          </div>
        )}
        {!isIPhone && !handoff && <p>Open this invitation in a standalone browser.</p>}
      </div>
    </section>
  );
}
