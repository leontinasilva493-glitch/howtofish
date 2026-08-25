const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3110').replace(/\/+$/, '');

let parsedUrl;
try {
  parsedUrl = new URL(siteUrl);
} catch {
  console.error(`Invalid NEXT_PUBLIC_SITE_URL: ${siteUrl}`);
  process.exit(1);
}

if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
  console.error(`NEXT_PUBLIC_SITE_URL must use http or https: ${siteUrl}`);
  process.exit(1);
}

const isLocalUrl = parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1';
if (process.env.REQUIRE_PUBLIC_SITE_URL === 'true' && isLocalUrl) {
  console.error('A public NEXT_PUBLIC_SITE_URL is required for this build.');
  console.error('Set NEXT_PUBLIC_SITE_URL and keep REQUIRE_PUBLIC_SITE_URL=true.');
  process.exit(1);
}

console.log(`Site URL validated: ${siteUrl}${isLocalUrl ? ' (local review)' : ''}`);
