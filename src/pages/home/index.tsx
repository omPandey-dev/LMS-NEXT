import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] transition-colors">
      <header className="flex h-14 items-center justify-between border-b border-[var(--app-border)] bg-[var(--app-shell)] px-4">
        <h1 className="text-sm font-semibold">LMS Platform</h1>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-3 py-1.5 text-xs font-medium text-[var(--app-text-soft)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-[var(--app-accent)] bg-[var(--app-accent)] px-3 py-1.5 text-xs font-medium text-white hover:brightness-95"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col justify-center px-4 py-10">
        <p className="mb-3 text-xs font-semibold uppercase text-[var(--app-muted)]">Learning Management System</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-normal text-[var(--app-text)]">
          Manage learning operations with a focused enterprise console.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--app-text-soft)]">
          Manage courses, students, instructors, and learning progress from a clean interface built for daily operations.
        </p>

        <Link
          to="/register"
          className="mt-6 w-fit border border-[var(--app-accent)] bg-[var(--app-accent)] px-4 py-2 text-sm font-medium text-white hover:brightness-95"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
