import { User } from '@supabase/supabase-js';

export function getUserDisplayName(user: User | null): string {
  if (!user) return '';
  return user.user_metadata?.full_name || user.email || 'User';
}

export function formatAuthError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}