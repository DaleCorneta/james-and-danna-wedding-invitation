import { useLayoutEffect, useState } from 'react';
import './browser-tip.css';

export function BrowserTip() {
  const [dismissed, setDismissed] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [manualLink, setManualLink] = useState('');

  useLayoutEffect(() => {
    if (dismissed) document.getElementById('invitation-start')?.focus({ preventScroll: true });
  }, [dismissed]);

  if (dismissed) return null;

  async function copyLink() {
    const url = new URL(window.location.href);
    url.searchParams.delete('fbclid');

    try {
      await navigator.clipboard.writeText(url.href);
      setCopyStatus('copied');
    } catch {
      setManualLink(url.href);
      setCopyStatus('manual');
    }
  }

  return (
    <aside className="browser-tip" aria-labelledby="browser-tip-title">
      <div className="browser-tip__inner">
        <h2 id="browser-tip-title">Open in your browser</h2>
        <p>Tap the app’s menu (⋯) and choose Open in browser if available. You can also copy the link and paste it into Safari or Chrome.</p>
        <div className="browser-tip__actions">
          <button type="button" onClick={copyLink}>Copy link</button>
          <button type="button" onClick={() => setDismissed(true)}>Continue here</button>
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
    </aside>
  );
}
