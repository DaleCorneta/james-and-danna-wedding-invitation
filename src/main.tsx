import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { InvitationErrorBoundary } from './app/InvitationErrorBoundary';
import { WeddingRouter } from './app/router';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <InvitationErrorBoundary>
      <WeddingRouter />
    </InvitationErrorBoundary>
  </StrictMode>,
);
