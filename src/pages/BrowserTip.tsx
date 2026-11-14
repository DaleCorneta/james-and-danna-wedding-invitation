import './browser-tip.css';

function getBrowserHandoff() {
  const url = new URL(window.location.href);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  url.searchParams.delete('fbclid');
  const scheme = url.protocol.slice(0, -1);
  if (/\b(?:iPhone|iPad|iPod)\b/i.test(navigator.userAgent)) {
    return {
      href: url.href.replace(/^https?:/, scheme === 'https' ? 'googlechromes:' : 'googlechrome:'),
      label: 'Open in Chrome',
      defaultBrowserUrl: url.href,
    };
  }

  if (!/\bAndroid\b/i.test(navigator.userAgent)) return;

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
          <div className="browser-tip__actions">
            <a className="browser-tip__open" href={handoff.href}>{handoff.label}</a>
            {handoff.defaultBrowserUrl && (
              <a className="browser-tip__open browser-tip__open--secondary" href={handoff.defaultBrowserUrl} target="_blank" rel="noopener noreferrer">
                Try default browser
              </a>
            )}
          </div>
        )}
        {handoff?.defaultBrowserUrl && <p>Messenger may keep the new window inside the app.</p>}
        {!handoff && <p>Open this invitation in a standalone browser.</p>}
      </div>
    </section>
  );
}
