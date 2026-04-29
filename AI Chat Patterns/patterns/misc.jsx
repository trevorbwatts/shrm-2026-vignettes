// Sources, loading states, filtering, context pills, file upload

// ===== Sources =====
function SourcesRow() {
  const src = [
    { name: 'US PTO Policy 2026.pdf', meta: 'Policy · p. 3' },
    { name: 'Maria Jones', meta: 'Employee record' },
    { name: 'Accrual rules', meta: 'Config · Salaried US' },
  ];
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-6)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>Sources</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {src.map((s, i) => (
          <div key={i} className="clickable" style={{
            border: '1px solid var(--gray-2)', borderRadius: 1000, padding: '3px 10px 3px 4px',
            background: '#fff', display: 'inline-flex', alignItems: 'center', gap: 6, maxWidth: 220,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--primary-100)', color: 'var(--primary-900)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, flexShrink: 0,
              fontVariantNumeric: 'tabular-nums',
            }}>{i + 1}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--gray-9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {s.name}
              <span style={{ color: 'var(--gray-6)', fontWeight: 400 }}> · {s.meta.split(' · ').slice(-1)[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourcesInline() {
  // sentence with inline numbered citations in primary green
  const citeStyle = {
    color: 'var(--primary-900)',
    textDecoration: 'none',
    background: 'var(--primary-100)',
    borderRadius: 3,
    padding: '1px 5px',
    fontSize: 10,
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
    cursor: 'pointer',
  };
  return (
    <div style={{ fontSize: 14, color: 'var(--gray-9)', lineHeight: 1.55 }}>
      Maria has <b>12.5 days</b> of PTO remaining this year
      <sup style={{ marginLeft: 2 }}><a style={citeStyle}>1</a></sup>,
      based on the US salaried accrual rate of 1.67 days/month
      <sup style={{ marginLeft: 2 }}><a style={citeStyle}>2</a></sup>.
      Her next accrual posts Dec 1.
    </div>
  );
}

// ===== Loading states =====
function LoadTyping() {
  const phrases = [
    'Thinking',
    'Checking employee records',
    'Pulling PTO balances',
    'Reading your policy docs',
    'Cross-referencing pay bands',
    'Summarizing Q3 ratings',
    'Looking at recent hires',
    'Gathering turnover data',
    'Scanning open reqs',
    'Drafting a response',
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % phrases.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ai-card" style={{ padding: '12px 14px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <div className="dots"><i/><i/><i/></div>
      <span key={i} style={{
        fontSize: 13, color: 'var(--gray-7)',
        animation: 'ltFade .45s ease-out'
      }}>{phrases[i]}…</span>
      <style>{`@keyframes ltFade { from { opacity: 0; transform: translateY(2px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}

function LoadShimmer() {
  return (
    <div className="ai-card" style={{ padding: '14px 16px', maxWidth: 420 }}>
      <div className="skel" style={{ height: 13, width: '62%', marginBottom: 8 }} />
      <div className="skel" style={{ height: 13, width: '88%', marginBottom: 8 }} />
      <div className="skel" style={{ height: 13, width: '76%', marginBottom: 8 }} />
      <div className="skel" style={{ height: 13, width: '40%' }} />
    </div>
  );
}

function LoadStatus() {
  return (
    <div className="ai-card" style={{ padding: '12px 14px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <div className="spinner" />
      <span style={{ fontSize: 13, color: 'var(--gray-8)', fontWeight: 500 }}>Searching employee records</span>
      <span style={{ fontSize: 12, color: 'var(--gray-6)' }}>· 3 of 142</span>
    </div>
  );
}

function LoadSkeletonCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 440 }}>
      {[0, 1, 2].map(i => (
        <div key={i} className="ai-card" style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="skel" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <div style={{ flex: 1 }}>
            <div className="skel" style={{ height: 13, width: `${60 - i * 8}%`, marginBottom: 7 }} />
            <div className="skel" style={{ height: 11, width: `${40 + i * 6}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadProgress() {
  const [pct, setPct] = React.useState(32);
  React.useEffect(() => {
    const t = setInterval(() => setPct(p => (p >= 92 ? 32 : p + 6)), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ai-card" style={{ padding: '14px 16px', maxWidth: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Ico.sparkles style={{ color: 'var(--primary-500)' }} />
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>Generating Q4 comp review packets</div>
        <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: 'var(--gray-7)', fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
      </div>
      <div style={{ height: 6, background: 'var(--gray-2)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--primary-500)', transition: 'width .5s ease' }} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray-6)', marginTop: 6 }}>45 of 142 · about 90 seconds left</div>
    </div>
  );
}

// ===== Filtering =====
// Scope pills live INSIDE the composer (the input you're about to send from),
// NOT in the already-sent conversation thread. They pre-filter what the AI
// will search/answer across on the NEXT send. Toggling a pill doesn't ping
// the AI — only hitting send does. Scope persists across sends until the
// user clears it, so a whole back-and-forth can share the same scope.
function FilterScope() {
  const [chips, setChips] = React.useState([
    { l: 'Engineering', on: true },
    { l: 'Last 90 days', on: true },
    { l: 'Salaried only', on: false },
    { l: 'US', on: true },
  ]);
  const toggle = i => setChips(chips.map((c, j) => j === i ? { ...c, on: !c.on } : c));
  const activeCount = chips.filter(c => c.on).length;
  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      {/* The composer: pills row + input row, both in ONE card so it reads
          as a single send-surface (not a separate toolbar above the chat). */}
      <div style={{
        background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)', overflow: 'hidden',
      }}>
        {/* Pills row */}
        <div style={{ padding: '9px 12px', borderBottom: '1px solid var(--gray-2)', background: 'var(--gray-1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: 'var(--gray-7)', paddingRight: 2, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              <Ico.filter style={{ color: 'var(--gray-6)' }} />Scope
            </div>
            {chips.map((c, i) => (
              <button key={c.l} onClick={() => toggle(i)} style={{
                padding: '3px 10px 3px 8px', borderRadius: 1000,
                background: c.on ? 'var(--primary-500)' : '#fff',
                color: c.on ? '#fff' : 'var(--gray-8)',
                border: `1px solid ${c.on ? 'var(--primary-500)' : 'var(--gray-3)'}`,
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'inherit',
              }}>
                {c.on ? <Ico.check style={{ width: 10, height: 10 }} /> : <Ico.plus style={{ width: 10, height: 10 }} />}
                {c.l}
              </button>
            ))}
            <button style={{ fontSize: 11, color: 'var(--gray-6)', background: 'none', border: 0, cursor: 'pointer', marginLeft: 'auto', fontFamily: 'inherit' }}>Clear</button>
          </div>
        </div>
        {/* Input row — makes it clear the pills are part of the composer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px 8px 14px' }}>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-6)' }}>
            Ask about your scoped data…
          </div>
          <button className="fbtn fbtn-primary" style={{
            width: 30, height: 30, padding: 0, borderRadius: 8,
          }} aria-label="Send"><Ico.arrowUp /></button>
        </div>
      </div>
      {/* Caption — removes ambiguity about where these pills live */}
      <div style={{
        marginTop: 8, padding: '8px 11px',
        background: '#EBF3FB', border: '1px solid #D4E8FA', borderRadius: 8,
        fontSize: 12, color: '#1B4E7A', lineHeight: 1.45,
        display: 'flex', alignItems: 'flex-start', gap: 8,
      }}>
        <Ico.info style={{ color: '#1B7AC2', marginTop: 1, flexShrink: 0 }} />
        <div>
          Scope pills live <b>inside the composer</b>, not in the sent thread. {activeCount} of {chips.length} active — on send, the AI only searches matching records. Scope persists across sends until cleared.
        </div>
      </div>
    </div>
  );
}

function FilterRefine() {
  const [q, setQ] = React.useState('');
  const allRows = [
    { n: 'Priya Nair', d: 'Backend · Eng', ti: 'Senior SWE' },
    { n: 'Jonah Keller', d: 'Platform · Eng', ti: 'Staff SWE' },
    { n: 'Sam Chen', d: 'Frontend · Eng', ti: 'SWE II' },
    { n: 'Aiko Tanaka', d: 'SRE · Eng', ti: 'Senior SWE' },
    { n: 'Marc Silva', d: 'Backend · Eng', ti: 'SWE II' },
  ];
  const [role, setRole] = React.useState('all');
  let rows = allRows;
  if (q) rows = rows.filter(r => (r.n + r.d + r.ti).toLowerCase().includes(q.toLowerCase()));
  if (role === 'senior') rows = rows.filter(r => r.ti.startsWith('Senior') || r.ti.startsWith('Staff'));
  return (
    <div className="ai-card" style={{ padding: 0, maxWidth: 460, overflow: 'hidden' }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--gray-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>5 engineers match</div>
          <span className="pill" style={{ fontSize: 11 }}>{rows.length} shown</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid var(--gray-3)', borderRadius: 6, padding: '5px 10px', background: '#fff'
          }}>
            <Ico.search style={{ color: 'var(--gray-6)' }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Refine this list…"
              style={{ border: 0, outline: 'none', flex: 1, fontSize: 13, background: 'transparent', color: 'var(--gray-9)', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'inline-flex', padding: 2, borderRadius: 6, background: 'var(--gray-1)', border: '1px solid var(--gray-2)' }}>
            {[['all', 'All'], ['senior', 'Senior+']].map(([k, l]) => (
              <button key={k} onClick={() => setRole(k)} style={{
                padding: '4px 10px', border: 0, borderRadius: 4,
                background: role === k ? '#fff' : 'transparent',
                color: role === k ? 'var(--gray-9)' : 'var(--gray-7)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                boxShadow: role === k ? '0 1px 2px rgba(0,0,0,.08)' : 'none'
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div>
        {rows.length === 0 && (
          <div style={{ padding: 20, fontSize: 13, color: 'var(--gray-6)', textAlign: 'center' }}>No matches.</div>
        )}
        {rows.map((r, i) => (
          <div key={r.n} style={{ padding: '10px 14px', borderTop: i === 0 ? 0 : '1px solid var(--gray-2)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <Monogram name={r.n} size={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>{r.n}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-6)' }}>{r.ti} · {r.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Context pills =====
// Quiet, single neutral surface for all pills. Icon color does the categorization
// (cheaper than a full-bleed tint), so the pills don't fight with the message.
function ContextPill({ type, label, onRemove }) {
  const iconColor = type === 'file' ? 'var(--info-dark)' : 'var(--primary-500)';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: onRemove ? '3px 4px 3px 8px' : '3px 9px',
      borderRadius: 1000,
      background: 'var(--gray-1)',
      color: 'var(--gray-8)',
      fontSize: 12, fontWeight: 500,
      border: '1px solid var(--gray-2)'
    }}>
      <span style={{ color: iconColor, display: 'inline-flex' }}>
        {type === 'file' ? <Ico.doc style={{ width: 12, height: 12 }} /> : <Ico.at style={{ width: 12, height: 12 }} />}
      </span>
      {label}
      {onRemove && (
        <button onClick={onRemove} aria-label={`Remove ${label}`} style={{
          background: 'transparent', border: 0, padding: 2, cursor: 'pointer',
          color: 'var(--gray-6)', opacity: .8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999
        }}>
          <Ico.x style={{ width: 10, height: 10 }} />
        </button>
      )}
    </div>
  );
}

function ContextComposer(props = {}) {
  const [pills, setPills] = React.useState([
    { l: 'Engineering · Dept', type: 'object' },
    { l: 'Q3 Performance Cycle', type: 'object' },
    { l: 'comp-bands-2026.pdf', type: 'file' },
  ]);
  const [text, setText] = React.useState('Summarize Q3 ratings for engineering and flag outliers');
  const [pickerOpen, setPickerOpen] = React.useState(props.pickerOpen || false);
  const addBtnRef = React.useRef(null);
  return (
    <div style={{
      border: '1px solid var(--gray-3)', borderRadius: 16, background: '#fff',
      padding: 12, maxWidth: 540, boxShadow: '0 1px 2px rgba(0,0,0,.04)', position: 'relative'
    }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {pills.map((p, i) => (
          <ContextPill key={i} type={p.type} label={p.l}
            onRemove={() => setPills(pills.filter((_, j) => j !== i))} />
        ))}
        <button
          ref={addBtnRef}
          onClick={() => setPickerOpen(o => !o)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 1000,
            background: pickerOpen ? 'var(--gray-1)' : 'transparent',
            border: '1px dashed var(--gray-4)', color: 'var(--gray-6)',
            fontSize: 12, fontWeight: 500, cursor: 'pointer'
          }}>
          <Ico.plus style={{ width: 10, height: 10 }} /> Add context
        </button>
        {pickerOpen && (
          <ContextPicker
            anchor="top"
            alreadyAdded={new Set(pills.map(p => p.l))}
            onPick={p => { setPills(prev => [...prev, p]); setPickerOpen(false); }}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)}
        style={{
          width: '100%', border: 0, outline: 'none', resize: 'none', fontSize: 14,
          fontFamily: 'inherit', color: 'var(--gray-9)', minHeight: 24, padding: 0, background: 'transparent'
        }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <button className="fbtn fbtn-outlined fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.paperclip /></button>
        <button className="fbtn fbtn-outlined fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.mic /></button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: 'var(--gray-6)' }}>claude · haiku</div>
        <button className="fbtn fbtn-primary fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.arrowUp /></button>
      </div>
    </div>
  );
}

// ===== Add-context picker =====
// Popover that appears when user clicks "Add context" (or types @ in the composer).
// Searchable, grouped by category. Selecting an item adds a pill and closes.
function ContextPicker({ onPick, onClose, alreadyAdded = new Set(), anchor = 'top' }) {
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('all');
  const inputRef = React.useRef(null);
  React.useEffect(() => { inputRef.current?.focus(); }, []);
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Realistic HRIS / Fabric-ish surface area
  const catalog = [
    { g: 'People',    type: 'object', icon: 'user',  items: ['Maria Jones', 'Dana Reyes', 'Priya Nair', 'Kyle Chen'] },
    { g: 'Teams',     type: 'object', icon: 'users', items: ['Engineering · Dept', 'Backend · Team', 'US Hourly · Group'] },
    { g: 'Cycles',    type: 'object', icon: 'at',    items: ['Q3 Performance Cycle', 'Q4 Planning', '2026 Comp Review'] },
    { g: 'Reports',   type: 'object', icon: 'chart', items: ['Headcount by dept', 'Attrition · last 90d', 'Open reqs'] },
    { g: 'Documents', type: 'file',   icon: 'doc',   items: ['comp-bands-2026.pdf', 'PTO Policy 2026.md', 'Hiring Guide v4.pdf'] },
  ];

  const cats = [
    { id: 'all',    label: 'All'       },
    { id: 'People', label: 'People'    },
    { id: 'Teams',  label: 'Teams'     },
    { id: 'Cycles', label: 'Cycles'    },
    { id: 'Reports',label: 'Reports'   },
    { id: 'Documents', label: 'Files'  },
  ];

  const recent = ['Q3 Performance Cycle', 'Maria Jones', 'comp-bands-2026.pdf'];

  const ql = q.trim().toLowerCase();
  const groups = catalog
    .filter(c => cat === 'all' || c.g === cat)
    .map(c => ({
      ...c,
      items: c.items.filter(it => !ql || it.toLowerCase().includes(ql))
    }))
    .filter(c => c.items.length > 0);

  const getIcon = (kind) => {
    if (kind === 'user')  return <Ico.people style={{ width: 14, height: 14 }} />;
    if (kind === 'users') return <Ico.people style={{ width: 14, height: 14 }} />;
    if (kind === 'chart') return <Ico.chart  style={{ width: 14, height: 14 }} />;
    if (kind === 'doc')   return <Ico.doc    style={{ width: 14, height: 14 }} />;
    return <Ico.at style={{ width: 14, height: 14 }} />;
  };

  const pos = anchor === 'top'
    ? { top: 'calc(100% + 6px)', left: 0 }
    : { bottom: 'calc(100% + 6px)', left: 0 };

  return (
    <>
      {/* click-away scrim */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 10, background: 'transparent'
      }} />
      <div style={{
        position: 'absolute', ...pos, width: 340, maxHeight: 380,
        display: 'flex', flexDirection: 'column',
        background: '#fff', borderRadius: 12, overflow: 'hidden',
        border: '1px solid var(--gray-2)',
        boxShadow: '0 12px 28px rgba(0,0,0,.12), 0 2px 6px rgba(0,0,0,.06)',
        zIndex: 20, fontSize: 13
      }}>
        {/* search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid var(--gray-2)' }}>
          <Ico.search style={{ width: 14, height: 14, color: 'var(--gray-6)' }} />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search people, teams, reports, files…"
            style={{
              flex: 1, border: 0, outline: 'none', fontSize: 13,
              fontFamily: 'inherit', color: 'var(--gray-9)', background: 'transparent'
            }}
          />
          <span style={{
            fontSize: 10, color: 'var(--gray-6)', fontWeight: 600,
            border: '1px solid var(--gray-2)', borderRadius: 4, padding: '1px 5px'
          }}>esc</span>
        </div>

        {/* category filter chips */}
        <div style={{
          display: 'flex', gap: 6,
          padding: '8px 12px 10px',
          borderBottom: '1px solid var(--gray-2)',
          overflowX: 'auto'
        }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              height: 22, padding: '0 10px', borderRadius: 1000,
              display: 'inline-flex', alignItems: 'center',
              background: cat === c.id ? 'var(--gray-9)' : 'transparent',
              color:      cat === c.id ? '#fff'          : 'var(--gray-7)',
              border: cat === c.id ? '1px solid var(--gray-9)' : '1px solid var(--gray-2)',
              fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              lineHeight: 1
            }}>{c.label}</button>
          ))}
        </div>

        {/* list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {/* recent (only when no query and All) */}
          {!ql && cat === 'all' && (
            <div>
              <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '.06em', color: 'var(--gray-6)', textTransform: 'uppercase' }}>Recent</div>
              {recent.map(it => {
                const entry = catalog.flatMap(c => c.items.map(i => ({ i, g: c.g, icon: c.icon, type: c.type }))).find(e => e.i === it);
                return entry && (
                  <PickerRow key={'r-'+it} label={entry.i} icon={getIcon(entry.icon)} meta={entry.g}
                    added={alreadyAdded.has(entry.i)}
                    onClick={() => onPick({ l: entry.i, type: entry.type })} />
                );
              })}
            </div>
          )}

          {groups.length === 0 && (
            <div style={{ padding: '24px 14px', fontSize: 12, color: 'var(--gray-6)', textAlign: 'center' }}>
              No matches for “{q}”
            </div>
          )}

          {groups.map(g => (
            <div key={g.g}>
              <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '.06em', color: 'var(--gray-6)', textTransform: 'uppercase' }}>{g.g}</div>
              {g.items.map(it => (
                <PickerRow key={g.g+it} label={it} icon={getIcon(g.icon)}
                  added={alreadyAdded.has(it)}
                  onClick={() => onPick({ l: it, type: g.type })} />
              ))}
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderTop: '1px solid var(--gray-2)', fontSize: 11, color: 'var(--gray-6)' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'transparent', border: 0, padding: '2px 4px', cursor: 'pointer',
            color: 'var(--gray-7)', fontSize: 11, fontWeight: 600
          }}>
            <Ico.paperclip style={{ width: 11, height: 11 }} /> Upload file
          </button>
          <div style={{ flex: 1 }} />
          <span><kbd style={kbd}>↑↓</kbd> nav  <kbd style={kbd}>↵</kbd> add</span>
        </div>
      </div>
    </>
  );
}

const kbd = {
  display: 'inline-block', padding: '0 4px', margin: '0 2px',
  fontFamily: 'inherit', fontSize: 10, fontWeight: 600, color: 'var(--gray-7)',
  background: 'var(--gray-1)', border: '1px solid var(--gray-2)', borderRadius: 3
};

function PickerRow({ label, icon, meta, added, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={added ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={added}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: '7px 14px', border: 0,
        background: hover && !added ? 'var(--gray-1)' : 'transparent',
        cursor: added ? 'default' : 'pointer', textAlign: 'left',
        color: 'var(--gray-9)', fontFamily: 'inherit',
        opacity: added ? .55 : 1
      }}>
      <span style={{
        width: 24, height: 24, borderRadius: 6,
        background: 'var(--gray-1)', color: 'var(--gray-7)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{label}</span>
      {meta && <span style={{ fontSize: 11, color: 'var(--gray-6)' }}>{meta}</span>}
      {added && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-6)', letterSpacing: '.04em' }}>ADDED</span>}
    </button>
  );
}

// ----- Read-only composer: same look, no X on pills, no "Add context" affordance.
function ContextComposerReadOnly() {
  const pills = [
    { l: 'Engineering · Dept', type: 'object' },
    { l: 'Q3 Performance Cycle', type: 'object' },
    { l: 'comp-bands-2026.pdf', type: 'file' },
  ];
  return (
    <div style={{
      border: '1px solid var(--gray-3)', borderRadius: 16, background: '#fff',
      padding: 12, maxWidth: 540, boxShadow: '0 1px 2px rgba(0,0,0,.04)'
    }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {pills.map((p, i) => (
          <ContextPill key={i} type={p.type} label={p.l} />
        ))}
      </div>
      <div style={{
        width: '100%', fontSize: 14,
        fontFamily: 'inherit', color: 'var(--gray-9)', minHeight: 24
      }}>Summarize Q3 ratings for engineering and flag outliers</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <button className="fbtn fbtn-outlined fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.paperclip /></button>
        <button className="fbtn fbtn-outlined fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.mic /></button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: 'var(--gray-6)' }}>claude · haiku</div>
        <button className="fbtn fbtn-primary fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.arrowUp /></button>
      </div>
    </div>
  );
}

function ContextOnMessage() {
  // Read-only — pills attached to a past user message. No close button.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 14, color: 'var(--gray-9)' }}>Can you summarize Q3 ratings for engineering and flag any outliers?</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <ContextPill type="object" label="Engineering" />
        <ContextPill type="object" label="Q3 Performance" />
        <ContextPill type="file" label="comp-bands-2026.pdf" />
      </div>
    </div>
  );
}

// ===== File upload pattern =====
function FileUploadComposer() {
  const files = [
    { n: 'headcount-q4.csv', s: '14 KB', k: 'csv' },
    { n: 'org-chart.png', s: '186 KB', k: 'img' },
    { n: 'comp-bands-2026.pdf', s: '1.2 MB', k: 'pdf' },
  ];
  return (
    <div style={{
      border: '1px solid var(--gray-3)', borderRadius: 16, background: '#fff',
      padding: 12, maxWidth: 540, boxShadow: '0 1px 2px rgba(0,0,0,.04)'
    }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {files.map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 6px 6px',
            border: '1px solid var(--gray-2)', borderRadius: 8, background: 'var(--gray-05)', maxWidth: 220
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 6,
              background: f.k === 'img' ? 'var(--discovery-light)' : f.k === 'csv' ? 'var(--success-light)' : '#fdeaec',
              color: f.k === 'img' ? 'var(--discovery-dark)' : f.k === 'csv' ? 'var(--success-dark)' : 'var(--error-dark)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase'
            }}>
              {f.k === 'img' ? <Ico.image style={{ width: 16, height: 16 }} /> : f.k.toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.n}</div>
              <div style={{ fontSize: 10, color: 'var(--gray-6)' }}>{f.s}</div>
            </div>
            <button style={{ background: 'transparent', border: 0, padding: 2, cursor: 'pointer', color: 'var(--gray-6)' }}>
              <Ico.x />
            </button>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14, color: 'var(--gray-9)' }}>Cross-reference these against our 2026 pay bands and flag anyone below range.</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        <button className="fbtn fbtn-outlined fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.paperclip /></button>
        <button className="fbtn fbtn-outlined fbtn-sm fbtn"><Ico.plus style={{ width: 11, height: 11 }} /> Add context</button>
        <div style={{ flex: 1 }} />
        <button className="fbtn fbtn-primary fbtn-sm" style={{ width: 32, padding: 0 }}><Ico.arrowUp /></button>
      </div>
    </div>
  );
}

// Post-submit state — the user's sent message with its file attachments,
// followed by the AI's acknowledgement.
function FileUploadSubmitted() {
  const files = [
    { n: 'headcount-q4.csv', s: '14 KB', k: 'csv' },
    { n: 'org-chart.png', s: '186 KB', k: 'img' },
    { n: 'comp-bands-2026.pdf', s: '1.2 MB', k: 'pdf' },
  ];
  const fileTile = (f, i, variant = 'user') => (
    <div key={i} style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px 6px 6px',
      borderRadius: 8, maxWidth: 220,
      background: variant === 'user' ? 'rgba(255,255,255,.7)' : '#fff',
      border: `1px solid ${variant === 'user' ? 'rgba(0,0,0,.06)' : 'var(--gray-2)'}`
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: f.k === 'img' ? 'var(--discovery-light)' : f.k === 'csv' ? 'var(--success-light)' : '#fdeaec',
        color: f.k === 'img' ? 'var(--discovery-dark)' : f.k === 'csv' ? 'var(--success-dark)' : 'var(--error-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        fontSize: 9, fontWeight: 700, textTransform: 'uppercase'
      }}>
        {f.k === 'img' ? <Ico.image style={{ width: 15, height: 15 }} /> : f.k.toUpperCase()}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.n}</div>
        <div style={{ fontSize: 10, color: 'var(--gray-6)' }}>{f.s}</div>
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 560 }}>
      {/* Sent user message with attachments on top */}
      <div className="msg msg-user">
        <div className="msg-body" style={{ background: 'var(--gray-1)', padding: 12, borderRadius: '16px 16px 4px 16px', maxWidth: '90%' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            {files.map((f, i) => fileTile(f, i, 'user'))}
          </div>
          <div style={{ fontSize: 14, color: 'var(--gray-9)' }}>
            Cross-reference these against our 2026 pay bands and flag anyone below range.
          </div>
        </div>
      </div>
      {/* AI ack */}
      <div className="msg msg-ai">
        <AIAvatar />
        <div className="msg-body">
          <div style={{ fontSize: 13, color: 'var(--gray-7)', marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Ico.check style={{ width: 12, height: 12, color: 'var(--success-dark)' }} />
            Read 3 files · 184 rows, 2.8 MB
          </div>
          <div style={{ fontSize: 14, color: 'var(--gray-9)', marginBottom: 10 }}>
            I cross-referenced the 142 engineers in your headcount file against the 2026 bands. <b>11 people</b> are below their band minimum.
          </div>
          <div className="ai-card" style={{ padding: '10px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-6)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>Files used</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {files.map((f, i) => fileTile(f, i, 'ai'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUploadDropzone() {
  return (
    <div style={{
      border: '1.5px dashed var(--primary-300)', borderRadius: 12,
      background: 'var(--primary-100)',
      padding: '22px 20px', textAlign: 'center', maxWidth: 420
    }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', color: 'var(--primary-500)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <Ico.paperclip style={{ width: 20, height: 20 }} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)' }}>Drop files here</div>
      <div style={{ fontSize: 12, color: 'var(--gray-7)', marginTop: 2 }}>CSV, PDF, PNG, or paste a link</div>
    </div>
  );
}

Object.assign(window, {
  SourcesRow, SourcesInline,
  LoadTyping, LoadShimmer, LoadStatus, LoadSkeletonCards, LoadProgress,
  FilterScope, FilterRefine,
  ContextComposer, ContextComposerReadOnly, ContextOnMessage, ContextPill, ContextPicker,
  FileUploadComposer, FileUploadSubmitted, FileUploadDropzone,
});
