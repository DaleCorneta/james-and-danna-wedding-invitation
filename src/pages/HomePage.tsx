import { lazy, Suspense } from 'react';
import { BrowserTip } from './BrowserTip';
import { InvitationDetails } from './InvitationDetails';

const CinematicInvitation = lazy(() => import('./CinematicInvitation'));
const inAppBrowser = /\b(?:Messenger|MessengerForAndroid|FBAN|FB_IAB|FBAV)\b/i;

export function HomePage() {
  if (inAppBrowser.test(navigator.userAgent)) {
    return <BrowserTip />;
  }

  return (
    <Suspense fallback={<InvitationDetails />}>
      <CinematicInvitation />
    </Suspense>
  );
}
