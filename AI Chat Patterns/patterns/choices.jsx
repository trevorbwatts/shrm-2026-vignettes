// Choice selectors — single and multiple; to-do list; done confirmation

function MultipleChoice() {
  const opts = [
    { id: 'remote', label: 'Remote-friendly', hint: 'Fully or hybrid' },
    { id: 'salary', label: 'Include salary range', hint: 'US compensation disclosure' },
    { id: 'referral', label: 'Open to referrals' },
    { id: 'urgent', label: 'Fast-track (2-week fill)' },
  ];
  const [sel, setSel] = React.useState(new Set(['remote', 'salary']));
  const toggle = id => {
    const next = new Set(sel);
    next.has(id) ? next.delete(id) : next.add(id);
    setSel(next);
  };
  return (
    <div className="ai-card" style={{ padding: '16px 18px' }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)', marginBottom: 3 }}>What should I include in the req?</div>
      <div className="sub" style={{ marginBottom: 14 }}>Pick any that apply — I'll draft around them.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {opts.map(o => {
          const on = sel.has(o.id);
          return (
            <label key={o.id} onClick={() => toggle(o.id)} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '10px 12px', border: `1px solid ${on ? 'var(--primary-500)' : 'var(--gray-2)'}`,
              background: on ? 'var(--primary-100)' : '#fff',
              borderRadius: 8, cursor: 'pointer', transition: 'all .12s'
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, marginTop: 1, flexShrink: 0,
                background: on ? 'var(--primary-500)' : 'var(--gray-1)',
                border: on ? '1px solid var(--primary-500)' : '1px solid var(--gray-4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
              }}>
                {on && <Ico.check style={{ width: 11, height: 11 }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--gray-9)' }}>{o.label}</div>
                {o.hint && <div className="sub" style={{ fontSize: 12, marginTop: 1 }}>{o.hint}</div>}
              </div>
            </label>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'flex-end' }}>
        <button className="fbtn fbtn-outlined fbtn-sm">Skip</button>
        <button className="fbtn fbtn-primary fbtn-sm">Continue with {sel.size}</button>
      </div>
    </div>
  );
}

function MultipleChoiceChips() {
  const opts = ['Hiring', 'Time off', 'Performance', 'Benefits', 'Compensation', 'Reporting'];
  const [sel, setSel] = React.useState(new Set(['Hiring', 'Performance']));
  const toggle = o => {
    const n = new Set(sel); n.has(o) ? n.delete(o) : n.add(o); setSel(n);
  };
  return (
    <div className="ai-card" style={{ padding: '14px 16px' }}>
      <div style={{ fontSize: 13, color: 'var(--gray-7)', marginBottom: 10 }}>Which topics should this report cover?</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {opts.map(o => {
          const on = sel.has(o);
          return (
            <button key={o} onClick={() => toggle(o)} style={{
              padding: '6px 12px', borderRadius: 1000,
              border: `1px solid ${on ? 'var(--primary-500)' : 'var(--gray-3)'}`,
              background: on ? 'var(--primary-500)' : '#fff',
              color: on ? '#fff' : 'var(--gray-8)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'all .12s'
            }}>
              {on && <Ico.check style={{ width: 10, height: 10 }} />}
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SingleChoice() {
  const opts = [
    { id: 'week', label: 'Last 7 days', hint: 'Nov 14 – Nov 21' },
    { id: 'month', label: 'Last 30 days', hint: 'Oct 22 – Nov 21' },
    { id: 'quarter', label: 'This quarter', hint: 'Q4 2026 to date' },
    { id: 'custom', label: 'Custom range' },
  ];
  const [sel, setSel] = React.useState('month');
  return (
    <div className="ai-card" style={{ padding: '16px 18px' }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)', marginBottom: 12 }}>What time frame?</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {opts.map((o, i) => {
          const on = sel === o.id;
          return (
            <label key={o.id} onClick={() => setSel(o.id)} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '12px 2px', cursor: 'pointer',
              borderTop: i === 0 ? 0 : '1px solid var(--gray-2)'
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: '#fff', border: `1px solid ${on ? 'var(--primary-500)' : 'var(--gray-4)'}`,
                flexShrink: 0, position: 'relative'
              }}>
                {on && <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--primary-500)' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: on ? 600 : 500, color: 'var(--gray-9)' }}>{o.label}</span>
                {o.hint && <span className="sub" style={{ fontSize: 12, marginLeft: 10 }}>{o.hint}</span>}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function SingleChoiceSegmented() {
  const opts = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  const [sel, setSel] = React.useState('Monthly');
  return (
    <div className="ai-card" style={{ padding: '14px 16px' }}>
      <div style={{ fontSize: 13, color: 'var(--gray-7)', marginBottom: 10 }}>How often should I send this?</div>
      <div style={{
        display: 'inline-flex', padding: 3, borderRadius: 8,
        background: 'var(--gray-1)', border: '1px solid var(--gray-2)'
      }}>
        {opts.map(o => (
          <button key={o} onClick={() => setSel(o)} style={{
            padding: '6px 14px', border: 0, borderRadius: 6,
            background: sel === o ? '#fff' : 'transparent',
            color: sel === o ? 'var(--gray-9)' : 'var(--gray-7)',
            fontSize: 13, fontWeight: sel === o ? 600 : 500,
            cursor: 'pointer',
            boxShadow: sel === o ? '0 1px 2px rgba(0,0,0,.08)' : 'none',
            transition: 'all .12s'
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

// PieCheck — circular progress indicator shaped like a pie chart.
// progress = 0 → empty circle ring. 0 < p < 1 → filled wedge (pie slice).
// progress = 1 → fully-filled solid disk (= complete).
// Animates smoothly whenever `progress` prop changes.
function PieCheck({ progress = 0, size = 18, color = 'var(--primary-500)', doneColor = 'var(--gray-4)', track = 'var(--gray-4)' }) {
  const r = size / 2;
  const cx = r, cy = r;
  const inner = r - 1.5;
  const target = Math.max(0, Math.min(1, progress));
  // Smoothly tween displayed progress toward the target so jumps between states
  // (e.g. 0.3 → 0.45 on each tick) look continuous instead of stepped.
  const [shown, setShown] = React.useState(target);
  const rafRef = React.useRef(null);
  const startRef = React.useRef({ from: target, to: target, t0: 0 });
  React.useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = { from: shown, to: target, t0: performance.now() };
    const dur = 650;
    const step = (now) => {
      const { from, to, t0 } = startRef.current;
      const k = Math.min(1, (now - t0) / dur);
      // easeOutCubic
      const e = 1 - Math.pow(1 - k, 3);
      setShown(from + (to - from) * e);
      if (k < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const p = shown;
  // Once complete, swap to the muted done color so finished items recede
  // visually and don't compete with still-active ones.
  const complete = p >= 0.999;
  const fill = complete ? doneColor : color;
  let wedge = null;
  if (complete) {
    wedge = <circle cx={cx} cy={cy} r={inner} fill={fill} />;
  } else if (p > 0.001) {
    const angle = p * 2 * Math.PI;
    const x = cx + inner * Math.sin(angle);
    const y = cy - inner * Math.cos(angle);
    const large = p > 0.5 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${cx} ${cy - inner} A ${inner} ${inner} 0 ${large} 1 ${x} ${y} Z`;
    wedge = <path d={d} fill={fill} />;
  }
  // Checkmark geometry scaled to circle size. Drawn in white on top of the
  // filled disk so it reads as "done" at a glance (Kelsi's request).
  const cm = {
    x1: size * 0.28, y1: size * 0.52,
    x2: size * 0.44, y2: size * 0.68,
    x3: size * 0.72, y3: size * 0.36,
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0, display: 'block' }}>
      <circle cx={cx} cy={cy} r={r - 0.75} fill="none" stroke={complete ? fill : track} strokeWidth="1.5" />
      {wedge}
      {complete && (
        <polyline
          points={`${cm.x1},${cm.y1} ${cm.x2},${cm.y2} ${cm.x3},${cm.y3}`}
          fill="none"
          stroke="#fff"
          strokeWidth={Math.max(1.5, size * 0.11)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function TodoList({ variant = 'default', defaultCollapsed = false }) {
  const initial = [
    { id: 1, t: 'Post job to BambooHR careers page', done: true, progress: 1 },
    { id: 2, t: 'Cross-post to LinkedIn and Indeed', done: true, progress: 1 },
    { id: 3, t: 'Notify hiring manager (Dana R.)', done: false, inProgress: true, progress: 0.55 },
    { id: 4, t: 'Schedule screening loop', done: false, progress: 0 },
    { id: 5, t: 'Draft offer letter template', done: false, progress: 0 },
  ];
  const [items, setItems] = React.useState(initial);
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  // Live-progress ticker. Walks the first not-done item toward completion,
  // then moves on to the next. Loops back to the start so the component reads
  // as "always working" on the canvas. Staggered per-instance so multiple
  // TodoLists visible at once don't tick in perfect unison.
  const stagger = React.useRef(Math.random() * 1200).current;
  React.useEffect(() => {
    let cancelled = false;
    let intervalId = null;
    const tick = () => {
      if (cancelled) return;
      setItems(prev => {
        const idx = prev.findIndex(i => !i.done);
        if (idx === -1) {
          // All done — reset after a beat so the animation keeps going.
          return prev.map((i, k) => k < 2
            ? { ...i, done: true, inProgress: false, progress: 1 }
            : { ...i, done: false, inProgress: k === 2, progress: k === 2 ? 0.1 : 0 }
          );
        }
        const cur = prev[idx];
        const step = 0.08 + Math.random() * 0.14;
        const next = Math.min(1, (cur.progress || 0) + step);
        return prev.map((i, k) => {
          if (k < idx) return i;
          if (k === idx) {
            if (next >= 1) return { ...i, done: true, inProgress: false, progress: 1 };
            return { ...i, inProgress: true, progress: next };
          }
          return i;
        });
      });
    };
    const startId = setTimeout(() => {
      if (cancelled) return;
      intervalId = setInterval(tick, 900 + Math.random() * 400);
    }, stagger);
    return () => {
      cancelled = true;
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [stagger]);

  const doneCount = items.filter(i => i.done).length;
  const muted = variant === 'muted';
  return (
    <div className="ai-card" style={{
      padding: '16px 18px',
      background: '#fff',
      borderColor: muted ? 'var(--gray-2)' : undefined,
      boxShadow: muted ? 'none' : undefined
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)' }}>Posting Senior Backend Engineer</div>
        <div style={{
          marginLeft: 'auto', fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
          color: 'var(--gray-7)'
        }}>{doneCount} / {items.length}</div>
        <button
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
          style={{
            width: 22, height: 22, padding: 0, border: 0, background: 'transparent',
            cursor: 'pointer', color: 'var(--gray-6)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform .15s' }}>
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </button>
      </div>
      <div style={{ height: 4, background: 'var(--gray-2)', borderRadius: 999, overflow: 'hidden', marginBottom: collapsed ? 0 : 12 }}>
        <div style={{ height: '100%', background: 'var(--primary-500)', width: `${(doneCount / items.length) * 100}%`, transition: 'width .3s' }} />
      </div>
      {!collapsed && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map(i => (
          <div key={i.id} style={{
            display: 'flex', gap: 10, alignItems: 'center',
            padding: '9px 6px'
          }}>
            <PieCheck
              progress={i.done ? 1 : (i.progress || 0)}
              size={18}
            />
            <span style={{
              fontSize: 14,
              color: i.done ? 'var(--gray-6)' : 'var(--gray-9)',
              fontWeight: i.inProgress ? 600 : 400,
              textDecoration: i.done ? 'line-through' : 'none',
              textDecorationColor: 'var(--gray-4)',
            }}>{i.t}</span>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

function DoneConfirm() {
  return (
    <div className="ai-card" style={{
      padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start'
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: '#2A8A3C', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        marginTop: 3
      }}><Ico.check style={{ width: 11, height: 11 }} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)' }}>Request submitted</div>
        <div style={{ fontSize: 13, color: 'var(--gray-7)' }}>
          Dana R. will get an email — usually approves within a day.
        </div>
      </div>
      <button className="fbtn fbtn-outlined fbtn-sm">View request</button>
    </div>
  );
}

// Slim-card variant — no title, no action link. Just a checkmark + sentence
// inside a thin card so it reads as a discrete result, not body copy.
function DoneConfirmMinimal() {
  return (
    <div className="ai-card" style={{
      padding: '8px 12px',
      display: 'flex', gap: 8, alignItems: 'center',
      fontSize: 13, color: 'var(--gray-8)'
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        background: '#2A8A3C', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}><Ico.check style={{ width: 9, height: 9 }} /></div>
      <span>Done — Jamie excluded. Cutting a paper check instead.</span>
    </div>
  );
}

function DoneConfirmDetail() {
  return (
    <div className="ai-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid var(--gray-2)', background: '#fff'
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%', background: '#2A8A3C', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><Ico.check style={{ width: 12, height: 12 }} /></div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)' }}>Offer sent to Priya Nair</div>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--gray-6)' }}>just now</div>
      </div>
      <div style={{ padding: '12px 18px', display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 6, columnGap: 12, fontSize: 13 }}>
        <div className="muted">Position</div><div style={{ color: 'var(--gray-9)' }}>Senior Backend Engineer</div>
        <div className="muted">Base salary</div><div style={{ color: 'var(--gray-9)' }}>$184,000 / yr</div>
        <div className="muted">Equity</div><div style={{ color: 'var(--gray-9)' }}>12,500 RSUs · 4 yr vest</div>
        <div className="muted">Start date</div><div style={{ color: 'var(--gray-9)' }}>Dec 9, 2026</div>
      </div>
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--gray-2)', display: 'flex', gap: 8, justifyContent: 'flex-end', background: 'var(--gray-05)' }}>
        <button className="fbtn fbtn-outlined fbtn-sm">Copy link</button>
        <button className="fbtn fbtn-primary fbtn-sm">Open offer</button>
      </div>
    </div>
  );
}

// ---------- To-do list pinned in an Ask window ----------
// Reuses <TodoList /> so the pinned strip in the chat panel is the same
// component as the standalone artboard. Header + chat thread wrap around it.
function TodoListInAskWindow() {
  const green = '#4B7B2D'; // BambooHR brand green from screenshot

  // Chat-bubble sparkle logo for the header
  const ChatSparkle = () => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h15A2.5 2.5 0 0 1 23 5.5v10A2.5 2.5 0 0 1 20.5 18H10l-5 4.5V18H5.5A2.5 2.5 0 0 1 3 15.5v-10Z" fill={green}/>
      <path d="M13 7l.9 2.1L16 10l-2.1.9L13 13l-.9-2.1L10 10l2.1-.9L13 7Z" fill="#fff"/>
      <circle cx="17.5" cy="7.5" r="1" fill="#fff"/>
    </svg>
  );

  return (
    <div style={{
      width: '100%', maxWidth: 400, height: 720, margin: '0 auto',
      display: 'flex', flexDirection: 'column',
      background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 14,
      boxShadow: '0 4px 14px rgba(0,0,0,.08)', overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 14px 12px', flexShrink: 0, background: '#fff'
      }}>
        <ChatSparkle />
        <div style={{
          fontSize: 20, fontWeight: 700, color: green, letterSpacing: '-0.01em',
          fontFamily: 'var(--font-serif)'
        }}>Ask BambooHR</div>
        <div style={{ flex: 1 }} />
        <button aria-label="Expand" style={{
          width: 30, height: 30, borderRadius: '50%',
          border: `1.5px solid ${green}`, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, color: green
        }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h4M3 3v4M13 13h-4M13 13v-4"/>
          </svg>
        </button>
        <button aria-label="Close" style={{
          width: 30, height: 30, borderRadius: '50%',
          border: '1.5px solid var(--gray-3)', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, color: 'var(--gray-7)'
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      </div>

      {/* Pinned to-do — reuses the standalone TodoList component */}
      <div style={{ padding: '0 14px 10px', flexShrink: 0 }}>
        <TodoList variant="muted" />
      </div>

      {/* Scrolling chat thread */}
      <div style={{
        flex: 1, overflow: 'auto', padding: '4px 14px 14px',
        display: 'flex', flexDirection: 'column', gap: 14
      }}>
        {/* Date divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 12, color: 'var(--gray-6)', margin: '4px 0'
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-2)' }} />
          <span>Tuesday, Nov 21</span>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-2)' }} />
        </div>

        {/* User msg — plain light-gray rounded rect */}
        <div style={{
          alignSelf: 'stretch', background: '#F2F3F1',
          padding: '12px 14px', borderRadius: 10,
          fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.45
        }}>
          Post the senior backend req and kick off sourcing.
        </div>

        {/* AI msg — left-aligned plain text, no avatar */}
        <div style={{ fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.55 }}>
          On it — I'll keep the checklist above updated as I go. I've already posted to the careers page and cross-listed on LinkedIn and Indeed.
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <button style={{ background: 'transparent', border: 0, padding: 2, cursor: 'pointer', color: 'var(--gray-5)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 22V11m0 0l4-8a2 2 0 0 1 3.7 1L13 10h5a2 2 0 0 1 2 2l-1.5 7a2 2 0 0 1-2 1.5H7z"/></svg>
            </button>
            <button style={{ background: 'transparent', border: 0, padding: 2, cursor: 'pointer', color: 'var(--gray-5)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2v11m0 0l-4 8a2 2 0 0 1-3.7-1L11 14H6a2 2 0 0 1-2-2l1.5-7A2 2 0 0 1 7.5 3.5H17z"/></svg>
            </button>
          </div>
        </div>

        {/* Follow-up user msg */}
        <div style={{
          alignSelf: 'stretch', background: '#F2F3F1',
          padding: '12px 14px', borderRadius: 10,
          fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.45
        }}>
          While you're at it — what's the comp band for this role?
        </div>

        {/* AI working state */}
        <div style={{ fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.55 }}>
          The 2026 band for Senior Backend is <b>$165k–$195k</b> base, plus standard equity. Most recent hires landed around $178k.
        </div>

        {/* More follow-up */}
        <div style={{
          alignSelf: 'stretch', background: '#F2F3F1',
          padding: '12px 14px', borderRadius: 10,
          fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.45
        }}>
          Include the range in the posting. And loop in Priya as a second interviewer.
        </div>

        <div style={{ fontSize: 13, color: 'var(--gray-7)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Dots />
          <span>Updating the posting and adding Priya to the loop…</span>
        </div>
      </div>

      {/* Composer */}
      <div style={{
        padding: 12, background: '#F5F6F4', flexShrink: 0
      }}>
        <div style={{
          border: '1px solid var(--gray-3)', borderRadius: 6, background: '#fff',
          padding: '10px 12px', display: 'flex', alignItems: 'flex-start', gap: 10,
          minHeight: 64
        }}>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-5)', lineHeight: 1.4 }}>
            Ask a question...
          </div>
          <button aria-label="Send" style={{
            background: 'transparent', border: 0, padding: 2, cursor: 'pointer',
            color: 'var(--gray-5)', alignSelf: 'flex-end'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Lightweight dots for thinking state used in ask window
function Dots() {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: '50%', background: 'var(--gray-5)',
          animation: `dotpulse 1.2s ${i * 0.15}s infinite ease-in-out`
        }} />
      ))}
      <style>{`@keyframes dotpulse { 0%,60%,100%{opacity:.3} 30%{opacity:1} }`}</style>
    </span>
  );
}

Object.assign(window, { MultipleChoice, MultipleChoiceChips, SingleChoice, SingleChoiceSegmented, TodoList, TodoListInAskWindow, DoneConfirm, DoneConfirmMinimal, DoneConfirmDetail });
