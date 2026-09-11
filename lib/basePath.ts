// Set by CI when deploying to a GitHub Pages project site (served from
// /<repo>/ instead of /). Empty locally and on any host serving from root.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The origin CI is actually deploying to (e.g. https://unclepauliees.github.io
// for a Pages review build). Falls back to the real production domain so
// metadata stays correct there once the site ships.
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://theconcretegrp.com";

// Full absolute base URL (origin + basePath), for anywhere an OG/Twitter
// crawler needs a fully-qualified link since it won't resolve root-relative
// paths the way a browser would.
export const siteUrl = `${siteOrigin}${basePath}`;
