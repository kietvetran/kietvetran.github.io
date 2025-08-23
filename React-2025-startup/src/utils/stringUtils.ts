export function generateId(prefix = 'kvt'): string {
  return `${prefix}-${new Date().getTime()}`;
}

export function capitalize(text: string): string {
  return text.length > 1 ? text[0].toUpperCase() + text.slice(1).toLowerCase() : text;
}
