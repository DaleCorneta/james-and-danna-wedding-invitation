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
    <section className="browser-tip" aria-labelledby="browser-tip-title">
      {isIPhone && (
        <div className="browser-tip__pointer" aria-hidden="true">
          <span>App menu</span>
          <span className="browser-tip__arrow" />
        </div>
      )}
      <div className="browser-tip__inner">
        <h1 id="browser-tip-title">Open the wedding invitation in your browser</h1>
        {isIPhone && (
          <ol className="browser-tip__steps">
            <li>Tap <strong>⋯</strong> in the top-right corner of the app toolbar, above this page.</li>
            <li>Choose <strong>Open in browser</strong> or <strong>Open in external browser</strong>.</li>
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
