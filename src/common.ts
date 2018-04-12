export function err(msg: string): void {
  throw msg || 'Invalid input';
}