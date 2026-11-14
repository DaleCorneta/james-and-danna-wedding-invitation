import { useState } from 'react';
import './browser-tip.css';

function invitationUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('fbclid');
  return url;
}

export function BrowserTip() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [manualLink, setManualLink] = useState('');

  const url = invitationUrl();
  const scheme = url.protocol.slice(0, -1);
  const browserIntent = /\bAndroid\b/i.test(navigator.userAgent) && (scheme === 'https' || scheme === 'http')
    ? `intent://${url.host}${url.pathname}${url.search}${url.hash}#Intent;scheme=${scheme};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${encodeURIComponent(url.href)};end`
    : undefined;

  async function copyLink() {
    const link = invitationUrl().href;

    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus('copied');
    } catch {
      setManualLink(link);
      setCopyStatus('manual');
    }
  }

  return (
    <section className="browser-tip" aria-labelledby="browser-tip-title">
      <div className="browser-tip__inner">
        <h1 id="browser-tip-title">Open the wedding invitation in your browser</h1>
        <p>{browserIntent ? 'If the button doesn’t open your browser, use' : 'Use'} the app menu to choose <strong>Open in browser</strong>, if available. You can also copy the link and paste it into your browser.</p>
        <div className="browser-tip__actions">
          {browserIntent && <a href={browserIntent}>Open in default browser</a>}
          <button type="button" onClick={copyLink}>Copy link</button>
        </div>
        <p role="status">
          {copyStatus === 'copied' && 'Link copied.'}
          {copyStatus === 'manual' && 'Touch and hold the link to copy it, or select it and use your copy shortcut.'}
        </p>
        {copyStatus === 'manual' && (
          <input
            aria-label="Invitation link"
            value={manualLink}
            readOnly
            onFocus={event => event.currentTarget.select()}
          />
        )}
      </div>
    </section>
  );
}
