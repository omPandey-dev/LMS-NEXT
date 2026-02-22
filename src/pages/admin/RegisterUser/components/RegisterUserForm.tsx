import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { UserPlus, Mail, Lock, Shield, User, CheckCircle2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegisterFormData } from '../schemas/registerSchema';

interface RegisterUserFormProps {
  form: UseFormReturn<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
  isSuperAdmin: boolean;
  availableRoles: string[];
}

export const RegisterUserForm = ({
  form,
  onSubmit,
  isLoading,
  isSuperAdmin,
  availableRoles,
}: RegisterUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  return (
    <>
      {/* Registration Form Card */}
      <Card className="border-0 shadow-2xl max-w-3xl mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 border-b border-gray-200">
          <CardTitle className="flex items-center text-lg font-medium">
            <div className="p-1.5 bg-blue-100 rounded-lg mr-2.5">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            User Registration Form
          </CardTitle>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 bg-white">
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Full Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter full name (e.g., John Doe)"
                {...register('fullName')}
                className={`w-full px-4 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.fullName 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                }`}
                autoComplete="name"
              />
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                errors.fullName ? 'text-red-400' : 'text-gray-400'
              }`} />
            </div>
            {errors.fullName && (
              <p className="flex items-center text-xs text-red-600 mt-1">
                <span className="mr-1">⚠</span>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Email Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email address (e.g., user@example.com)"
                {...register('email')}
                className={`w-full px-4 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                }`}
                autoComplete="email"
              />
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                errors.email ? 'text-red-400' : 'text-gray-400'
              }`} />
            </div>
            {errors.email && (
              <p className="flex items-center text-xs text-red-600 mt-1">
                <span className="mr-1">⚠</span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Lock className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password (minimum 6 characters)"
                {...register('password')}
                className={`w-full px-4 py-2.5 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                }`}
                autoComplete="new-password"
              />
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                errors.password ? 'text-red-400' : 'text-gray-400'
              }`} />
            </div>
            {errors.password && (
              <p className="flex items-center text-xs text-red-600 mt-1">
                <span className="mr-1">⚠</span>
                {errors.password.message}
              </p>
            )}
            <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              User Role
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                {...register('role')}
                className={`w-full px-4 py-2.5 pl-10 pr-10 rounded-lg border appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm ${
                  errors.role 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                }`}
              >
                <option value="">Select a user role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'Admin' ? '👑 Admin' :
                     role === 'OrganizationAdmin' ? '🏢 Organization Admin' : 
                     role === 'Teacher' ? '👨‍🏫 Teacher' :
                     role === 'Student' ? '🎓 Student' :
                     role === 'Staff' ? '👔 Staff' :
                     role === 'Parent' ? '👨‍👩‍👧 Parent' : role}
                  </option>
                ))}
              </select>
              <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
                errors.role ? 'text-red-400' : 'text-gray-400'
              }`} />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.role && (
              <p className="flex items-center text-xs text-red-600 mt-1">
                <span className="mr-1">⚠</span>
                {errors.role.message}
              </p>
            )}
            {isSuperAdmin && (
              <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span><span className="font-medium">SuperAdmin Access:</span> You can assign Admin and Organization Admin roles to new users.</span>
                </p>
              </div>
            )}
            {!isSuperAdmin && (
              <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <span className="font-medium">Note:</span> Only SuperAdmin users can create Admin and Organization Admin accounts.
                </p>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-2 border-t border-gray-200">
            <Button 
              type="submit" 
              variant="primary" 
              size="md" 
              isLoading={isLoading}
              className="flex-1 sm:flex-initial min-w-[140px]"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {isLoading ? 'Registering...' : 'Register User'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => reset()}
              disabled={isLoading}
              className="flex-1 sm:flex-initial min-w-[120px]"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Card>

      {/* Info Card */}
      <Card className="border-0 shadow-lg max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="p-5">
          <div className="flex items-start space-x-3">
            <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2.5 text-sm">Role Permissions</h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="font-medium">SuperAdmin:</strong> Full system access and can create Admin and Organization Admin roles</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="font-medium">Admin:</strong> Administrative access (only assignable by SuperAdmin)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="font-medium">Organization Admin:</strong> Organization management access (only assignable by SuperAdmin)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="font-medium">Other Roles:</strong> Teacher, Student, Staff, and Parent can be assigned by authorized users</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
