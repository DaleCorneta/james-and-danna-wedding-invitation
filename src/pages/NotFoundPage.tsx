import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
      <Link
        to="/"
        className="mt-6 rounded-full px-4 py-2 text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-800"
      >
        Return home
      </Link>
    </section>
  );
}
