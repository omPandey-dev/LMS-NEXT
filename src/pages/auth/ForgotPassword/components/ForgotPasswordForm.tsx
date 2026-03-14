import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { OTPInput } from '@/components/ui/OTPInput';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { passwordApi } from '@/api/routes/password';
import { Mail, Lock, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const TIMER_DURATION = 5 * 60; // 5 minutes in seconds

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpKey, setOtpKey] = useState(0);

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeout = useCallback(() => {
    toast.error('Time expired. Please start again.');
    setStep(1);
    setEmail('');
    setOtp('');
    setTimeLeft(TIMER_DURATION);
    setIsOtpModalOpen(false);
    setOtpKey((prev) => prev + 1);
    emailForm.reset();
    passwordForm.reset();
  }, [emailForm, passwordForm]);

  // Timer effect
  useEffect(() => {
    if (step > 1) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, handleTimeout]);

  const handleStep1Submit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      await passwordApi.forgetPassword(data.email);
      setEmail(data.email);
      setStep(2);
      setTimeLeft(TIMER_DURATION);
      // Open OTP modal automatically
      setTimeout(() => setIsOtpModalOpen(true), 100);
      toast.success('OTP sent to your email!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpComplete = async (enteredOtp: string) => {
    setIsLoading(true);
    try {
      await passwordApi.verifyOtp(email, enteredOtp);
      setOtp(enteredOtp);
      setStep(3);
      setIsOtpModalOpen(false);
      toast.success('OTP verified successfully!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid OTP');
      // Reset OTP input by incrementing key
      setOtpKey((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3Submit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      await passwordApi.resetPassword(email, otp, data.newPassword);
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              Forgot Password
            </CardTitle>
            {step > 1 && (
              <div className="flex items-center gap-1 text-sm text-rose-600 dark:text-rose-400">
                <Clock className="h-4 w-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={emailForm.handleSubmit(handleStep1Submit)} className="space-y-5">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
            </div>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              {...emailForm.register('email')}
              error={emailForm.formState.errors.email?.message}
              autoComplete="email"
            />

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
              <Mail className="w-5 h-5 mr-2" />
              Send OTP
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </form>
        )}

        {/* Step 2: Verify OTP - Content shown in modal */}
        {step === 2 && (
          <div className="space-y-4 text-center">
            <p className="text-sm text-slate-600 dark:text-gray-400">
              OTP has been sent to <span className="font-medium text-slate-800 dark:text-gray-200">{email}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-gray-500">
              Please check your email and enter the OTP in the modal that opened.
            </p>
            <button
              type="button"
              onClick={() => setIsOtpModalOpen(true)}
              className="text-sm text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline"
            >
              Open OTP Modal
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setIsOtpModalOpen(false);
                  emailForm.reset();
                  setTimeLeft(TIMER_DURATION);
                }}
                className="text-sm text-slate-600 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Change Email
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={passwordForm.handleSubmit(handleStep3Submit)} className="space-y-5">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
                Create a new password for your account.
              </p>
            </div>
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              {...passwordForm.register('newPassword')}
              error={passwordForm.formState.errors.newPassword?.message}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...passwordForm.register('confirmPassword')}
              error={passwordForm.formState.errors.confirmPassword?.message}
              autoComplete="new-password"
            />

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
              <Lock className="w-5 h-5 mr-2" />
              Reset Password
            </Button>
          </form>
        )}
      </Card>

      {/* OTP Modal */}
      <Modal
        isOpen={isOtpModalOpen}
        onClose={() => {
          // Don't allow closing during OTP entry, only timeout or cancel button
        }}
        title="Enter OTP"
        size="sm"
        showCloseButton={false}
      >
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">
              Enter the 6-digit OTP sent to
            </p>
            <p className="text-sm font-medium text-slate-800 dark:text-gray-200">{email}</p>
          </div>

          <div className="flex justify-center py-4">
            <OTPInput
              key={otpKey}
              length={6}
              onComplete={handleOtpComplete}
              disabled={isLoading}
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-gray-500">
              Time remaining: <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">{formatTime(timeLeft)}</span>
            </p>
          </div>

          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleTimeout();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};
