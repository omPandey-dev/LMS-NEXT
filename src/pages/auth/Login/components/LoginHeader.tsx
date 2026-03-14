import { BookOpen } from 'lucide-react';

export const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100 mb-2">Welcome Back</h1>
      <p className="text-slate-600 dark:text-gray-400">Sign in to your LMS account CiCd</p>
    </div>
  );
};
