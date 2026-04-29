// Filter pattern — AI's opening message IS a dropdown.
// Before answering, the AI asks for a required scope (country) via a
// searchable dropdown. Once picked, the selection unlocks a small tray of
// follow-ups so the user can keep going without typing:
//   • two outlined secondary CTAs that open other experiences
//     (a country guide, a cost breakdown)
//   • a full-width primary CTA that kicks off the real workflow
//   • a row of prompt chips that prefill common country-scoped questions
// Selection becomes a context pill on the user's next reply.

function FilterDropdownFirst() {
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(null);
  const [q, setQ] = React.useState('');

  const countries = [
    { flag: '🇦🇱', name: 'Albania' },
    { flag: '🇩🇿', name: 'Algeria' },
    { flag: '🇦🇩', name: 'Andorra' },
    { flag: '🇦🇴', name: 'Angola' },
    { flag: '🇦🇬', name: 'Antigua & Barbuda' },
    { flag: '🇦🇷', name: 'Argentina' },
    { flag: '🇦🇺', name: 'Australia' },
    { flag: '🇦🇹', name: 'Austria' },
    { flag: '🇧🇪', name: 'Belgium' },
    { flag: '🇧🇷', name: 'Brazil' },
    { flag: '🇨🇦', name: 'Canada' },
    { flag: '🇩🇰', name: 'Denmark' },
    { flag: '🇫🇷', name: 'France' },
    { flag: '🇩🇪', name: 'Germany' },
    { flag: '🇮🇳', name: 'India' },
    { flag: '🇮🇪', name: 'Ireland' },
    { flag: '🇮🇹', name: 'Italy' },
    { flag: '🇯🇵', name: 'Japan' },
    { flag: '🇲🇽', name: 'Mexico' },
    { flag: '🇳🇱', name: 'Netherlands' },
    { flag: '🇪🇸', name: 'Spain' },
    { flag: '🇸🇪', name: 'Sweden' },
    { flag: '🇬🇧', name: 'United Kingdom' },
    { flag: '🇺🇸', name: 'United States' },
  ];

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      {/* User's opening question */}
      <div className="msg msg-user" style={{ marginBottom: 14 }}>
        <div className="msg-body">
          What are the statutory sick-leave requirements I need to plan for?
        </div>
      </div>

      {/* AI reply — dropdown as the ask */}
      <div className="msg msg-ai">
        <AIAvatar />
        <div className="msg-body" style={{ width: '100%' }}>
          <div style={{ fontSize: 14, color: 'var(--gray-9)', lineHeight: 1.5, marginBottom: 12 }}>
            Sick-leave rules vary a lot by country. Which one should I scope this to?
          </div>

          {/* Dropdown trigger */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#fff', border: `1px solid ${open ? 'var(--primary-500)' : 'var(--gray-3)'}`,
              borderRadius: 10, padding: '10px 14px',
              fontSize: 14, color: selected ? 'var(--gray-9)' : 'var(--gray-6)',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: open ? '0 0 0 3px rgba(114,177,87,0.18)' : 'none',
              transition: 'border-color .15s, box-shadow .15s',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {selected ? (
                <>
                  <span style={{ fontSize: 16 }}>{selected.flag}</span>
                  {selected.name}
                </>
              ) : (
                '– Select country –'
              )}
            </span>
            <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s', color: 'var(--gray-7)' }}>
              <Ico.chevD />
            </span>
          </button>

          {/* Dropdown panel */}
          {open && (
            <div style={{
              marginTop: 6, background: '#fff',
              border: '1px solid var(--gray-3)', borderRadius: 10,
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: 10, borderBottom: '1px solid var(--gray-2)' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 8,
                  padding: '7px 11px',
                }}>
                  <Ico.search style={{ color: 'var(--gray-6)' }} />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search country"
                    autoFocus
                    style={{
                      flex: 1, border: 0, outline: 'none', background: 'transparent',
                      fontSize: 13, color: 'var(--gray-9)', fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>
              <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                {filtered.length === 0 && (
                  <div style={{ padding: '14px 16px', fontSize: 13, color: 'var(--gray-6)' }}>
                    No countries match "{q}"
                  </div>
                )}
                {filtered.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setSelected(c); setOpen(false); setQ(''); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '9px 14px', background: 'transparent', border: 0,
                      fontSize: 14, color: 'var(--gray-9)', cursor: 'pointer',
                      textAlign: 'left', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{c.flag}</span>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Helper / hint — before a selection is made */}
          {!selected && !open && (
            <div style={{
              marginTop: 10, padding: '10px 12px',
              background: '#EBF3FB', border: '1px solid #D4E8FA', borderRadius: 8,
              fontSize: 13, color: '#1B4E7A', lineHeight: 1.45,
              display: 'flex', alignItems: 'flex-start', gap: 8,
            }}>
              <Ico.info style={{ color: '#1B7AC2', marginTop: 2, flexShrink: 0 }} />
              Select a country to get requirement-specific guidance.
            </div>
          )}

          {/* Selected → unlocked tray of next-steps. Two outlined CTAs for
              side-experiences, a primary CTA for the main workflow, and a
              row of prompt chips that prefill country-scoped questions. */}
          {selected && !open && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <FDAction icon={<Ico.globe />}>Open {selected.name} Guide</FDAction>
                <FDAction icon={<Ico.calculator />}>Full Cost Breakdown</FDAction>
              </div>
              <FDPrimary icon={<Ico.plus />}>Start Hire in {selected.name}</FDPrimary>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
                <FDChip>{selected.name} required fields</FDChip>
                <FDChip>{selected.name} PTO & work hours</FDChip>
                <FDChip>{selected.name} role description rules</FDChip>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----- small subcomponents for the selected-state tray -----
function FDAction({ icon, children }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: '9px 10px', background: '#fff', border: '1px solid var(--gray-3)',
      borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--gray-9)',
      cursor: 'pointer', fontFamily: 'inherit',
    }}>
      <span style={{ color: 'var(--gray-7)', display: 'inline-flex' }}>{icon}</span>
      {children}
    </button>
  );
}

function FDPrimary({ icon, children }) {
  return (
    <button style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: '11px 10px', background: 'var(--primary-100)', border: '1px solid var(--primary-300)',
      borderRadius: 8, fontSize: 14, fontWeight: 600, color: 'var(--primary-900)',
      cursor: 'pointer', fontFamily: 'inherit',
    }}>
      <span style={{ display: 'inline-flex' }}>{icon}</span>
      {children}
    </button>
  );
}

function FDChip({ children }) {
  return (
    <button style={{
      padding: '5px 12px', background: '#fff', border: '1px solid var(--gray-3)',
      borderRadius: 1000, fontSize: 12, color: 'var(--gray-8)',
      cursor: 'pointer', fontFamily: 'inherit',
    }}>{children}</button>
  );
}

Object.assign(window, {
  FilterDropdownFirst,
  FilterFacetsOnResult,
  FilterSegmentedAnswer,
  FilterSlotFill,
});

// ============================================================================
// 2 · Facets on a result message
// ----------------------------------------------------------------------------
// After the AI returns a list/table, the reply carries its own facet bar.
// Clicking a facet narrows the existing result in-place — no new user
// message, no round-trip. Acts like search-results faceted filtering, but
// the facet bar is attached to the specific AI message it refines.
// ============================================================================
function FilterFacetsOnResult() {
  const all = [
    { n: 'Priya Nair',    d: 'Eng · Backend',   ti: 'Senior SWE', loc: 'US',  st: 'Active' },
    { n: 'Jonah Keller',  d: 'Eng · Platform',  ti: 'Staff SWE',  loc: 'US',  st: 'Active' },
    { n: 'Sam Chen',      d: 'Eng · Frontend',  ti: 'SWE II',     loc: 'US',  st: 'Active' },
    { n: 'Aiko Tanaka',   d: 'Eng · SRE',       ti: 'Senior SWE', loc: 'JP',  st: 'Active' },
    { n: 'Marc Silva',    d: 'Design',          ti: 'Senior PD',  loc: 'BR',  st: 'On leave' },
    { n: 'Luca Rossi',    d: 'Eng · Backend',   ti: 'SWE II',     loc: 'IT',  st: 'Active' },
    { n: 'Hana Park',     d: 'Eng · Platform',  ti: 'Senior SWE', loc: 'US',  st: 'Active' },
  ];
  const [facets, setFacets] = React.useState({ dept: 'Eng', level: null, loc: null, status: 'Active' });
  const set = (k, v) => setFacets(f => ({ ...f, [k]: f[k] === v ? null : v }));
  const rows = all.filter(r =>
    (!facets.dept   || r.d.startsWith(facets.dept)) &&
    (!facets.level  || r.ti.startsWith(facets.level)) &&
    (!facets.loc    || r.loc === facets.loc) &&
    (!facets.status || r.st === facets.status)
  );
  const active = Object.entries(facets).filter(([, v]) => v);

  return (
    <div>
      <div className="msg msg-user" style={{ marginBottom: 14 }}>
        <div className="msg-body">Show me senior engineers we hired this year.</div>
      </div>
      <div className="msg msg-ai">
        <AIAvatar />
        <div className="msg-body" style={{ width: '100%' }}>
          <div style={{ fontSize: 14, color: 'var(--gray-9)', marginBottom: 10 }}>
            Found <b>{all.length}</b> people. Narrow by any facet below to refine.
          </div>

          {/* Facet bar — attached to THIS reply, not the composer.
              Toggling does not send a new message; it filters this reply in place. */}
          <div style={{
            background: 'var(--gray-1)', border: '1px solid var(--gray-2)',
            borderRadius: 8, padding: '8px 10px', marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <FacetGroup label="Dept" options={['Eng', 'Design']} value={facets.dept} onPick={v => set('dept', v)} />
              <Sep />
              <FacetGroup label="Level" options={['Staff', 'Senior', 'SWE II']} value={facets.level} onPick={v => set('level', v)} />
              <Sep />
              <FacetGroup label="Location" options={['US', 'JP', 'IT', 'BR']} value={facets.loc} onPick={v => set('loc', v)} />
              <Sep />
              <FacetGroup label="Status" options={['Active', 'On leave']} value={facets.status} onPick={v => set('status', v)} />
              {active.length > 0 && (
                <button onClick={() => setFacets({ dept: null, level: null, loc: null, status: null })}
                  style={{
                    marginLeft: 'auto', background: 'transparent', border: 0,
                    fontSize: 11, color: 'var(--gray-6)', cursor: 'pointer', fontFamily: 'inherit',
                  }}>Clear all</button>
              )}
            </div>
          </div>

          {/* Result count + live-narrow indicator */}
          <div style={{ fontSize: 12, color: 'var(--gray-6)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            Showing <b style={{ color: 'var(--gray-9)' }}>{rows.length}</b> of {all.length}
            {active.length > 0 && <span> · filtered by {active.map(([k]) => k).join(' + ')}</span>}
          </div>

          {/* Result table */}
          <div style={{ border: '1px solid var(--gray-2)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
            {rows.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: 'var(--gray-6)' }}>No matches — try clearing a facet.</div>
            ) : rows.map((r, i) => (
              <div key={r.n} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '9px 12px',
                borderBottom: i < rows.length - 1 ? '1px solid var(--gray-2)' : 'none',
              }}>
                <Monogram name={r.n} size={26} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>{r.n}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-6)' }}>{r.d} · {r.ti}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-7)', fontWeight: 500 }}>{r.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FacetGroup({ label, options, value, onPick }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-7)', textTransform: 'uppercase', letterSpacing: '.03em', marginRight: 2 }}>{label}</span>
      {options.map(o => {
        const on = value === o;
        return (
          <button key={o} onClick={() => onPick(o)} style={{
            padding: '3px 9px', borderRadius: 1000,
            background: on ? 'var(--gray-9)' : '#fff',
            color: on ? '#fff' : 'var(--gray-8)',
            border: `1px solid ${on ? 'var(--gray-9)' : 'var(--gray-3)'}`,
            fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>{o}</button>
        );
      })}
    </div>
  );
}
function Sep() {
  return <span style={{ width: 1, height: 16, background: 'var(--gray-3)', display: 'inline-block' }} />;
}

// ============================================================================
// 3 · Segmented control on an answer
// ----------------------------------------------------------------------------
// AI offers a view-switcher inside its reply. Tapping a segment swaps the
// body of THIS message in place — no new question, no new reply. Ideal for
// small enumerated views (summary / by team / by month).
// ============================================================================
function FilterSegmentedAnswer() {
  const [view, setView] = React.useState('summary');
  return (
    <div>
      <div className="msg msg-user" style={{ marginBottom: 14 }}>
        <div className="msg-body">What does Q3 hiring look like?</div>
      </div>
      <div className="msg msg-ai">
        <AIAvatar />
        <div className="msg-body" style={{ width: '100%' }}>
          <div style={{ fontSize: 14, color: 'var(--gray-9)', marginBottom: 10 }}>
            Here's Q3 hiring. Pick a view:
          </div>

          {/* Segmented control — attached to the reply itself. */}
          <div style={{
            display: 'inline-flex', padding: 3, background: 'var(--gray-1)',
            border: '1px solid var(--gray-2)', borderRadius: 8, marginBottom: 12,
          }}>
            {[
              { k: 'summary', l: 'Summary' },
              { k: 'byTeam',  l: 'By team' },
              { k: 'byMonth', l: 'By month' },
            ].map(s => (
              <button key={s.k} onClick={() => setView(s.k)} style={{
                padding: '5px 12px', borderRadius: 6,
                background: view === s.k ? '#fff' : 'transparent',
                color: view === s.k ? 'var(--gray-9)' : 'var(--gray-7)',
                border: 0,
                boxShadow: view === s.k ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                fontSize: 12, fontWeight: view === s.k ? 600 : 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{s.l}</button>
            ))}
          </div>

          {/* Swappable body — same message, different view */}
          {view === 'summary' && (
            <div className="ai-card" style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <Stat big="14" label="Offers accepted" />
                <Stat big="29 d" label="Avg time-to-fill" sub="↓ 9d vs Q2" good />
                <Stat big="86%" label="Close rate" />
              </div>
              <div style={{ marginTop: 10, fontSize: 13, color: 'var(--gray-8)', lineHeight: 1.5 }}>
                Strongest quarter this year. The structured-interview rubric rolled out in July is driving the speed-up.
              </div>
            </div>
          )}

          {view === 'byTeam' && (
            <div className="ai-card" style={{ padding: 0, overflow: 'hidden' }}>
              {[
                { t: 'Engineering', n: 8, bar: 100 },
                { t: 'Design',      n: 3, bar: 37 },
                { t: 'Sales',       n: 2, bar: 25 },
                { t: 'Support',     n: 1, bar: 12 },
              ].map((r, i, a) => (
                <div key={r.t} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px',
                  borderBottom: i < a.length - 1 ? '1px solid var(--gray-2)' : 'none',
                }}>
                  <div style={{ width: 90, fontSize: 13, color: 'var(--gray-9)', fontWeight: 500 }}>{r.t}</div>
                  <div style={{ flex: 1, height: 8, background: 'var(--gray-1)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${r.bar}%`, height: '100%', background: 'var(--primary-500)' }} />
                  </div>
                  <div style={{ width: 30, textAlign: 'right', fontSize: 13, fontVariantNumeric: 'tabular-nums', color: 'var(--gray-9)', fontWeight: 600 }}>{r.n}</div>
                </div>
              ))}
            </div>
          )}

          {view === 'byMonth' && (
            <div className="ai-card" style={{ padding: '14px 14px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 88, padding: '0 4px' }}>
                {[{ m: 'Jul', n: 3 }, { m: 'Aug', n: 5 }, { m: 'Sep', n: 6 }].map(b => (
                  <div key={b.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-8)' }}>{b.n}</div>
                    <div style={{ width: '100%', height: b.n * 11, background: 'var(--primary-500)', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ fontSize: 11, color: 'var(--gray-6)' }}>{b.m}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ big, label, sub, good }) {
  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gray-9)', lineHeight: 1.1 }}>{big}</div>
      <div style={{ fontSize: 12, color: 'var(--gray-6)', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, fontWeight: 600, color: good ? 'var(--success-dark)' : 'var(--gray-7)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ============================================================================
// 4 · Conversational slot-filling
// ----------------------------------------------------------------------------
// The AI asks filter questions ONE AT A TIME as small inline cards. Each
// answered slot becomes a user message + the next question appears as a new
// AI message. Final result at the bottom carries all chosen slots as pills.
// Good for multi-dimension scope where the user may not know all axes.
// ============================================================================
function FilterSlotFill() {
  // Steps the AI asks for, in order.
  const steps = [
    { k: 'region', q: 'Which region should I scope this to?', options: ['North America', 'EMEA', 'APAC', 'LATAM'] },
    { k: 'range',  q: 'And the time range?',                  options: ['Last 30 days', 'Last quarter', 'YTD', 'All time'] },
    { k: 'type',   q: 'Employment type?',                     options: ['All', 'Full-time', 'Contract', 'Intern'] },
  ];
  // Preset the first two answered so the "conversation" already has history.
  const [answers, setAnswers] = React.useState({ region: 'EMEA', range: 'Last quarter' });
  const answered = steps.filter(s => answers[s.k]);
  const currentIdx = answered.length;
  const current = steps[currentIdx]; // undefined when all slots are filled
  const done = !current;

  return (
    <div>
      <div className="msg msg-user" style={{ marginBottom: 14 }}>
        <div className="msg-body">Show me attrition risks.</div>
      </div>

      {/* Interleaved turns: AI asks → user answers → repeat. */}
      {answered.map(step => (
        <React.Fragment key={step.k}>
          <div className="msg msg-ai" style={{ marginBottom: 10 }}>
            <AIAvatar />
            <div className="msg-body" style={{ width: '100%' }}>
              <div style={{ fontSize: 14, color: 'var(--gray-9)' }}>{step.q}</div>
            </div>
          </div>
          <div className="msg msg-user" style={{ marginBottom: 10 }}>
            <div className="msg-body">{answers[step.k]}</div>
          </div>
        </React.Fragment>
      ))}

      {/* Active question — inline option chips. Picking one advances. */}
      {!done && (
        <div className="msg msg-ai">
          <AIAvatar />
          <div className="msg-body" style={{ width: '100%' }}>
            <div style={{ fontSize: 14, color: 'var(--gray-9)', marginBottom: 10 }}>{current.q}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {current.options.map(o => (
                <button key={o} onClick={() => setAnswers(a => ({ ...a, [current.k]: o }))} style={{
                  padding: '6px 13px', borderRadius: 1000,
                  background: '#fff', border: '1px solid var(--gray-3)',
                  fontSize: 13, color: 'var(--gray-9)', fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-1)'; e.currentTarget.style.borderColor = 'var(--gray-4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff';           e.currentTarget.style.borderColor = 'var(--gray-3)'; }}>
                  {o}
                </button>
              ))}
            </div>
            <div style={{
              marginTop: 10, fontSize: 11, color: 'var(--gray-6)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>Step {currentIdx + 1} of {steps.length}</span>
              <span>·</span>
              <button onClick={() => setAnswers(a => ({ ...a, [current.k]: 'Any' }))} style={{
                background: 'none', border: 0, color: 'var(--link, #1B7AC2)',
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 600, padding: 0,
              }}>Skip</button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal result — all slots filled, scope shown as pills on the reply */}
      {done && (
        <div className="msg msg-ai">
          <AIAvatar />
          <div className="msg-body" style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
              {steps.map(s => (
                <span key={s.k} style={{
                  fontSize: 11, fontWeight: 600, color: 'var(--primary-900)',
                  background: 'var(--primary-100)', padding: '3px 9px', borderRadius: 1000,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  <span style={{ color: 'var(--gray-7)', fontWeight: 500 }}>{s.k}:</span>
                  {answers[s.k]}
                </span>
              ))}
              <button onClick={() => setAnswers({})} style={{
                fontSize: 11, fontWeight: 600, color: 'var(--gray-6)',
                background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit',
              }}>Change</button>
            </div>
            <div className="ai-card" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.5 }}>
                Across <b>{answers.region}</b> in the <b>{answers.range?.toLowerCase()}</b>, <b>11 people</b> are flagged as
                elevated attrition risk. The strongest signal is missed 1:1s + dropping eNPS scores in the last two cycles.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

