// Shared primitives for all AI chat patterns.
// Loaded as a Babel script; exports to window.

// Fabric sprite icon — <Icon name="pencil-16x16" />
function Icon({ name, size, color, style = {}, className = '' }) {
  const m = /-(\d+)x(\d+)$/.exec(name);
  const w = size || (m ? +m[1] : 16);
  const h = size || (m ? +m[2] : 16);
  return (
    <svg className={className} width={w} height={h} viewBox={`0 0 ${m ? m[1] : 16} ${m ? m[2] : 16}`}
      aria-hidden="true" style={{ color, flexShrink: 0, ...style }}>
      <use href={`fabric/sprite.svg#${name}`} />
    </svg>
  );
}

// Feather-style inline icons (for AI/chat patterns where sprite doesn't have the right mark)
const Ico = {
  sparkles: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 1.5l1.2 2.8L10 5.5 7.2 6.7 6 9.5 4.8 6.7 2 5.5l2.8-1.2L6 1.5zM12 9l.8 1.8 1.7.7-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.7L12 9z"/>
    </svg>
  ),
  chevR: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2l4 4-4 4"/></svg>
  ),
  chevD: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 4l4 4 4-4"/></svg>
  ),
  check: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2.5 7.5L5.5 10.5 11.5 3.5"/></svg>
  ),
  x: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M2 2l8 8M10 2l-8 8"/></svg>
  ),
  plus: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 2v8M2 6h8"/></svg>
  ),
  search: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="6" cy="6" r="4.25"/><path d="M9 9l3 3"/></svg>
  ),
  paperclip: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12.5 7.2L7.6 12A2.6 2.6 0 1 1 3.9 8.3l4.9-4.8a1.7 1.7 0 0 1 2.4 2.4L6.3 10.7a.85.85 0 1 1-1.2-1.2l4.4-4.4"/></svg>
  ),
  arrowUp: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 12V3M3 7l4-4 4 4"/></svg>
  ),
  externalLink: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 2H2v8h8V7M7 2h3v3M10 2L5 7"/></svg>
  ),
  copy: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="4" width="8" height="8" rx="1.5"/><path d="M2 10V3a1 1 0 0 1 1-1h7"/></svg>
  ),
  download: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 2v7M4 6l3 3 3-3M2.5 11h9"/></svg>
  ),
  filter: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 3h10l-4 5v4l-2-1V8L2 3z"/></svg>
  ),
  doc: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 2h6l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M10 2v3h3"/><path d="M5.5 8h7M5.5 10.5h7M5.5 13h4"/></svg>
  ),
  image: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2.5" y="3" width="13" height="12" rx="1.5"/><circle cx="6.5" cy="7" r="1.2"/><path d="M15.5 12L11 8l-5.5 5.5"/></svg>
  ),
  table: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}><rect x="2.5" y="3" width="13" height="12" rx="1.5"/><path d="M2.5 7h13M2.5 11h13M7 3v12"/></svg>
  ),
  code: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 4L2 8l4 4M10 4l4 4-4 4"/></svg>
  ),
  globe: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="7" cy="7" r="5"/><path d="M2 7h10M7 2a7 7 0 0 1 0 10A7 7 0 0 1 7 2z"/></svg>
  ),
  people: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="7" r="3"/><path d="M3 15c.8-2.8 3.2-4 6-4s5.2 1.2 6 4"/></svg>
  ),
  briefcase: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2.5" y="5" width="13" height="9" rx="1.5"/><path d="M6.5 5V3.5A1.5 1.5 0 0 1 8 2h2a1.5 1.5 0 0 1 1.5 1.5V5"/></svg>
  ),
  shield: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 2l5.5 2v5c0 3.3-2.3 5.8-5.5 7-3.2-1.2-5.5-3.7-5.5-7V4L9 2z"/></svg>
  ),
  grad: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3L1.5 6.5 9 10l7.5-3.5L9 3z"/><path d="M4 8.5V12c0 1.4 2.5 2.5 5 2.5s5-1.1 5-2.5V8.5"/></svg>
  ),
  heart: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 15c-3-2-6-4-6-7.5a3.5 3.5 0 0 1 6-2.5 3.5 3.5 0 0 1 6 2.5C15 11 12 13 9 15z"/></svg>
  ),
  chart: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2.5 14.5h13M5 14V9M9 14V5M13 14v-7"/></svg>
  ),
  at: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><circle cx="7" cy="7" r="2.5"/><path d="M9.5 7v1a1.5 1.5 0 0 0 3 0V7a5.5 5.5 0 1 0-2 4.3"/></svg>
  ),
  mic: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="2" width="4" height="8" rx="2"/><path d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14"/></svg>
  ),
  refresh: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 4V1M10 4H7M2 8v3M2 8h3"/><path d="M3 5a4 4 0 0 1 7-1M9 7a4 4 0 0 1-7 1"/></svg>
  ),
  stop: (p = {}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" {...p}><rect x="1" y="1" width="8" height="8" rx="1"/></svg>
  ),
  dots3: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}><circle cx="3" cy="7" r="1.3"/><circle cx="7" cy="7" r="1.3"/><circle cx="11" cy="7" r="1.3"/></svg>
  ),
  up: (p = {}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 6l3-3 3 3"/></svg>
  ),
  down: (p = {}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 4l3 3 3-3"/></svg>
  ),
  info: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><circle cx="7" cy="7" r="5.5"/><path d="M7 6.5V10M7 4.5v.1"/></svg>
  ),
  calculator: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2.5" y="1.5" width="9" height="11" rx="1.2"/><rect x="4.25" y="3.25" width="5.5" height="1.8" rx=".3"/><circle cx="4.6" cy="6.9" r=".55" fill="currentColor"/><circle cx="7" cy="6.9" r=".55" fill="currentColor"/><circle cx="9.4" cy="6.9" r=".55" fill="currentColor"/><circle cx="4.6" cy="9.3" r=".55" fill="currentColor"/><circle cx="7" cy="9.3" r=".55" fill="currentColor"/><circle cx="9.4" cy="9.3" r=".55" fill="currentColor"/></svg>
  ),
  send: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2L2 6.5l4 1.5L12 2zM12 2l-4 10-2-4 6-6z"/></svg>
  ),
  mapPin: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 13s-4-4-4-7a4 4 0 0 1 8 0c0 3-4 7-4 7z"/><circle cx="7" cy="6" r="1.5"/></svg>
  ),
  mail: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="10" height="8" rx="1.2"/><path d="M2.5 4l4.5 3.5L11.5 4"/></svg>
  ),
  phone: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.75" y="1.5" width="6.5" height="11" rx="1.2"/><path d="M6 10.5h2"/></svg>
  ),
  walking: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="8" cy="2.5" r="1.1"/><path d="M7 5l-1.5 3L4 8.5 3 12M7 5l1.2 2 2 1.3M7 5l-.5 3 2 2-.5 2.5"/></svg>
  ),
  calendar: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="10" height="9" rx="1.2"/><path d="M2 6h10M5 1.5v2.5M9 1.5v2.5"/></svg>
  ),
};

// AI avatar (Anthropic-ish tiny sparkle glyph)
function AIAvatar({ size = 28 }) {
  return (
    <div className="ai-avatar" style={{ width: size, height: size }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5l1.6 3.8L13.5 7l-3.9 1.7L8 12.5 6.4 8.7 2.5 7l3.9-1.7L8 1.5z"/></svg>
    </div>
  );
}

// Tiny primitives used in several patterns
function MsgUser({ children }) {
  return <div className="msg msg-user"><div className="msg-body">{children}</div></div>;
}
function MsgAI({ children, noAvatar }) {
  return (
    <div className="msg msg-ai">
      {!noAvatar && <AIAvatar />}
      <div className="msg-body">{children}</div>
    </div>
  );
}

// Square avatar with rounded corners (BambooHR product style).
// Pass `photo` (url or seed string) for a picture; falls back to a neutral
// person silhouette so unprofiled employees read as generic rather than
// branded by their initials.
function Monogram({ name, color = 'var(--gray-7)', bg = 'var(--gray-2)', size = 32, photo, radius }) {
  const r = radius != null ? radius : Math.max(4, Math.round(size * 0.18));
  // Deterministic placeholder photo url (pravatar) keyed by name
  const seed = encodeURIComponent((name || 'person').toLowerCase().replace(/\s+/g, ''));
  const src = photo === true ? `https://i.pravatar.cc/${size * 2}?u=${seed}`
            : typeof photo === 'string' ? photo : null;
  const iconSize = Math.round(size * 0.58);
  return (
    <div style={{
      width: size, height: size, borderRadius: r, background: bg, color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, overflow: 'hidden'
    }}>
      {src
        ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : (
          <svg width={iconSize} height={iconSize} viewBox="0 0 18 18" fill="none" aria-label={name} role="img">
            <circle cx="9" cy="6.5" r="3" fill="currentColor" />
            <path d="M3 15.5c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        )}
    </div>
  );
}

Object.assign(window, { Icon, Ico, AIAvatar, MsgUser, MsgAI, Monogram });
