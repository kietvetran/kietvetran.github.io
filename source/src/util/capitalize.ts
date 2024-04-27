export default function capitalize(text: string): string {
    return text.length > 1 ? text[0].toUpperCase() + text.slice(1).toLowerCase() : text;
}
