// Shift scheduling — examples of using AI chat to edit, add, and publish shifts.
//
// Four patterns:
//   ShiftEdit      — AI restates an edit inline, confirm / adjust
//   ShiftFillOpen  — AI proposes candidates for open shifts (multi-select)
//   ShiftWeekDraft — AI drafts a whole week; user reviews grid before publishing
//   ShiftPublish   — final confirmation step with change summary + notify options

// ---------- Shared shift card primitive ----------
function ShiftCard({ day, date, time, role, employee, status, highlight, change }) {
  return (
    <div style={{
      border: `1px solid ${highlight ? 'var(--primary-500)' : 'var(--gray-2)'}`,
      borderRadius: 10, background: '#fff',
      padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: highlight ? '0 0 0 3px rgba(87,162,59,0.12)' : 'none',
    }}>
      <div style={{
        width: 44, flexShrink: 0, textAlign: 'center',
        borderRight: '1px solid var(--gray-2)', paddingRight: 12,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-6)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{day}</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--gray-9)', lineHeight: 1 }}>{date}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {time}
          {change && (
            <span style={{
              fontSize: 10, fontWeight: 700, color: 'var(--primary-500)',
              background: 'var(--primary-100)', padding: '1px 6px', borderRadius: 1000,
              textTransform: 'uppercase', letterSpacing: '.04em',
            }}>{change}</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-7)', marginTop: 2 }}>{role}</div>
      </div>
      {employee && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <Monogram name={employee} size={24} />
          <span style={{ fontSize: 12, color: 'var(--gray-8)', fontWeight: 500 }}>{employee}</span>
        </div>
      )}
      {status === 'open' && (
        <span className="pill pill-warning" style={{ fontSize: 11 }}>Open</span>
      )}
    </div>
  );
}

// ---------- 1. Edit a shift ----------
// User says "move maria's tuesday shift to 10-6". AI restates the change
// with old/new, and asks to confirm.
function ShiftEdit() {
  const [applied, setApplied] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 14, color: 'var(--gray-9)', lineHeight: 1.5 }}>
        Got it — moving Maria's Tuesday shift. Here's the change:
      </div>

      {/* Before / after */}
      <div className="ai-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', background: 'var(--gray-05)', borderBottom: '1px solid var(--gray-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-6)', letterSpacing: '.02em' }}>Before</div>
          <div style={{ flex: 1 }} />
          <Monogram name="Maria Jones" size={20} />
          <span style={{ fontSize: 12, color: 'var(--gray-7)' }}>Maria Jones · Barista</span>
        </div>
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--gray-6)', textDecoration: 'line-through' }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Tue Nov 26</span>
          <span style={{ fontSize: 13 }}>7:00 AM – 3:00 PM</span>
          <span style={{ fontSize: 12 }}>· Downtown store</span>
        </div>
        <div style={{ padding: '10px 14px', background: 'var(--primary-100)', borderTop: '1px solid var(--primary-300)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary-900)', letterSpacing: '.02em' }}>After</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-900)' }}>Tue Nov 26</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-900)' }}>10:00 AM – 6:00 PM</span>
          <span style={{ fontSize: 12, color: 'var(--primary-900)' }}>· Downtown store</span>
        </div>
      </div>

      {/* Side effects AI noticed */}
      <div style={{
        border: '1px solid var(--warning-light)', background: 'var(--warning-light)',
        borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--warning-dark)',
        display: 'flex', alignItems: 'flex-start', gap: 8,
      }}>
        <Ico.info style={{ color: 'var(--warning-dark)', marginTop: 1 }} />
        <span>This overlaps with Sam's 10–2 shift. They'd both be on the bar from 10–2. Still apply?</span>
      </div>

      {applied ? (
        <div style={{
          background: 'var(--success-light)', borderRadius: 8, padding: '8px 12px',
          fontSize: 13, color: 'var(--success-dark)', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Ico.check style={{ color: 'var(--success-dark)' }} />
          Updated. Maria will get a notification.
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="fbtn fbtn-outlined fbtn-sm">Change something</button>
          <button className="fbtn fbtn-primary fbtn-sm" onClick={() => setApplied(true)}>Apply change</button>
        </div>
      )}
    </div>
  );
}

// ---------- 2. Fill open shifts ----------
// AI proposes candidates for each open shift. User can swap / accept.
function ShiftFillOpen() {
  const candidates = [
    { name: 'Priya Nair', hours: 18, avail: 'Available · 4h under', score: 'best' },
    { name: 'Jonah Keller', hours: 32, avail: 'Available · prefers evenings' },
    { name: 'Sam Chen', hours: 38, avail: 'Time-off requested Wed', conflict: true },
  ];
  const [picked, setPicked] = React.useState('Priya Nair');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 14, color: 'var(--gray-9)', lineHeight: 1.5 }}>
        You have <b>3 open shifts</b> next week. Here's who I'd suggest for the first one — Wednesday's morning bar shift.
      </div>

      <ShiftCard day="Wed" date="27" time="6:00 AM – 2:00 PM" role="Barista · Downtown" status="open" />

      <div className="ai-card" style={{ padding: 0 }}>
        <div style={{ padding: '10px 14px 8px', fontSize: 11, fontWeight: 700, color: 'var(--gray-6)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
          Suggested · ranked by fit
        </div>
        {candidates.map((c, i) => {
          const sel = picked === c.name;
          return (
            <button
              key={c.name}
              onClick={() => !c.conflict && setPicked(c.name)}
              disabled={c.conflict}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', border: 0,
                borderTop: '1px solid var(--gray-2)',
                background: sel ? 'var(--primary-100)' : '#fff',
                cursor: c.conflict ? 'not-allowed' : 'pointer',
                textAlign: 'left', fontFamily: 'inherit',
                opacity: c.conflict ? 0.55 : 1,
              }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `2px solid ${sel ? 'var(--primary-500)' : 'var(--gray-4)'}`,
                background: sel ? 'var(--primary-500)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{sel && <Ico.check style={{ color: '#fff', width: 10, height: 10 }} />}</div>
              <Monogram name={c.name} size={30} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {c.name}
                  {c.score === 'best' && <span className="pill pill-success" style={{ fontSize: 10, padding: '1px 6px' }}>Best fit</span>}
                </div>
                <div style={{ fontSize: 11, color: c.conflict ? 'var(--error-dark)' : 'var(--gray-6)', marginTop: 1 }}>
                  {c.hours}h this week · {c.avail}
                </div>
              </div>
              {c.conflict && <Ico.x style={{ color: 'var(--error-dark)' }} />}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
        <span style={{ fontSize: 12, color: 'var(--gray-6)' }}>2 more open shifts after this</span>
        <div style={{ flex: 1 }} />
        <button className="fbtn fbtn-outlined fbtn-sm">Skip this one</button>
        <button className="fbtn fbtn-primary fbtn-sm">Assign &amp; Continue →</button>
      </div>
    </div>
  );
}

// ---------- 3. Week draft ----------
// AI generated a whole week. Show a compact grid. User can accept or regenerate.
function ShiftWeekDraft() {
  const days = ['Mon 25', 'Tue 26', 'Wed 27', 'Thu 28', 'Fri 29', 'Sat 30', 'Sun 1'];
  // shift blocks: rows = employees, cols = days; each cell: 'O' open, or [start,end,role-color] as hours from 6 to 22
  const shifts = [
    { name: 'Maria Jones', role: 'Barista', week: [[7,15,'g'],[10,18,'g'],null,[7,15,'g'],[7,15,'g'],null,null] },
    { name: 'Priya Nair', role: 'Barista', week: [null,[14,22,'g'],[6,14,'g'],[14,22,'g'],null,[10,18,'g'],[10,18,'g']] },
    { name: 'Jonah Keller', role: 'Shift lead', week: [[6,14,'p'],null,[6,14,'p'],null,[6,14,'p'],[14,22,'p'],[14,22,'p']] },
    { name: 'Sam Chen', role: 'Barista', week: [[14,22,'g'],[6,14,'g'],null,[14,22,'g'],[14,22,'g'],null,null] },
    { name: 'Aiko Tanaka', role: 'Shift lead', week: [null,[6,14,'p'],[14,22,'p'],[6,14,'p'],null,[6,14,'p'],[6,14,'p']] },
  ];
  const openShifts = 1; // Wednesday afternoon

  const HOUR_MIN = 6, HOUR_MAX = 22;
  const pct = h => ((h - HOUR_MIN) / (HOUR_MAX - HOUR_MIN)) * 100;
  const colorFor = c => c === 'p' ? '#9853b9' : 'var(--primary-500)';
  const bgFor = c => c === 'p' ? '#f4e7fb' : '#E6F0E0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 14, color: 'var(--gray-9)', lineHeight: 1.5 }}>
        Here's a draft for the week of <b>Nov 25 – Dec 1</b>. Based on last week's pattern, availability, and your 2-lead target per shift.
      </div>

      <div className="ai-card" style={{ padding: 0 }}>
        {/* Day header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '140px repeat(7, 1fr)',
          borderBottom: '1px solid var(--gray-2)', background: 'var(--gray-05)',
        }}>
          <div />
          {days.map(d => (
            <div key={d} style={{
              padding: '8px 4px', fontSize: 11, fontWeight: 700,
              color: 'var(--gray-7)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '.04em',
            }}>{d}</div>
          ))}
        </div>
        {/* Rows */}
        {shifts.map((s, i) => (
          <div key={s.name} style={{
            display: 'grid', gridTemplateColumns: '140px repeat(7, 1fr)',
            borderTop: i === 0 ? 0 : '1px solid var(--gray-2)', alignItems: 'center',
          }}>
            <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <Monogram name={s.name} size={24} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name.split(' ')[0]}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-6)' }}>{s.role}</div>
              </div>
            </div>
            {s.week.map((cell, d) => (
              <div key={d} style={{ position: 'relative', height: 28, borderLeft: '1px solid var(--gray-2)', margin: '4px 0' }}>
                {cell && (
                  <div style={{
                    position: 'absolute',
                    left: `${pct(cell[0])}%`,
                    width: `${pct(cell[1]) - pct(cell[0])}%`,
                    top: 4, bottom: 4,
                    background: bgFor(cell[2]),
                    borderLeft: `3px solid ${colorFor(cell[2])}`,
                    borderRadius: 3,
                    fontSize: 9, color: colorFor(cell[2]), fontWeight: 700,
                    padding: '0 4px',
                    display: 'flex', alignItems: 'center',
                    overflow: 'hidden', whiteSpace: 'nowrap',
                  }}>{cell[0]}–{cell[1]}</div>
                )}
                {/* Wednesday PM open shift on row 0 */}
                {i === 0 && d === 2 && (
                  <div style={{
                    position: 'absolute',
                    left: `${pct(14)}%`,
                    width: `${pct(22) - pct(14)}%`,
                    top: 4, bottom: 4,
                    background: 'repeating-linear-gradient(45deg, #fff7e0, #fff7e0 4px, #fef0c4 4px, #fef0c4 8px)',
                    borderLeft: '3px solid var(--warning-dark)',
                    borderRadius: 3,
                    fontSize: 9, color: 'var(--warning-dark)', fontWeight: 700,
                    display: 'flex', alignItems: 'center', padding: '0 4px',
                  }}>Open</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Summary strip */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12, color: 'var(--gray-7)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, background: 'var(--primary-500)', borderRadius: 2 }} /> Baristas · 14 shifts
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, background: '#9853b9', borderRadius: 2 }} /> Shift leads · 10 shifts
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--warning-dark)', fontWeight: 600 }}>
          <span style={{ width: 10, height: 10, background: 'var(--warning-dark)', borderRadius: 2 }} /> {openShifts} open shift
        </div>
        <div style={{ marginLeft: 'auto', color: 'var(--gray-6)' }}>Est. labor · $4,280</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button className="fbtn fbtn-outlined fbtn-sm"><Ico.refresh /> Regenerate</button>
        <button className="fbtn fbtn-outlined fbtn-sm">Fill open shift</button>
        <div style={{ flex: 1 }} />
        <button className="fbtn fbtn-primary fbtn-sm">Review & publish →</button>
      </div>
    </div>
  );
}

// ---------- 4. Publish confirmation ----------
// Final step: summarize changes, choose who to notify, confirm.
function ShiftPublish() {
  const [notify, setNotify] = React.useState('changed');
  const [published, setPublished] = React.useState(false);

  if (published) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="ai-card" style={{
          padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center',
          background: 'var(--success-light)', borderColor: '#BFE0C4',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#2A8A3C', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Ico.check style={{ width: 18, height: 18 }} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--success-dark)' }}>
              Schedule published · Nov 25 – Dec 1
            </div>
            <div style={{ fontSize: 12, color: 'var(--success-dark)', opacity: .85 }}>
              9 team members notified · 3 pending acknowledgment
            </div>
          </div>
          <button className="fbtn fbtn-text" style={{ color: 'var(--success-dark)' }}>View schedule →</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 14, color: 'var(--gray-9)', lineHeight: 1.5 }}>
        Ready to publish the week of <b>Nov 25 – Dec 1</b>. Here's what's changing:
      </div>

      <div className="ai-card" style={{ padding: 0 }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--gray-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>Change summary</div>
          <div style={{ flex: 1 }} />
          <span className="pill" style={{ fontSize: 11 }}>24 shifts total</span>
        </div>
        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          {[
            { icon: <Ico.plus />, color: 'var(--success-dark)', text: <><b>4 new shifts</b> added to cover Tue & Sat demand</> },
            { icon: <Ico.refresh />, color: 'var(--info-dark)', text: <><b>3 shifts modified</b> — Maria's Tue moved to 10–6, Jonah's Fri extended 2h</> },
            { icon: <Ico.check />, color: 'var(--primary-500)', text: <><b>1 open shift filled</b> — Priya picked up Wednesday AM</> },
            { icon: <Ico.info />, color: 'var(--warning-dark)', text: <><b>1 still open</b> — Wed 2–10pm, no one available</> },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ color: r.color, marginTop: 2, flexShrink: 0 }}>{r.icon}</div>
              <div style={{ color: 'var(--gray-8)', lineHeight: 1.45 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notify options */}
      <div className="ai-card" style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)', marginBottom: 10 }}>Who should I notify?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { id: 'changed', label: 'Only people whose shifts changed', sub: '5 of 9 team members' },
            { id: 'all', label: 'Everyone on the schedule', sub: '9 team members' },
            { id: 'none', label: 'Don\'t notify yet', sub: 'I\'ll send it later' },
          ].map(o => {
            const on = notify === o.id;
            return (
              <label key={o.id} onClick={() => setNotify(o.id)} style={{
                display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer',
                padding: '6px 4px',
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  border: `1px solid ${on ? 'var(--primary-500)' : 'var(--gray-4)'}`,
                  background: '#fff', position: 'relative',
                }}>
                  {on && <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--primary-500)' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: on ? 600 : 500, color: 'var(--gray-9)' }}>{o.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-6)' }}>{o.sub}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button className="fbtn fbtn-outlined fbtn-sm">Keep editing</button>
        <div style={{ flex: 1 }} />
        <button className="fbtn fbtn-primary fbtn-sm" onClick={() => setPublished(true)}>
          Publish & notify
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ShiftEdit, ShiftFillOpen, ShiftWeekDraft, ShiftPublish });
