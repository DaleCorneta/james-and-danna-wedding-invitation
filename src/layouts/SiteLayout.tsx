import { Outlet } from 'react-router';

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
