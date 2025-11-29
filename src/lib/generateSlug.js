export function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")            // remove quotes
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")     // replace non-alnum with -
    .replace(/^-+|-+$/g, "");        // trim hyphens
}
