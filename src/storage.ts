export type Profile = {
  name: string;
  age: number;
  occupation: string;
  maritalStatus: string;
  ethnic: string;
  religion: string;
  state: string;
  income: number;
  situation: string;
};

const PROFILE_KEY = 'rakyat-helper:profile';
const AUTH_KEY = 'rakyat-helper:auth';
const SAVED_KEY = 'rakyat-helper:saved';

export function getProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setLoggedIn() {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getSavedIds(): string[] {
  const raw = localStorage.getItem(SAVED_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function toggleSaved(id: string) {
  const ids = getSavedIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}
