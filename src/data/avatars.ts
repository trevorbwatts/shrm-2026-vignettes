/**
 * Centralized avatar resolver.
 *
 * Every avatar in the prototype goes through this function. To replace a
 * pravatar placeholder with a real photo:
 *
 *   1. Drop a JPG/PNG into `/public/avatars/` (e.g. `/public/avatars/priya-shah.jpg`).
 *   2. Add an entry below mapping the seed to the path.
 *
 * Files in `/public/` are served from the site root, so the URL is just
 * `/avatars/<filename>`. No build step required.
 *
 * Until an override is registered, the helper falls back to pravatar so the
 * UI keeps rendering during the transition.
 */

const localAvatars: Record<string, string> = {
  // Example:
  // 'jess-marketing': '/avatars/jess-marketing.jpg',
  // 'marcus-thompson': '/avatars/marcus-thompson.jpg',
};

export function avatarFor(seed: string, size = 120): string {
  return localAvatars[seed] ?? `https://i.pravatar.cc/${size}?u=${seed}`;
}
