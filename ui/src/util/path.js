export function isExternalURL(path) {
  return path.indexOf('http') > -1;
}

// pageDirectory returns the directory a page is in so we can use it for
// relative links
export function pageDirectory(page) {
  const lastIndex = page.lastIndexOf('/')
  return page.substring(0, lastIndex);
}
