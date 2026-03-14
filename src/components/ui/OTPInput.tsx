import { useRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
  className?: string;
}

export const OTPInput = ({ length = 6, onComplete, disabled = false, className }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Reset OTP when component mounts or key changes
    setOtp(Array(length).fill(''));
    // Focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
  }, [length]);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits are filled
    if (newOtp.every((digit) => digit !== '') && newOtp.join('').length === length) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      // If all digits are filled, call onComplete
      if (newOtp.every((digit) => digit !== '') && newOtp.join('').length === length) {
        onComplete(newOtp.join(''));
      }
    }
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            'h-12 w-12 rounded-lg border-2 text-center text-lg font-semibold transition-all',
            'focus:outline-none focus:ring-2 focus:ring-blue-400',
            disabled
              ? 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
              : digit
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
              : 'border-blue-200 bg-white text-gray-900 hover:border-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
          )}
        />
      ))}
    </div>
  );
};
