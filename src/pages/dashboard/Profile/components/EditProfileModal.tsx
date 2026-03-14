import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import type { UserInfo } from '@/types';

const profileSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserInfo | null;
}

export const EditProfileModal = ({ isOpen, onClose, user }: EditProfileModalProps) => {
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
      fullName: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        email: user.email || '',
        fullName: '',
        phone: '',
      });
    }
  }, [isOpen, user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when backend endpoint is available
      // await profileApi.updateProfile(data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
            autoComplete="email"
          />

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register('fullName')}
            error={errors.fullName?.message}
            autoComplete="name"
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register('phone')}
            error={errors.phone?.message}
            autoComplete="tel"
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Save Changes
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
