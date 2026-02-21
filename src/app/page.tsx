import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">GoldRisk AI / Synorq</h1>
      <p className="text-muted-foreground">Enterprise gold trading risk management</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Giriş
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
