export function slugify(text: { toString: () => string }) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
  });
}
