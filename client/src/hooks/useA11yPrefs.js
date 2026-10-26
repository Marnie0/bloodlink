// Stub from feat/frontend-setup. R2 replaces this whole file on feat/app-layout.
// Keep the same file name, the same export and the same props (see the DevKit).
// Usage: const [prefs, setPrefs] = useA11yPrefs();  setPrefs({ theme: 'dark' })
// prefs = { size: 'sm' | 'md' | 'lg', contrast: boolean, theme: 'light' | 'dark' }
const DEFAULTS = { size: 'md', contrast: false, theme: 'light' };

export function useA11yPrefs() {
  return [DEFAULTS, () => {}];
}
