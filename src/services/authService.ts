import type { User } from '../types';
import { getItem, setItem, removeItem } from './storage';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

function getUsers(): User[] {
  return getItem<User[]>(USERS_KEY, []);
}

function saveUsers(users: User[]): void {
  setItem(USERS_KEY, users);
}

/**
 * Create a new account. Fails if the email is already registered.
 */
export function signup(email: string, password: string, name: string): AuthResult {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === normalizedEmail)) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password,
    name: name.trim(),
    savedAddresses: [
      {
        id: 'addr-default',
        street: '123 Main Street',
        city: 'Springfield',
        zipCode: '62704',
        label: 'Home',
      },
    ],
  };

  saveUsers([...users, newUser]);
  setItem(CURRENT_USER_KEY, normalizedEmail);

  return { success: true, user: newUser };
}

/**
 * Log in with email and password. Fails if credentials don't match.
 */
export function login(email: string, password: string): AuthResult {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail && u.password === password);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  setItem(CURRENT_USER_KEY, normalizedEmail);
  return { success: true, user };
}

/**
 * Log out the current user.
 */
export function logout(): void {
  removeItem(CURRENT_USER_KEY);
}

/**
 * Get the currently logged-in user, or null if no session exists.
 */
export function getCurrentUser(): User | null {
  const email = getItem<string | null>(CURRENT_USER_KEY, null);
  if (!email) return null;

  const users = getUsers();
  return users.find((u) => u.email === email) ?? null;
}

/**
 * Update profile fields for the current user.
 */
export function updateProfile(updates: Partial<Pick<User, 'name' | 'savedAddresses'>>): User | null {
  const current = getCurrentUser();
  if (!current) return null;

  const users = getUsers();
  const idx = users.findIndex((u) => u.id === current.id);
  if (idx === -1) return null;

  const updated: User = { ...users[idx], ...updates };
  users[idx] = updated;
  saveUsers(users);

  return updated;
}
