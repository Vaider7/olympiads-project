declare module '*.scss';

interface Window {
  notify: (variant: 'err' | 'success' | 'warn', text: string) => void
}
