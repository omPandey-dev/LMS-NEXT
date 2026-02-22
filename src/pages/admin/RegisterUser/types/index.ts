export interface RegisterUserProps {}

export type UserRole = 'Admin' | 'OrganizationAdmin' | 'Teacher' | 'Student' | 'Staff' | 'Parent';

export const USER_ROLES = {
  ADMIN: 'Admin' as const,
  ORGANIZATION_ADMIN: 'OrganizationAdmin' as const,
  TEACHER: 'Teacher' as const,
  STUDENT: 'Student' as const,
  STAFF: 'Staff' as const,
  PARENT: 'Parent' as const,
} as const;
