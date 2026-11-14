import { Component } from 'react';
import type { ReactNode } from 'react';
import { weddingContent } from '../content/weddingContent';

export class InvitationErrorBoundary extends Component<{ children: ReactNode }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;

    const { ceremony, couple, rsvp } = weddingContent;
    return (
      <main className="invitation-recovery" aria-labelledby="recovery-title">
        <h1 id="recovery-title">{couple.first.displayName} &amp; {couple.second.displayName}</h1>
        <p>The interactive invitation couldn’t open.</p>
        <p><time dateTime={ceremony.dateTime}>{ceremony.displayDate} · {ceremony.displayTime}</time></p>
        <p>{ceremony.venue}<br />{ceremony.location}</p>
        <button type="button" onClick={() => window.location.reload()}>Reload invitation</button>
        <a href={rsvp.formUrl}>Open RSVP form</a>
      </main>
    );
  }
}
