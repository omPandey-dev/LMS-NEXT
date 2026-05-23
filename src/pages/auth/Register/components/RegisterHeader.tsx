import { BookOpen } from 'lucide-react';

export const RegisterHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-[var(--app-accent)]">
        <BookOpen className="h-6 w-6 text-white" />
      </div>
      <h1 className="mb-2 text-xl font-semibold text-[var(--app-text)]">Create Account</h1>
      <p className="text-sm text-[var(--app-muted)]">Join our LMS platform today</p>
    </div>
  );
};
