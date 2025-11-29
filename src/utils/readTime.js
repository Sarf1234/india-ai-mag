export function calculateReadTime(content = "") {
  if (!content) return 1;
  const plain = content.replace(/<[^>]+>/g, " "); // strip HTML tags
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200)); // 200 wpm
}
