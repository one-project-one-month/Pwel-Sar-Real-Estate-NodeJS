export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: '2-digit',
    hour12: false, // This ensures 24-hour format
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
