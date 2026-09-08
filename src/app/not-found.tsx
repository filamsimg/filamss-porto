import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f4f4f0] text-[#111111] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-display font-bold">404</h1>
      <p className="mt-4 text-base text-[#111111]/70">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-full bg-[#d4e157] text-[#111111] text-xs font-semibold uppercase tracking-wider hover:bg-[#dcec6a] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
