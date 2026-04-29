// Inline comment / request patterns — let a user anchor a question or request
// to a specific element in the AI's output (a cell, a chart bar, a sentence, a card).
//
// Three takes, from quiet to loud:
//   InlineComposerPin    — Figma-style pinned popover anchored to an element
//   InlineSelectionMenu  — text selection → floating "Ask AI" action bar
//   InlineElementHover   — hover an element → inline action row ("Explain", "Change", "Ask…")

// ---------- shared composer ----------
// Small composer reused in the pin + thread patterns.
function MiniComposer({ placeholder = 'Ask about this…', onSend, autoFocus, suggestions = [] }) {
  const [v, setV] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => { if (autoFocus && ref.current) ref.current.focus(); }, [autoFocus]);
  const send = () => { if (!v.trim()) return; onSend?.(v.trim()); setV(''); };
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 6,
        background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 10,
        padding: '6px 6px 6px 10px', transition: 'border-color .15s',
      }}>
        <textarea
          ref={ref}
          value={v}
          onChange={e => setV(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={placeholder}
          rows={1}
          style={{
            flex: 1, border: 0, outline: 'none', resize: 'none',
            fontSize: 13, lineHeight: 1.4, color: 'var(--gray-9)',
            fontFamily: 'inherit', background: 'transparent',
            padding: '4px 0', minHeight: 20, maxHeight: 120,
          }}
        />
        <button
          onClick={send}
          disabled={!v.trim()}
          className="fbtn fbtn-primary"
          style={{
            width: 28, height: 28, padding: 0, borderRadius: 8,
            opacity: v.trim() ? 1 : 0.4, transition: 'opacity .15s',
          }}
          aria-label="Send"
        >
          <Ico.arrowUp />
        </button>
      </div>
      {suggestions.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { setV(s); ref.current?.focus(); }}
              style={{
                background: 'var(--gray-1)', border: '1px solid var(--gray-2)',
                color: 'var(--gray-8)', borderRadius: 1000,
                padding: '4px 10px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              }}>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- 1. Pin + popover ----------
// Click a pin anchored to an element → composer popover opens with context chip.
function InlineComposerPin() {
  const [open, setOpen] = React.useState(true);
  const [sent, setSent] = React.useState(null);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* The referenced content — an AI-generated summary card */}
      <div className="ai-card" style={{ padding: '16px 18px', position: 'relative' }}>
        <div style={{ fontSize: 13, color: 'var(--gray-6)', marginBottom: 10 }}>Q3 turnover · Engineering</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--gray-9)', lineHeight: 1 }}>
          8.4%
        </div>

        {/* The highlighted sentence — the comment anchors here */}
        <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.5, color: 'var(--gray-9)' }}>
          Turnover trended{' '}
          <span style={{
            background: open ? 'rgba(252, 196, 0, 0.28)' : 'transparent',
            padding: '1px 3px', margin: '0 -3px', borderRadius: 3,
            transition: 'background .2s', position: 'relative',
          }}>
            down 1.2 points from Q2
            {/* The pin itself */}
            <button
              onClick={() => setOpen(o => !o)}
              title="Comment on this"
              style={{
                position: 'absolute', top: -10, right: -26,
                width: 22, height: 22, borderRadius: '50% 50% 50% 2px',
                background: 'var(--primary-500)', color: '#fff',
                border: '2px solid #fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                transform: 'rotate(-8deg)', padding: 0,
              }}>
              <span style={{ fontSize: 10, fontWeight: 700, transform: 'rotate(8deg)' }}>1</span>
            </button>
          </span>
          {' '}after the promotion cycle landed.
        </div>
        <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: 'var(--gray-9)' }}>
          Sales and Support held flat.
        </div>
      </div>

      {/* The popover — anchored below the highlighted region */}
      {open && (
        <div style={{
          position: 'absolute', top: 116, left: 24, width: 320,
          background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
          padding: 12, zIndex: 5,
        }}>
          {/* pointer triangle */}
          <div style={{
            position: 'absolute', top: -6, left: 34, width: 12, height: 12,
            background: '#fff', borderLeft: '1px solid var(--gray-3)', borderTop: '1px solid var(--gray-3)',
            transform: 'rotate(45deg)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: 'var(--primary-900)',
              background: 'var(--primary-100)', padding: '3px 8px', borderRadius: 1000,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <Ico.at style={{ width: 10, height: 10 }} />
              "down 1.2 points from Q2"
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: 'auto', background: 'transparent', border: 0, padding: 4,
              color: 'var(--gray-6)', cursor: 'pointer', display: 'flex',
            }}><Ico.x /></button>
          </div>

          {sent ? (
            <div style={{
              background: 'var(--gray-1)', borderRadius: 8, padding: '8px 10px',
              fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.4,
            }}>
              <div style={{ fontSize: 11, color: 'var(--gray-6)', marginBottom: 3, fontWeight: 600 }}>You asked</div>
              {sent}
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gray-6)', fontSize: 12 }}>
                <Dots />
                <span>AI is thinking…</span>
              </div>
            </div>
          ) : (
            <MiniComposer
              autoFocus
              placeholder="Ask about this number…"
              onSend={setSent}
              suggestions={['Which team drove this?', 'Compare to last year', 'Break down by level']}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ---------- 2. Selection menu ----------
// Simulates the user having highlighted text — shows a floating action bar.
function InlineSelectionMenu() {
  const [mode, setMode] = React.useState('idle'); // 'idle' | 'asking' | 'sent'
  const [sent, setSent] = React.useState('');

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="ai-card" style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 13, color: 'var(--gray-6)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Ico.sparkles style={{ color: 'var(--primary-500)' }} />
          Hiring summary
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--gray-9)' }}>
          We closed{' '}
          <span style={{ background: '#D4E8FA', padding: '1px 2px', borderRadius: 2, position: 'relative' }}>
            14 offers across Engineering and Design
          </span>
          {' '}this quarter, up from 9 in Q2. Average time-to-fill dropped from 38 to 29 days, largely driven
          by the new structured-interview rubric rolling out in Engineering.
        </div>
      </div>

      {/* Floating selection menu */}
      <div style={{
        position: 'absolute', top: 76, left: 38,
        background: 'var(--gray-9)', color: '#fff',
        borderRadius: 10, padding: 4, display: 'flex', alignItems: 'center', gap: 2,
        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        fontSize: 12, fontWeight: 500,
      }}>
        {mode === 'idle' && (
          <>
            <SelBtn onClick={() => setMode('asking')} icon={<Ico.sparkles />}>Ask AI</SelBtn>
            <SelBtn>Explain</SelBtn>
            <SelBtn>Expand</SelBtn>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.18)', margin: '0 2px' }} />
            <SelBtn icon={<Ico.copy />}>Copy</SelBtn>
          </>
        )}
        {mode === 'asking' && (
          <div style={{ padding: 6, width: 280 }}>
            <MiniComposer
              autoFocus
              placeholder="Ask about the selected text…"
              onSend={(t) => { setSent(t); setMode('sent'); }}
            />
          </div>
        )}
        {mode === 'sent' && (
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Dots light />
            <span>Asking: "{sent.length > 32 ? sent.slice(0, 32) + '…' : sent}"</span>
            <button onClick={() => setMode('idle')} style={{
              background: 'transparent', border: 0, color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer', padding: 2, display: 'flex', marginLeft: 4,
            }}><Ico.x /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function SelBtn({ children, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 0, color: '#fff',
      padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      {icon}
      {children}
    </button>
  );
}

// ---------- 3. Element hover row ----------
// For card-shaped elements (chart bars, list rows, data cells). On hover, reveal
// a small inline action row with a quick composer.
function InlineElementHover() {
  const [hovering, setHovering] = React.useState(true); // default open for demo
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [sent, setSent] = React.useState(null);

  const rows = [
    { dept: 'Engineering', head: 84, change: '+6' },
    { dept: 'Design', head: 22, change: '+2', hot: true },
    { dept: 'Sales', head: 58, change: '−3' },
    { dept: 'Support', head: 31, change: '0' },
  ];

  return (
    <div className="ai-card" style={{ padding: 0, overflow: 'visible' }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--gray-2)', fontSize: 13, fontWeight: 600, color: 'var(--gray-8)' }}>
        Headcount by department
      </div>
      <div>
        {rows.map((r, i) => {
          const isHot = r.hot;
          return (
            <div key={i}
              onMouseEnter={() => isHot && setHovering(true)}
              style={{
                display: 'flex', alignItems: 'center', padding: '10px 14px',
                borderBottom: i < rows.length - 1 ? '1px solid var(--gray-2)' : 'none',
                background: isHot && hovering ? 'var(--gray-1)' : '#fff',
                position: 'relative',
                transition: 'background .15s',
              }}>
              <div style={{ flex: 1, fontSize: 14, color: 'var(--gray-9)', fontWeight: isHot ? 600 : 400 }}>{r.dept}</div>
              <div style={{ width: 60, fontSize: 14, fontVariantNumeric: 'tabular-nums', color: 'var(--gray-9)' }}>{r.head}</div>
              <div style={{
                width: 56, fontSize: 13, fontVariantNumeric: 'tabular-nums', fontWeight: 500,
                color: r.change.startsWith('+') ? 'var(--success-dark)' : r.change.startsWith('−') ? 'var(--error-dark)' : 'var(--gray-6)',
              }}>{r.change}</div>

              {/* Hover action row — only shown on the "hot" row for demo clarity */}
              {isHot && hovering && !composerOpen && (
                <div style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  display: 'flex', gap: 4,
                  background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 8,
                  padding: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}>
                  <MiniAction onClick={() => setComposerOpen(true)} icon={<Ico.sparkles />}>Ask</MiniAction>
                  <MiniAction>Explain</MiniAction>
                  <MiniAction>Drill in</MiniAction>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {composerOpen && (
        <div style={{
          padding: 10, borderTop: '1px solid var(--gray-2)', background: 'var(--gray-1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--primary-900)',
              background: 'var(--primary-100)', padding: '2px 7px', borderRadius: 1000,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <Ico.at style={{ width: 10, height: 10 }} /> Design row
            </span>
            <span style={{ fontSize: 11, color: 'var(--gray-6)' }}>Ask about this row</span>
            <button onClick={() => { setComposerOpen(false); setSent(null); }} style={{
              marginLeft: 'auto', background: 'transparent', border: 0, padding: 2,
              color: 'var(--gray-6)', cursor: 'pointer', display: 'flex',
            }}><Ico.x /></button>
          </div>
          {sent ? (
            <div style={{ fontSize: 13, color: 'var(--gray-7)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dots /> Answering "{sent}"
            </div>
          ) : (
            <MiniComposer
              autoFocus
              placeholder="e.g. Who did we hire in Design this quarter?"
              onSend={setSent}
              suggestions={['List new hires', 'Compare to plan', 'Any open reqs?']}
            />
          )}
        </div>
      )}
    </div>
  );
}

function MiniAction({ children, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: 0, padding: '4px 8px', borderRadius: 5,
      fontSize: 12, fontWeight: 500, color: 'var(--gray-8)',
      display: 'inline-flex', alignItems: 'center', gap: 4,
      cursor: 'pointer', fontFamily: 'inherit',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-2)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      {icon}{children}
    </button>
  );
}

// tiny bouncing-dots used in "thinking" placeholders
function Dots({ light }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: '50%',
          background: light ? 'rgba(255,255,255,0.8)' : 'var(--gray-6)',
          animation: `bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
        }} />
      ))}
    </span>
  );
}

// ---------- 4. Form-field Ask AI / Fill with AI ----------
// Each label in a form gets two quiet trailing affordances:
//   • Fill with AI — autofills this field from data Bamboo already has
//     (profile, last submission, org defaults). Shows a chip the user
//     can accept or dismiss.
//   • Ask AI — opens a focused Ask AI popover scoped to THIS field, for
//     "what does this mean / why do we need it / what format" questions.
//
// Pattern goals: don't crowd the label, don't block the user from just
// typing the value themselves, and make it obvious the AI reply is
// scoped to the specific input (not the whole form).
function InlineFormFieldAI() {
  // Field-level state
  const [fname, setFname] = React.useState('');
  const [taxId, setTaxId] = React.useState('');
  const [emg, setEmg] = React.useState('');

  // Open states (mutually exclusive — only one popover at a time)
  const [openPop, setOpenPop] = React.useState('tax-explain'); // default: explain panel on Tax ID
  const close = () => setOpenPop(null);

  // "Fill" suggestion state
  const [fnameSuggested, setFnameSuggested] = React.useState(true);

  return (
    <div style={{ width: '100%', maxWidth: 540, position: 'relative' }}>
      <div className="ai-card" style={{ padding: '18px 20px 22px' }}>
        <div style={{ fontSize: 13, color: 'var(--gray-6)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Ico.briefcase style={{ width: 14, height: 14 }} />
          New hire · Section 2 of 4 · Personal
        </div>

        {/* -- Field 1 · Fill with AI (suggestion chip state) ------------ */}
        <FieldShell
          label="Preferred first name"
          trailing={
            <FieldAILink
              icon={<Ico.sparkles />}
              tone="fill"
              onClick={() => setOpenPop(openPop === 'fname-fill' ? null : 'fname-fill')}
              active={openPop === 'fname-fill'}
            >
              Fill
            </FieldAILink>
          }
        >
          <FieldInput value={fname} onChange={setFname} placeholder="Enter preferred name" />
          {fnameSuggested && !fname && (
            <FillSuggestion
              text="Maria"
              source="Profile · legal name: María Fernández Rivera"
              onAccept={() => { setFname('Maria'); setFnameSuggested(false); }}
              onDismiss={() => setFnameSuggested(false)}
            />
          )}
        </FieldShell>

        {/* -- Field 2 · Ask AI (popover open) --------------------------- */}
        <FieldShell
          label="Tax Identification Number"
          required
          hint="Format varies by country."
          trailing={
            <FieldAILink
              icon={<Ico.info />}
              tone="ask"
              onClick={() => setOpenPop(openPop === 'tax-explain' ? null : 'tax-explain')}
              active={openPop === 'tax-explain'}
            >
              Ask
            </FieldAILink>
          }
          popover={
            openPop === 'tax-explain' && (
              <FieldAskPopover
                title="Tax Identification Number"
                onClose={close}
                body={
                  <>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--gray-9)' }}>
                      The <b>TIN</b> is the government-issued number used to report this
                      employee's income. We require it so payroll can file the correct
                      year-end forms (W-2 in the US, T4 in Canada, P45/P60 in the UK).
                    </p>
                    <div style={{
                      marginTop: 10, padding: '8px 10px', background: 'var(--gray-1)',
                      borderRadius: 6, fontSize: 12, color: 'var(--gray-8)', lineHeight: 1.45,
                    }}>
                      <b style={{ color: 'var(--gray-9)' }}>Format by country:</b><br />
                      US · SSN, 9 digits (123-45-6789)<br />
                      Canada · SIN, 9 digits<br />
                      UK · NINO, 2 letters + 6 digits + 1 letter
                    </div>
                  </>
                }
                followUps={['Where does the employee find this?', 'Is this encrypted?', 'Can I skip and add later?']}
              />
            )
          }
        >
          <FieldInput value={taxId} onChange={setTaxId} placeholder="e.g. 123-45-6789" />
        </FieldShell>

        {/* -- Field 3 · both links, idle state --------------------------- */}
        <FieldShell
          label="Emergency contact"
          trailing={
            <>
              <FieldAILink
                icon={<Ico.sparkles />}
                tone="fill"
                onClick={() => setOpenPop(openPop === 'emg-fill' ? null : 'emg-fill')}
                active={openPop === 'emg-fill'}
              >
                Fill
              </FieldAILink>
              <FieldAILink
                icon={<Ico.info />}
                tone="ask"
                onClick={() => setOpenPop(openPop === 'emg-ask' ? null : 'emg-ask')}
                active={openPop === 'emg-ask'}
              >
                Ask
              </FieldAILink>
            </>
          }
          popover={
            openPop === 'emg-fill' ? (
              <FieldFillPopover
                title="Fill emergency contact"
                sources={[
                  { label: 'Previous submission (2024-03-11)', value: 'Luis Rivera · +1 (512) 555-0148' },
                  { label: 'Profile · spouse on benefits form', value: 'Luis Rivera · +1 (512) 555-0148' },
                ]}
                onPick={(v) => { setEmg(v); close(); }}
                onClose={close}
              />
            ) : openPop === 'emg-ask' ? (
              <FieldAskPopover
                title="Emergency contact"
                onClose={close}
                body={
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--gray-9)' }}>
                    The person we'd notify if something happens during work hours.
                    One contact is required; you can add more later from the profile page.
                  </p>
                }
                followUps={['Who sees this?', 'Can I add two contacts?']}
              />
            ) : null
          }
        >
          <FieldInput value={emg} onChange={setEmg} placeholder="Name and phone" />
        </FieldShell>
      </div>
    </div>
  );
}

// ----- subcomponents -----
function FieldShell({ label, required, hint, trailing, popover, children }) {
  return (
    <div style={{ marginBottom: 16, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>
          {label}
          {required && <span style={{ color: 'var(--error-dark)', marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 10, alignItems: 'center' }}>
          {trailing}
        </div>
      </div>
      {children}
      {hint && <div style={{ marginTop: 5, fontSize: 12, color: 'var(--gray-6)' }}>{hint}</div>}
      {popover}
    </div>
  );
}

function FieldInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', border: '1px solid var(--gray-3)', borderRadius: 8,
        padding: '9px 12px', fontSize: 14, color: 'var(--gray-9)',
        fontFamily: 'inherit', outline: 'none', background: '#fff',
      }}
      onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-500)'}
      onBlur={e => e.currentTarget.style.borderColor = 'var(--gray-3)'}
    />
  );
}

// Label-adjacent link. Quiet by default; sparkle icon signals AI.
// `tone` tweaks the icon color so Ask vs Fill read differently at a glance.
function FieldAILink({ children, icon, onClick, active, tone = 'ask' }) {
  const color = tone === 'fill' ? 'var(--primary-500)' : 'var(--link, #1B7AC2)';
  return (
    <button onClick={onClick} style={{
      background: active ? 'var(--gray-1)' : 'transparent',
      border: 0, padding: '2px 6px', margin: '-2px -6px',
      borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
      fontSize: 12, fontWeight: 600, color,
      display: 'inline-flex', alignItems: 'center', gap: 4,
      textDecoration: 'none',
    }}>
      <span style={{ display: 'inline-flex' }}>{icon}</span>
      {children}
    </button>
  );
}

// Inline "we suggested a value" affordance that appears below the input
// after Fill with AI is triggered. Accept = fills the field; dismiss = hides.
function FillSuggestion({ text, source, onAccept, onDismiss }) {
  return (
    <div style={{
      marginTop: 6, padding: '8px 10px',
      background: 'var(--primary-100)', border: '1px solid var(--primary-300)',
      borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <Ico.sparkles style={{ color: 'var(--primary-500)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: 'var(--gray-9)', fontWeight: 600 }}>
          Suggested: <span style={{ fontWeight: 700 }}>{text}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--gray-7)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {source}
        </div>
      </div>
      <button onClick={onAccept} style={{
        background: 'var(--primary-500)', color: '#fff', border: 0,
        padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
      }}>Accept</button>
      <button onClick={onDismiss} style={{
        background: 'transparent', border: 0, color: 'var(--gray-6)',
        padding: 4, cursor: 'pointer', display: 'flex', flexShrink: 0,
      }} aria-label="Dismiss"><Ico.x /></button>
    </div>
  );
}

// Ask AI popover that anchors to a field. Scoped, small, and always has a
// composer at the bottom so the user can ask a different question.
function FieldAskPopover({ title, body, followUps = [], onClose }) {
  return (
    <div style={{
      marginTop: 8, position: 'relative',
      background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 10,
      boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      padding: 12, zIndex: 3,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 6, flexShrink: 0,
          background: 'var(--primary-100)', color: 'var(--primary-500)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Ico.sparkles style={{ width: 12, height: 12 }} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-9)' }}>About "{title}"</div>
        <button onClick={onClose} style={{
          marginLeft: 'auto', background: 'transparent', border: 0, padding: 2,
          color: 'var(--gray-6)', cursor: 'pointer', display: 'flex',
        }}><Ico.x /></button>
      </div>

      {body}

      {followUps.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {followUps.map((s, i) => (
            <button key={i} style={{
              background: '#fff', border: '1px solid var(--gray-3)',
              color: 'var(--gray-8)', borderRadius: 1000,
              padding: '4px 10px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'inherit',
            }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        <MiniComposer placeholder={`Ask about "${title}"…`} />
      </div>
    </div>
  );
}

// Fill-with-AI popover: a short list of candidate values from known sources.
function FieldFillPopover({ title, sources, onPick, onClose }) {
  return (
    <div style={{
      marginTop: 8, position: 'relative',
      background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 10,
      boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      padding: 12, zIndex: 3,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 6, flexShrink: 0,
          background: 'var(--primary-100)', color: 'var(--primary-500)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Ico.sparkles style={{ width: 12, height: 12 }} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-9)' }}>Fill {title}</div>
        <button onClick={onClose} style={{
          marginLeft: 'auto', background: 'transparent', border: 0, padding: 2,
          color: 'var(--gray-6)', cursor: 'pointer', display: 'flex',
        }}><Ico.x /></button>
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray-6)', marginBottom: 8 }}>
        Found {sources.length} matches in existing records.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sources.map((s, i) => (
          <button key={i} onClick={() => onPick(s.value)}
            style={{
              background: '#fff', border: '1px solid var(--gray-2)', borderRadius: 8,
              padding: '9px 11px', textAlign: 'left', cursor: 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-1)'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-9)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-6)', marginTop: 1 }}>{s.label}</div>
            </div>
            <Ico.chevR style={{ color: 'var(--gray-6)', flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { InlineComposerPin, InlineSelectionMenu, InlineElementHover, InlineFormFieldAI });
