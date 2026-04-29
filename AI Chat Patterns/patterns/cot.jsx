// Chain-of-thought reasoning patterns — 3 variants

// Variant 1: Compact collapsed pill ("Thought for Ns") that expands
function CoTCompact() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="ai-card" style={{ padding: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', background: 'transparent', border: 0, padding: '12px 16px',
          cursor: 'pointer', textAlign: 'left'
        }}
      >
        <Ico.chevR style={{ color: 'var(--gray-6)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .18s' }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-7)' }}>Thought for 4 seconds</span>
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginLeft: 'auto', color: 'var(--gray-5)', flexShrink: 0 }}>
          <circle cx="8" cy="8" r="8" fill="currentColor"/>
          <path d="M4.5 8.2l2.3 2.3 4.7-4.7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          padding: '4px 16px 16px 16px', fontSize: 13, color: 'var(--gray-7)',
          lineHeight: 1.6, borderTop: '1px solid var(--gray-2)', margin: '0 0 0', paddingTop: 12
        }}>
          <p style={{ margin: 0 }}>The user asked about their PTO balance. Let me check their employee record for current balance, year-to-date usage, and accrual rate. I'll also note their next accrual date so they can plan around it.</p>
          <p style={{ margin: '8px 0 0' }}>Since they're in the US, I should display values in days (not hours) — that matches the policy document for US employees.</p>
        </div>
      )}
    </div>
  );
}

// Variant 2: Streaming — reasoning steps appearing live, muted and compact
function CoTStreaming() {
  const steps = [
    'Looking up Maria Jones in Employees…',
    'Cross-referencing with PTO policy for US salaried…',
    'Computing YTD usage and remaining balance…',
  ];
  const [count, setCount] = React.useState(steps.length);
  React.useEffect(() => {
    let i = 0;
    setCount(0);
    const t = setInterval(() => {
      i++;
      if (i > steps.length) { clearInterval(t); i = 0; setCount(steps.length); return; }
      setCount(i);
    }, 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ai-card" style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div className="spinner" />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-8)' }}>Reasoning</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 4 }}>
        {steps.slice(0, count).map((s, i) => (
          <div key={i} style={{
            fontSize: 13, color: 'var(--gray-7)',
            display: 'flex', alignItems: 'flex-start', gap: 8,
            animation: 'fadeIn .3s ease'
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: i < count - 1 ? 'var(--primary-500)' : 'var(--gray-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', flexShrink: 0, marginTop: 2
            }}>
              {i < count - 1 && <Ico.check style={{ width: 9, height: 9 }} />}
            </div>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-2px);} to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

// Variant 3: Numbered step-list, collapsible with same header pill as Compact
function CoTStepList() {
  const [open, setOpen] = React.useState(true);
  const steps = [
    { t: 'Identify the request', b: 'User wants Q3 performance cycle status across Engineering.' },
    { t: 'Pull the relevant data', b: 'Query the performance module for cycle "Q3 2026", filter dept = Engineering.' },
    { t: 'Check completion vs targets', b: 'Compare submitted self-reviews + manager reviews against 142 eligible employees.' },
    { t: 'Flag anomalies', b: '3 managers are still pending — Kai Alvarez, Jo Park, and Priya Nair.' },
  ];
  return (
    <div className="ai-card" style={{ padding: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', background: 'transparent', border: 0, padding: '12px 16px',
          cursor: 'pointer', textAlign: 'left'
        }}
      >
        <Ico.chevR style={{ color: 'var(--gray-6)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .18s' }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-7)' }}>Thought for 1.8 seconds</span>
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginLeft: 'auto', color: 'var(--gray-5)', flexShrink: 0 }}>
          <circle cx="8" cy="8" r="8" fill="currentColor"/>
          <path d="M4.5 8.2l2.3 2.3 4.7-4.7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: '12px 18px 16px 16px', borderTop: '1px solid var(--gray-2)' }}>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {steps.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--gray-1)', color: 'var(--gray-7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, flexShrink: 0, fontVariantNumeric: 'tabular-nums'
                }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-8)', marginBottom: 2 }}>{s.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-7)', lineHeight: 1.5 }}>{s.b}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CoTCompact, CoTStreaming, CoTStepList });
