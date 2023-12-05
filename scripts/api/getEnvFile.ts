
export function getEnvFile(): string {
  const arg = process.argv.find((a: string) => a.startsWith('--env='));
  if (arg) {
    const envType = arg.split('=')[1];
    if (envType === 'development') {
      return '.env.development';
    }
    if (envType === 'production') {
      return '.env.production';
    }
  }
  return '.env';
}
