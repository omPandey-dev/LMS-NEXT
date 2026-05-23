import { LoginForm } from './components/LoginForm';
import { useLogin } from './hooks/useLogin';
import { BookOpen, GraduationCap, MonitorPlay, Sparkles } from 'lucide-react';

export const Login = () => {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] transition-colors">
      <div className="grid min-h-screen w-full bg-[var(--app-panel)] md:grid-cols-[1fr_1fr]">
        <section className="relative flex min-h-[48vh] flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#5764b8] via-[#3d91b1] to-[#45b9aa] px-8 py-9 text-white md:min-h-screen">
          <div className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="h-6 w-6" />
            <span>LMS</span>
          </div>

          <div className="z-10 max-w-xs text-center">
            <p className="text-base font-semibold leading-7">Learning online is easier than ever before with LMS!</p>
          </div>

          <div className="relative z-10 mb-4 flex w-full max-w-sm justify-center">
            <div className="relative h-56 w-full">
              <div className="absolute left-1/2 top-3 h-40 w-64 -translate-x-1/2 rounded-full border border-white/35" />
              <div className="absolute bottom-9 left-1/2 h-28 w-48 -translate-x-1/2 rounded-lg border-8 border-slate-800 bg-white shadow-xl">
                <div className="flex h-full items-center justify-center bg-slate-50">
                  <MonitorPlay className="h-16 w-16 text-[#5865c7]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 h-4 w-64 -translate-x-1/2 rounded-full bg-slate-800" />
              <div className="absolute bottom-10 left-3 flex h-20 w-14 flex-col items-center justify-end">
                <div className="h-9 w-9 rounded-full bg-[#f5b15f]" />
                <div className="h-12 w-12 rounded-t-full bg-[#f07b51]" />
              </div>
              <div className="absolute bottom-10 right-6 flex h-24 w-14 flex-col items-center justify-end">
                <div className="h-8 w-8 rounded-full bg-[#f5b15f]" />
                <div className="h-14 w-10 rounded-t-full bg-[#5663b7]" />
              </div>
              <div className="absolute left-10 top-16 rounded-full bg-white/20 p-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="absolute right-10 top-11 rounded-full bg-white/20 p-2">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-[52vh] items-center justify-center px-6 py-10 sm:px-10 md:min-h-screen">
          <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </section>
      </div>
    </div>
  );
};
