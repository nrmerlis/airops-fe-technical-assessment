export function formatRelativeDate(timestamp: number): string {
  const now = new Date();
  const date = new Date(timestamp * 1000);
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Today';
  }

  if (diffInDays === 1) {
    return 'Yesterday';
  }

  if (diffInDays < 7) {
    return `${diffInDays} Days Ago`;
  }

  if (diffInDays < 14) {
    return 'This Week';
  }

  return date.toLocaleDateString();
}
