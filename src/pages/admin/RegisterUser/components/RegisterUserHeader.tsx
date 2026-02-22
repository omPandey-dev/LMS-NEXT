import { UserPlus } from 'lucide-react';

export const RegisterUserHeader = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-10 rounded-2xl blur-3xl"></div>
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Register New User</h1>
            <p className="text-blue-100 text-sm">Create a new user account for your subscription</p>
          </div>
        </div>
      </div>
    </div>
  );
};
