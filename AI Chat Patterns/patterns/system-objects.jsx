// System object cards — quiet, scannable references.
// Principle: one icon/avatar · one title · at most one supporting line.
// No "TYPE · REQ-XXXX" eyebrow caps, no tag rows, no action bars.

function SOShell({ left, title, sub, trailing, maxWidth = 380 }) {
  return (
    <div className="ai-card clickable" style={{
      padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center', maxWidth
    }}>
      {left}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        {sub && <div className="sub" style={{ fontSize: 12, marginTop: 1 }}>{sub}</div>}
      </div>
      {trailing}
    </div>
  );
}

// Small rounded tile for the leading icon — one consistent treatment across types.
function SOIcon({ glyph, color, bg }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 8, background: bg, color,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>{glyph}</div>
  );
}

function SOEmployee() {
  return (
    <SOShell
      left={<Monogram name="Maria Jones" size={36} photo="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" />}
      title="Maria Jones"
      sub="Senior Product Designer · Design"
      trailing={<Ico.chevR style={{ color: 'var(--gray-5)' }} />}
    />
  );
}

function SOReport() {
  return (
    <SOShell
      left={<SOIcon glyph={<Ico.chart style={{ width: 18, height: 18 }} />} color="var(--info-dark)" bg="var(--info-light)" />}
      title="Turnover by department"
      sub="Report · refreshed weekly"
      trailing={<Ico.chevR style={{ color: 'var(--gray-5)' }} />}
    />
  );
}

function SOJobOpening() {
  return (
    <SOShell
      left={<SOIcon glyph={<Ico.briefcase style={{ width: 18, height: 18 }} />} color="var(--primary-500)" bg="var(--primary-100)" />}
      title="Senior Backend Engineer"
      sub="48 applicants · open 12 days"
      trailing={<span className="pill pill-info" style={{ fontSize: 11 }}>Sourcing</span>}
    />
  );
}

function SOPolicy() {
  return (
    <SOShell
      left={<SOIcon glyph={<Ico.doc style={{ width: 18, height: 18 }} />} color="var(--gray-7)" bg="var(--gray-1)" />}
      title="US Paid Time-Off Policy"
      sub="Policy · Effective Jan 1, 2026"
      trailing={<Ico.chevR style={{ color: 'var(--gray-5)' }} />}
    />
  );
}

function SOTraining() {
  // Progress is the key data point — keep it as the supporting line, not a bar.
  return (
    <SOShell
      left={<SOIcon glyph={<Ico.grad style={{ width: 18, height: 18 }} />} color="var(--discovery-dark)" bg="var(--discovery-light)" />}
      title="Preventing harassment at work"
      sub={<span>Training · <span style={{ color: 'var(--warning-dark)', fontWeight: 600 }}>Due Dec 31</span></span>}
      trailing={<Ico.chevR style={{ color: 'var(--gray-5)' }} />}
    />
  );
}

function SOBenefitPlan() {
  return (
    <SOShell
      left={<SOIcon glyph={<Ico.heart style={{ width: 18, height: 18 }} />} color="var(--primary-500)" bg="var(--primary-100)" />}
      title="Aetna PPO · Medical"
      sub="Senior Product Designer · Design"
      trailing={<span className="pill pill-primary" style={{ fontSize: 11 }}>Enrolled</span>}
    />
  );
}

// Compact inline reference — appears inline in prose. Clicking opens a small
// employee card popover (headshot, title, status pills, location/email/phone).
function SOInlineRef({ name = 'Maria Jones' }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);

  // Deterministic dummy data keyed by name so each pill shows consistent
  // details whenever re-rendered. Falls back to Maria's data for unknown names.
  const people = {
    'Maria Jones':   { title: 'Senior People Partner', dept: 'People Ops',  city: 'Austin, TX',   tz: 'CST · 9:24 AM', email: 'maria.jones@example.com',   phone: '(512) 555-0147', status: { kind: 'ooo',  label: 'Out until Dec 1' },     badge: { kind: 'anniv', label: '5th Anniversary' } },
    'Jonah Keller':  { title: 'Staff Engineer',        dept: 'Platform',    city: 'Lindon, UT',   tz: 'MST · 7:45 AM', email: 'jonah.keller@example.com',  phone: '(385) 555-0118', status: { kind: 'half', label: 'Half-day Wed' },        badge: { kind: 'bday',  label: 'Birthday Friday' } },
    'Dana Reyes':    { title: 'Director of Engineering', dept: 'Engineering', city: 'Boston, MA', tz: 'EST · 10:24 AM', email: 'dana.reyes@example.com',   phone: '(617) 555-0192', status: null,                                          badge: { kind: 'anniv', label: '2nd Anniversary' } },
    'Priya Nair':    { title: 'Senior SWE',            dept: 'Backend · Eng', city: 'Seattle, WA', tz: 'PST · 7:24 AM', email: 'priya.nair@example.com',   phone: '(206) 555-0164', status: null,                                          badge: null },
    'Kyle Chen':     { title: 'Product Designer',      dept: 'Design',      city: 'Brooklyn, NY', tz: 'EST · 10:24 AM', email: 'kyle.chen@example.com',   phone: '(718) 555-0133', status: null,                                          badge: null },
  };
  const p = people[name] || people['Maria Jones'];

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        ref={triggerRef}
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '2px 10px 2px 4px', borderRadius: 6,
          background: 'var(--primary-100)', color: 'var(--primary-900)',
          fontSize: 13, fontWeight: 600, verticalAlign: 'baseline',
          cursor: 'pointer', userSelect: 'none',
        }}>
        <Monogram name={name} size={20} photo={true} radius={4} />
        {name}
      </span>
      {open && <EmployeePopover name={name} data={p} onClose={() => setOpen(false)} />}
    </span>
  );
}

function EmployeePopover({ name, data, onClose }) {
  React.useEffect(() => {
    const onDoc = () => onClose();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    // Defer the document handler by a frame so the same click that opened us
    // doesn't immediately close us.
    const t = setTimeout(() => document.addEventListener('mousedown', onDoc), 0);
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', onDoc); window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const StatusPill = ({ kind, label }) => {
    const styles = {
      ooo:   { bg: '#FDEDD9', fg: '#A2490A', icon: <Ico.walking /> },
      half:  { bg: '#FDEDD9', fg: '#A2490A', icon: <Ico.walking /> },
    };
    const s = styles[kind] || styles.ooo;
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 6,
        background: s.bg, color: s.fg, fontSize: 12, fontWeight: 600,
      }}>
        <span style={{ display: 'inline-flex' }}>{s.icon}</span>{label}
      </span>
    );
  };
  const BadgePill = ({ label }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 6,
      background: '#E5F0F9', color: '#1B5A8E', fontSize: 12, fontWeight: 600,
    }}>
      <Ico.calendar />{label}
    </span>
  );

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: 'absolute', top: 'calc(100% + 6px)', left: 0,
        width: 340, zIndex: 100,
        background: '#fff', borderRadius: 14,
        border: '1px solid var(--gray-2)',
        boxShadow: '0 14px 36px rgba(0,0,0,.14), 0 2px 6px rgba(0,0,0,.06)',
        padding: 16, fontSize: 13, color: 'var(--gray-9)',
        fontWeight: 400, letterSpacing: 'normal', lineHeight: 1.4,
        textAlign: 'left',
      }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Monogram name={name} size={56} photo={true} radius={12} />
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--gray-9)', lineHeight: 1.2 }}>{name}</div>
          <div style={{ fontSize: 13, color: 'var(--gray-7)', marginTop: 3 }}>
            {data.title} <span style={{ color: 'var(--gray-4)', margin: '0 4px' }}>|</span> {data.dept}
          </div>
        </div>
      </div>

      {/* Status pills */}
      {(data.status || data.badge) && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
          {data.status && <StatusPill kind={data.status.kind} label={data.status.label} />}
          {data.badge && <BadgePill label={data.badge.label} />}
        </div>
      )}

      {/* Details */}
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <InfoRow icon={<Ico.mapPin />}>{data.city} · {data.tz} local time</InfoRow>
        <InfoRow icon={<Ico.mail />}>{data.email}</InfoRow>
        <InfoRow icon={<Ico.phone />}>{data.phone}</InfoRow>
      </div>
    </div>
  );
}

function InfoRow({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--gray-9)' }}>
      <span style={{ color: 'var(--gray-6)', display: 'inline-flex', flexShrink: 0 }}>{icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  );
}

Object.assign(window, { SOEmployee, SOReport, SOJobOpening, SOPolicy, SOTraining, SOBenefitPlan, SOInlineRef });
