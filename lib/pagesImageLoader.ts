/** Image loader for the GitHub Pages review build only (see next.config.ts).
 * Pages serves the site from a repo sub-path, and next/image does not prefix
 * that sub-path onto root-relative `src` strings such as `/images/logo.png`.
 * Images are served as-is (no resizing service on static hosting), so the
 * same file is returned for every requested width. */
export default function pagesImageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
