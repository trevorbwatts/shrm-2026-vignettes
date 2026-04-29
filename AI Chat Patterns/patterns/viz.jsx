// Data viz cards — KPI stat, bar chart, line/trend, donut, mini table
// Aligned to Fabric Encore tokens: accent-* for series color, gray-* for
// chrome, spacing/radius scales, text-* classes for labels.

// Shared footer: outlined pill buttons. "View report" is always first;
// secondary actions are context-appropriate — never generic Export/Share.
function VizActions({ actions = ['View report'] }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--sp-xs)', flexWrap: 'wrap',
      borderTop: '1px solid var(--border-neutral-x-weak)',
      marginTop: 'var(--sp-s)', paddingTop: 'var(--sp-s)',
    }}>
      {actions.map((label, i) => (
        <button key={label} className="fbtn fbtn-outlined fbtn-sm">
          {i === 0 && <Ico.externalLink style={{ width: 11, height: 11 }} />}
          {label}
        </button>
      ))}
    </div>
  );
}

// Shared header block — eyebrow label + (optional) side-aligned stat or meta.
function VizHeader({ eyebrow, title, sub, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 'var(--sp-s)' }}>
      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-weak)',
            textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2
          }}>{eyebrow}</div>
        )}
        {title && <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-x-strong)', lineHeight: 1.25 }}>{title}</div>}
        {sub && <div style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function VizKPI() {
  return (
    <div className="ai-card" style={{ padding: 'var(--sp-m)', maxWidth: 300 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-weak)',
        textTransform: 'uppercase', letterSpacing: '.06em'
      }}>Voluntary turnover · YTD</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 700,
          color: 'var(--text-neutral-x-strong)', letterSpacing: '-0.02em', lineHeight: 1
        }}>8.4<span style={{ fontSize: 24, color: 'var(--text-neutral-medium)' }}>%</span></div>
        <div style={{
          fontSize: 12, fontWeight: 600, color: 'var(--success-dark)',
          display: 'inline-flex', alignItems: 'center', gap: 2,
          background: 'var(--success-light)', padding: '2px 6px',
          borderRadius: 'var(--radius-100)'
        }}>
          <Ico.down style={{ width: 10, height: 10 }} />1.2pt
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginTop: 4 }}>vs. same period last year</div>
      {/* sparkline */}
      <svg width="100%" height="42" viewBox="0 0 240 42" preserveAspectRatio="none" style={{ marginTop: 12, display: 'block' }}>
        <path d="M0,30 L30,24 L60,26 L90,20 L120,22 L150,14 L180,18 L210,10 L240,8"
              fill="none" stroke="var(--accent-pine-green)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
        <path d="M0,30 L30,24 L60,26 L90,20 L120,22 L150,14 L180,18 L210,10 L240,8 L240,42 L0,42 Z"
              fill="var(--accent-pine-green)" opacity=".12"/>
      </svg>
      <VizActions actions={['View report']} />
    </div>
  );
}

function VizBar() {
  // Single series — use one brand color, not a different hue per row (that
  // implies categorical grouping). Reserve multi-hue for true categories.
  const data = [
    { l: 'Engineering', v: 142 },
    { l: 'Sales', v: 96 },
    { l: 'Customer Exp', v: 54 },
    { l: 'Product', v: 38 },
    { l: 'Marketing', v: 24 },
    { l: 'Finance', v: 18 },
  ];
  const max = Math.max(...data.map(d => d.v));
  return (
    <div className="ai-card" style={{ padding: 'var(--sp-m) var(--sp-l)', maxWidth: 440 }}>
      <VizHeader
        title="Headcount by department"
        sub="As of today · 372 total"
        right={<span className="pill" style={{ fontSize: 11 }}>Nov 21, 2026</span>}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-xs)' }}>
        {data.map(d => (
          <div key={d.l} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 36px', gap: 10, alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text-neutral-medium)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.l}</div>
            <div style={{ height: 14, background: 'var(--gray-1)', borderRadius: 'var(--radius-100)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0, width: `${(d.v / max) * 100}%`,
                background: 'var(--primary-500)', borderRadius: 'var(--radius-100)'
              }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-neutral-x-strong)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{d.v}</div>
          </div>
        ))}
      </div>
      <VizActions actions={['View report']} />
    </div>
  );
}

function VizLine() {
  // Turnover over 12 months
  const data = [11.2, 10.8, 10.9, 10.1, 9.7, 9.8, 9.2, 8.9, 8.6, 8.5, 8.4, 8.4];
  const max = 12, min = 7;
  const labels = ['Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];
  const W = 400, H = 150, pad = { l: 30, r: 10, t: 10, b: 22 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const pts = data.map((v, i) => {
    const x = pad.l + (i / (data.length - 1)) * iw;
    const y = pad.t + (1 - (v - min) / (max - min)) * ih;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p.join(',')).join(' ');
  const area = path + ` L${pts[pts.length - 1][0]},${pad.t + ih} L${pts[0][0]},${pad.t + ih} Z`;
  return (
    <div className="ai-card" style={{ padding: 'var(--sp-m) var(--sp-l)', maxWidth: 460 }}>
      <VizHeader
        title="Voluntary turnover trend"
        sub="Rolling 12-month rate"
        right={
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--text-neutral-x-strong)', lineHeight: 1 }}>8.4%</div>
            <div style={{ fontSize: 11, color: 'var(--success-dark)', fontWeight: 600, marginTop: 2 }}>↓ 2.8pt YoY</div>
          </div>
        }
      />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {[7, 9, 11].map(v => {
          const y = pad.t + (1 - (v - min) / (max - min)) * ih;
          return (
            <g key={v}>
              <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="var(--gray-2)" strokeDasharray="2 3"/>
              <text x={pad.l - 6} y={y + 3} fontSize="10" textAnchor="end" fill="var(--gray-5)">{v}%</text>
            </g>
          );
        })}
        <path d={area} fill="var(--accent-pine-green)" opacity=".14"/>
        <path d={path} fill="none" stroke="var(--accent-pine-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="var(--accent-pine-green)"/>)}
        {labels.map((l, i) => {
          if (i % 2 !== 0) return null;
          const x = pad.l + (i / (data.length - 1)) * iw;
          return <text key={i} x={x} y={H - 6} fontSize="10" textAnchor="middle" fill="var(--gray-5)">{l}</text>;
        })}
      </svg>
      <VizActions actions={['View report']} />
    </div>
  );
}

function VizDonut() {
  // Semantic colors: below = error, in range = success/brand, above = attention
  const data = [
    { l: 'Below range', v: 12, c: 'var(--error)' },
    { l: 'In range', v: 78, c: 'var(--primary-500)' },
    { l: 'Above range', v: 10, c: 'var(--attention)' },
  ];
  const total = data.reduce((s, d) => s + d.v, 0);
  const R = 54, r = 38, cx = 72, cy = 72;
  let acc = 0;
  const arcs = data.map(d => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.v;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const x3 = cx + r * Math.cos(a0), y3 = cy + r * Math.sin(a0);
    return { d, path: `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${large} 0 ${x3},${y3} Z` };
  });
  return (
    <div className="ai-card" style={{ padding: 'var(--sp-m) var(--sp-l)', maxWidth: 380 }}>
      <div style={{ display: 'flex', gap: 'var(--sp-m)', alignItems: 'center' }}>
        <svg width="144" height="144" viewBox="0 0 144 144" style={{ flexShrink: 0 }}>
          {arcs.map((a, i) => <path key={i} d={a.path} fill={a.d.c} />)}
          <text x="72" y="70" fontFamily="var(--font-serif)" fontSize="22" fontWeight="700" textAnchor="middle" fill="var(--gray-9)">372</text>
          <text x="72" y="86" fontSize="10" textAnchor="middle" fill="var(--gray-6)">employees</text>
        </svg>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-x-strong)', marginBottom: 3 }}>Salary vs. market range</div>
          <div style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginBottom: 'var(--sp-s)' }}>Benchmark: Radford 2026 H2</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {data.map(d => (
              <div key={d.l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 'var(--radius-100)', background: d.c }} />
                <span style={{ flex: 1, color: 'var(--text-neutral-medium)' }}>{d.l}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-neutral-x-strong)', fontVariantNumeric: 'tabular-nums' }}>{d.v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <VizActions actions={['View report', 'View below range']} />
    </div>
  );
}

function VizTable() {
  const rows = [
    ['Priya Nair', 'Backend', 5, 'Exceeds'],
    ['Jonah Keller', 'Platform', 4, 'Meets+'],
    ['Sam Chen', 'Frontend', 4, 'Meets+'],
    ['Aiko Tanaka', 'SRE', 5, 'Exceeds'],
    ['Marc Silva', 'Backend', 3, 'Meets'],
  ];
  const Stars = ({ n }) => (
    <span style={{ display: 'inline-flex', gap: 1 }} aria-label={`${n} out of 5`}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M6 1.2l1.42 2.88 3.18.46-2.3 2.24.54 3.17L6 8.46 3.16 9.95l.54-3.17L1.4 4.54l3.18-.46z"
                fill={i <= n ? 'var(--accent-poppy-yellow)' : 'var(--gray-2)'}/>
        </svg>
      ))}
    </span>
  );
  return (
    <div className="ai-card" style={{ padding: 0, maxWidth: 460, overflow: 'hidden' }}>
      <div style={{ padding: 'var(--sp-s) var(--sp-m) var(--sp-xs)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-x-strong)' }}>Top performers · Engineering Q3</div>
        <div style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginTop: 2 }}>Based on calibrated manager ratings</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--gray-05)', borderTop: '1px solid var(--border-neutral-x-weak)', borderBottom: '1px solid var(--border-neutral-x-weak)' }}>
            {['Employee', 'Team', 'Rating', 'Band'].map(h => (
              <th key={h} style={{
                textAlign: 'left', padding: '8px 14px', fontSize: 11, fontWeight: 600,
                textTransform: 'uppercase', color: 'var(--text-neutral-weak)', letterSpacing: '.06em'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i === rows.length - 1 ? 0 : '1px solid var(--border-neutral-xx-weak)' }}>
              <td style={{ padding: '9px 14px', color: 'var(--text-neutral-x-strong)', fontWeight: 500 }}>{r[0]}</td>
              <td style={{ padding: '9px 14px', color: 'var(--text-neutral-medium)' }}>{r[1]}</td>
              <td style={{ padding: '9px 14px' }}><Stars n={r[2]} /></td>
              <td style={{ padding: '9px 14px' }}>
                <span className={r[3] === 'Exceeds' ? 'pill pill-success' : 'pill'} style={{ fontSize: 11 }}>{r[3]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: '0 12px 10px' }}>
        <VizActions actions={['View report', 'View all 23']} />
      </div>
    </div>
  );
}

Object.assign(window, { VizKPI, VizBar, VizLine, VizDonut, VizTable });
