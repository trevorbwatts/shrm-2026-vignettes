// Artifact cards — markdown, image, CSV, code, HTML preview

function ArtifactBase({ icon, color, bg, type, title, meta, preview, actions }) {
  return (
    <div className="ai-card" style={{ padding: 0, overflow: 'hidden', maxWidth: 460 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8, background: bg, color,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-6)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color, letterSpacing: '.03em', textTransform: 'uppercase', fontSize: 10 }}>{type}</span>
            <span>·</span>
            <span>{meta}</span>
          </div>
        </div>
        <button className="fbtn fbtn-outlined fbtn-sm" style={{ padding: '0 10px' }}><Ico.externalLink /></button>
      </div>
      {preview && <div style={{ borderTop: '1px solid var(--gray-2)' }}>{preview}</div>}
      {actions && (
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--gray-2)', display: 'flex', gap: 8, background: 'var(--gray-05)' }}>{actions}</div>
      )}
    </div>
  );
}

function ArtifactMarkdown() {
  return (
    <ArtifactBase
      icon={<Ico.doc style={{ width: 20, height: 20 }} />}
      color="#1B7AC2" bg="#EAF4FB"
      type="Markdown"
      title="Q4 2026 Headcount Plan.md"
      meta="3.2 KB · just now"
      preview={
        <div style={{
          padding: '14px 16px', fontSize: 12, lineHeight: 1.55,
          color: 'var(--gray-7)', maxHeight: 132, overflow: 'hidden',
          position: 'relative', background: '#fff'
        }}>
          <div style={{ fontSize: 14, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--gray-9)', marginBottom: 4 }}># Q4 2026 Headcount Plan</div>
          <div>Targeted adds by department, aligned to the approved operating plan.</div>
          <div style={{ marginTop: 8, fontWeight: 600, color: 'var(--gray-9)' }}>## Engineering</div>
          <div>- 4 backend, 2 platform, 1 SRE</div>
          <div>- Priority: infra reliability (Q1 '27 incidents)</div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: 'linear-gradient(to bottom, transparent, #fff)' }} />
        </div>
      }
      actions={
        <>
          <button className="fbtn fbtn-outlined fbtn-sm"><Ico.copy />Copy</button>
          <button className="fbtn fbtn-outlined fbtn-sm"><Ico.download />Download</button>
          <div style={{ flex: 1 }} />
          <button className="fbtn fbtn-primary fbtn-sm">Open editor</button>
        </>
      }
    />
  );
}

function ArtifactImage() {
  return (
    <ArtifactBase
      icon={<Ico.image style={{ width: 20, height: 20 }} />}
      color="#9853b9" bg="#f9edff"
      type="Image"
      title="org-chart-engineering-nov-2026.png"
      meta="1240 × 780 · 186 KB"
      preview={
        <div style={{ height: 160, background: 'linear-gradient(135deg, #f9edff, #EAF4FB)', position: 'relative', overflow: 'hidden' }}>
          <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid meet">
            {/* simple org-chart illustration */}
            <g fill="none" stroke="#9853b9" strokeWidth="1.2">
              <line x1="150" y1="40" x2="80" y2="90" />
              <line x1="150" y1="40" x2="150" y2="90" />
              <line x1="150" y1="40" x2="220" y2="90" />
              <line x1="80" y1="110" x2="50" y2="140" />
              <line x1="80" y1="110" x2="110" y2="140" />
              <line x1="220" y1="110" x2="190" y2="140" />
              <line x1="220" y1="110" x2="250" y2="140" />
            </g>
            {[[150,35,'VP'],[80,95,'Eng Mgr'],[150,95,'Eng Mgr'],[220,95,'Eng Mgr'],
              [50,145,''],[110,145,''],[190,145,''],[250,145,'']].map(([x,y,t], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={t ? 14 : 10} fill="#fff" stroke="#9853b9" strokeWidth="1.5"/>
                {t && <text x={x} y={y+3} textAnchor="middle" fontSize="8" fontWeight="600" fill="#683180">{t}</text>}
              </g>
            ))}
          </svg>
        </div>
      }
    />
  );
}

function ArtifactCSV() {
  const rows = [
    ['Dept', 'Headcount', 'Open reqs', 'Attrition'],
    ['Engineering', '142', '7', '4.2%'],
    ['Product', '38', '2', '6.1%'],
    ['Sales', '96', '12', '11.3%'],
    ['CX', '54', '3', '5.0%'],
  ];
  return (
    <ArtifactBase
      icon={<Ico.table style={{ width: 20, height: 20 }} />}
      color="#2A8A3C" bg="#E8F5EA"
      type="Spreadsheet"
      title="headcount-by-dept.csv"
      meta="5 columns · 28 rows"
      preview={
        <div style={{ padding: 0, background: '#fff', fontSize: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)' }}>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ background: i === 0 ? 'var(--gray-1)' : '#fff' }}>
                  {r.map((c, j) => (
                    <td key={j} style={{
                      padding: '6px 10px',
                      borderTop: i === 0 ? 0 : '1px solid var(--gray-2)',
                      color: i === 0 ? 'var(--gray-7)' : 'var(--gray-9)',
                      fontWeight: i === 0 ? 600 : 400,
                      textAlign: j === 0 ? 'left' : 'right'
                    }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}

function ArtifactCode() {
  return (
    <ArtifactBase
      icon={<Ico.code style={{ width: 18, height: 18 }} />}
      color="#38312f" bg="#f5f4f1"
      type="Python"
      title="pto_accrual.py"
      meta="42 lines"
      preview={
        <pre style={{
          margin: 0, padding: '12px 14px', fontSize: 12, lineHeight: 1.55,
          fontFamily: 'var(--font-mono)', background: '#38312f', color: '#e4e3e0',
          maxHeight: 140, overflow: 'hidden', position: 'relative'
        }}>
{`def accrual(hire_date, today, plan):
    months = (today - hire_date).days / 30.44
    base = plan["base_days"]
    tier = plan["tier_bonus"](months)
    return base + tier

# monthly accrual for US salaried, after tenure bonus`}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 30, background: 'linear-gradient(transparent, #38312f)' }} />
        </pre>
      }
    />
  );
}

function ArtifactHTML() {
  return (
    <ArtifactBase
      icon={<Ico.globe style={{ width: 18, height: 18 }} />}
      color="#cd4a00" bg="#fff1e5"
      type="HTML"
      title="benefits-summary-2027.html"
      meta="interactive · 12 sections"
      preview={
        <div style={{ height: 156, background: '#fff', padding: 16, overflow: 'hidden', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, marginBottom: 4, color: 'var(--gray-9)' }}>Your 2027 benefits at a glance</div>
          <div style={{ fontSize: 11, color: 'var(--gray-6)', marginBottom: 10 }}>Enrollment closes Dec 1, 2026</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['Medical','PPO + HSA'],['Dental','Premier'],['401k','5% match']].map(([t,s]) => (
              <div key={t} style={{
                flex: 1, border: '1px solid var(--gray-2)', borderRadius: 8, padding: 8
              }}>
                <div style={{ fontSize: 10, color: 'var(--gray-6)', textTransform: 'uppercase', fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-9)', marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 30, background: 'linear-gradient(transparent, #fff)' }} />
        </div>
      }
    />
  );
}

Object.assign(window, { ArtifactMarkdown, ArtifactImage, ArtifactCSV, ArtifactCode, ArtifactHTML });
