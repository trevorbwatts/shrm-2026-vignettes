import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconV2, BodyText, Headline, Button, TextField, IconButton } from '@bamboohr/fabric';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import { useReport } from '../../contexts/ReportContext';
import type { ReportShape, AttachableReport } from '../../contexts/ReportContext';
import './AskPanel.css';

interface SuggestionAction {
  label: string;
  /**
   * Either a follow-up message to send, a route to navigate to,
   * or a report to attach to the Ask workspace.
   */
  send?: string;
  navigate?: string;
  attachReport?: AttachableReport;
}

interface EmployeeCardData {
  name: string;
  title: string;
  department: string;
  avatar: string;
  status?: { type: 'out' | 'anniversary' | 'birthday' | 'new-hire'; label: string };
  badge?: { type: 'anniversary' | 'birthday' | 'new-hire'; label: string };
  location: string;
  localTime: string;
  email: string;
  phone: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  actionSuggestions?: SuggestionAction[];
  employeeCard?: EmployeeCardData;
  employeeCards?: EmployeeCardData[];
}

interface AskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

const SUGGESTIONS = [
  'Why has Engineering offer acceptance dropped?',
  'Show me time-off requests pending approval',
  "Who's out of office this week?",
];

const REPORT_SUGGESTIONS = [
  'Filter to last two quarters',
  'Add a column for offer amount vs market midpoint',
  'Sort by gap',
];

const JANE_COOPER_CARD: EmployeeCardData = {
  name: 'Jane Cooper',
  title: 'Content Strategist',
  department: 'Marketing',
  avatar: 'https://i.pravatar.cc/96?u=jane-cooper',
  status: { type: 'out', label: 'Out until May 4' },
  badge: { type: 'anniversary', label: '4th Anniversary' },
  location: 'Lindon, UT',
  localTime: '7:45 AM local time',
  email: 'jackson.graham@example.com',
  phone: '(225) 555-0118',
};

const MARCUS_RIVERA_CARD: EmployeeCardData = {
  name: 'Marcus Rivera',
  title: 'Senior Engineer',
  department: 'Engineering',
  avatar: 'https://i.pravatar.cc/96?u=marcus-rivera',
  status: { type: 'out', label: 'Out until Apr 30' },
  location: 'Draper, UT',
  localTime: '7:45 AM local time',
  email: 'marcus.rivera@example.com',
  phone: '(801) 555-0142',
};

const PRIYA_PATEL_CARD: EmployeeCardData = {
  name: 'Priya Patel',
  title: 'Product Designer',
  department: 'Design',
  avatar: 'https://i.pravatar.cc/96?u=priya-patel',
  badge: { type: 'birthday', label: 'Birthday today' },
  location: 'Austin, TX',
  localTime: '8:45 AM local time',
  email: 'priya.patel@example.com',
  phone: '(512) 555-0193',
};

interface MockResponse {
  text: string;
  employeeCard?: EmployeeCardData;
  employeeCards?: EmployeeCardData[];
  suggestions?: string[];
  actionSuggestions?: SuggestionAction[];
  shape?: Partial<ReportShape>;
}

const AI_RESPONSE_MAP: Record<string, MockResponse> = {
  'show me time-off requests pending approval': {
    text: `Here are the **time-off requests pending your approval**:\n\n| Employee | Dates | Type | Days |\n|----------|-------|------|------|\n| Alex Chen | Apr 14–16 | Vacation | 3 |\n| Taylor Brown | Apr 18 | Sick | 1 |\n| Jordan Lee | Apr 21–25 | Vacation | 5 |\n\nYou can approve or deny these in the Time & Attendance section.`,
  },
  "who's out of office this week?": {
    text: `**Out of office this week (Apr 28 – May 2):**\n\nThree people are out — here's a quick view:`,
    employeeCards: [JANE_COOPER_CARD, MARCUS_RIVERA_CARD],
    suggestions: ['Show coverage gaps', 'Send a check-in note'],
  },
  'run a headcount summary': {
    text: `**Current Headcount Summary**\n\n| Department | Active | On Leave | Open Roles |\n|------------|--------|----------|------------|\n| Engineering | 42 | 2 | 3 |\n| Marketing | 12 | 1 | 1 |\n| Sales | 28 | 0 | 5 |\n| HR & Ops | 9 | 0 | 0 |\n| **Total** | **91** | **3** | **9** |`,
  },
  'find jane cooper': {
    text: `Here's **Jane Cooper** — heads up, she's out until May 4.`,
    employeeCard: JANE_COOPER_CARD,
    suggestions: ['Send Jane a message', 'See her time-off history'],
  },
  "who's celebrating today?": {
    text: `One celebration today:`,
    employeeCard: PRIYA_PATEL_CARD,
    suggestions: ['Send a birthday note', 'See upcoming celebrations'],
  },
};

const DEFAULT_AI_RESPONSE: MockResponse = {
  text: `I'm sorry, but I'm not able to understand your message. It appears to be random characters. Could you please rephrase your question? I'm here to help you with HR-related topics such as time off, payroll, benefits, company policies, employee information, and more.`,
};

const PRIVACY_REFUSAL_RESPONSE: MockResponse = {
  text: `I'm unable to search for employees based on physical characteristics like hair color. The HR information system doesn't provide access to employee photos or physical descriptions, and searching for employees based on personal appearance would raise privacy concerns. If you're looking to find employees who work in the Draper, Utah office, I can help you identify employees based on their work location instead. Would you like me to help you find employees who work at the Draper office?`,
  suggestions: ['Yes, find Draper employees', 'Search by department instead'],
};

const PRIVACY_TRIGGER_KEYWORDS = [
  ['hair', 'color'],
  ['silver', 'hair'],
  ['gray', 'hair'],
  ['blonde'],
  ['eye', 'color'],
  ['physical', 'appearance'],
  ['looks', 'like'],
  ['skin', 'color'],
];

function isPrivacyRefusalQuery(text: string): boolean {
  const lower = text.toLowerCase();
  return PRIVACY_TRIGGER_KEYWORDS.some((tokens) => tokens.every((t) => lower.includes(t)));
}

const OFFER_ACCEPTANCE_RESPONSE: MockResponse = {
  text:
    `Here's what I'm seeing:\n\n` +
    `**Offer acceptance in Engineering has dropped from 82% to 60%** over the past six months — a 22-point decline.\n\n` +
    `**Senior and Staff IC offers are averaging 11% below market** based on Bamboo benchmarks.\n\n` +
    `**The three most recent declines all cited compensation.**\n\n` +
    `For comparison: **Product and Design are within 5% of market** and not declining.`,
  actionSuggestions: [
    { label: 'Open Offer Acceptance Report', attachReport: 'offer-acceptance' },
    { label: 'Show me the recent declines', send: 'Show me the recent Engineering declines' },
  ],
};

const RECENT_DECLINES_RESPONSE: MockResponse = {
  text:
    `**Recent Engineering declines:**\n\n` +
    `| Candidate | Level | Offer | Market Mid | Cited |\n` +
    `|-----------|-------|-------|------------|-------|\n` +
    `| Luca Romano | Senior | $161K | $182K | Compensation |\n` +
    `| Ines Moreau | Staff | $195K | $218K | Compensation |\n` +
    `| Beth Larsen | Senior | $167K | $182K | Compensation |\n\n` +
    `All three declined within the last three weeks.`,
  actionSuggestions: [
    { label: 'Open Offer Acceptance Report', attachReport: 'offer-acceptance' },
  ],
};

function isOfferAcceptanceQuery(text: string): boolean {
  const lower = text.toLowerCase();
  const mentionsOffer = lower.includes('offer') && lower.includes('accept');
  const mentionsEng = lower.includes('engineering') || lower.includes('eng ');
  const mentionsDrop = lower.includes('drop') || lower.includes('decline') || lower.includes('down') || lower.includes('decreas');
  return mentionsOffer && (mentionsEng || mentionsDrop);
}

// Report-shaping commands recognized when on the offer acceptance report
function detectShapingCommand(text: string): MockResponse | null {
  const lower = text.toLowerCase();

  if (
    lower.includes('last two quarters') ||
    lower.includes('last 2 quarters') ||
    lower.includes('past two quarters') ||
    lower.includes('q1 and q2')
  ) {
    return {
      text: `Filtered the report to **the last two quarters**. Showing offers from Nov 2025 onward.`,
      shape: { dateFilter: 'last-2-quarters' },
    };
  }

  if (lower.includes('last quarter') || lower.includes('past quarter')) {
    return {
      text: `Filtered the report to **the last quarter**.`,
      shape: { dateFilter: 'last-quarter' },
    };
  }

  if (
    (lower.includes('add') || lower.includes('show')) &&
    (lower.includes('gap') || lower.includes('market mid') || lower.includes('vs market') || lower.includes('versus market') || lower.includes('column'))
  ) {
    return {
      text: `Added a **Market Gap** column showing offer amount versus market midpoint as a percent.`,
      shape: { showGapColumn: true },
    };
  }

  if (lower.includes('hide') && lower.includes('gap')) {
    return {
      text: `Removed the Market Gap column.`,
      shape: { showGapColumn: false },
    };
  }

  if (lower.includes('sort') && lower.includes('gap')) {
    return {
      text: `Sorted by **Market Gap** — most-below-market first.`,
      shape: { sortBy: 'gap', sortDir: 'asc', showGapColumn: true },
    };
  }

  if (lower.includes('sort') && (lower.includes('amount') || lower.includes('offer'))) {
    return {
      text: `Sorted by **Offer Amount** — highest first.`,
      shape: { sortBy: 'amount', sortDir: 'desc' },
    };
  }

  if (lower.includes('sort') && lower.includes('date')) {
    return {
      text: `Sorted by **Date** — newest first.`,
      shape: { sortBy: 'date', sortDir: 'desc' },
    };
  }

  if (lower.includes('reset') && (lower.includes('view') || lower.includes('report') || lower.includes('filter'))) {
    return {
      text: `Reset the report to its default view.`,
      shape: {
        dateFilter: 'all',
        showGapColumn: false,
        sortBy: 'date',
        sortDir: 'desc',
        savedViewName: null,
      },
    };
  }

  return null;
}

function getMockResponse(text: string, isOnOfferReport: boolean): MockResponse {
  const key = text.toLowerCase().trim();

  // When on the offer acceptance report, prioritize shaping commands
  if (isOnOfferReport) {
    const shapingResponse = detectShapingCommand(text);
    if (shapingResponse) return shapingResponse;
  }

  if (AI_RESPONSE_MAP[key]) return AI_RESPONSE_MAP[key];
  if (isPrivacyRefusalQuery(text)) return PRIVACY_REFUSAL_RESPONSE;

  if (isOfferAcceptanceQuery(text)) {
    return OFFER_ACCEPTANCE_RESPONSE;
  }

  if (key.includes('recent') && (key.includes('decline') || key.includes('engineering'))) {
    return RECENT_DECLINES_RESPONSE;
  }

  // Loose match for finding people
  const findMatch = key.match(/^(find|who is|show me|tell me about)\s+(.+?)\??$/);
  if (findMatch) {
    const name = findMatch[2].trim();
    if (name.includes('jane') || name.includes('cooper')) {
      return AI_RESPONSE_MAP['find jane cooper'];
    }
  }

  if (key.includes('draper') || key.includes('utah office')) {
    return {
      text: `Here are employees who work at the **Draper, Utah** office:`,
      employeeCards: [MARCUS_RIVERA_CARD, JANE_COOPER_CARD],
      suggestions: ['Filter by department', 'See full team list'],
    };
  }

  return DEFAULT_AI_RESPONSE;
}

function formatDateSep(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

let _uid = 0;
function nextId() { return String(++_uid); }

function EmployeeResultCard({ data }: { data: EmployeeCardData }) {
  return (
    <div className="ask-panel__emp-card">
      <div className="ask-panel__emp-card-top">
        <img className="ask-panel__emp-card-avatar" src={data.avatar} alt="" />
        <div className="ask-panel__emp-card-id">
          <div className="ask-panel__emp-card-name">{data.name}</div>
          <div className="ask-panel__emp-card-role">
            {data.title} <span className="ask-panel__emp-card-divider">|</span> {data.department}
          </div>
        </div>
      </div>
      {(data.status || data.badge) && (
        <div className="ask-panel__emp-card-pills">
          {data.status && (
            <span className={`ask-panel__pill ask-panel__pill--${data.status.type}`}>
              <IconV2 name="house-person-leave-solid" size={12} color="warning-strong" />
              {data.status.label}
            </span>
          )}
          {data.badge && (
            <span className={`ask-panel__pill ask-panel__pill--${data.badge.type}`}>
              <IconV2
                name={
                  data.badge.type === 'birthday'
                    ? 'cake-candles-solid'
                    : data.badge.type === 'new-hire'
                    ? 'sparkles-solid'
                    : 'calendar-star-solid'
                }
                size={12}
                color="info-strong"
              />
              {data.badge.label}
            </span>
          )}
        </div>
      )}
      <div className="ask-panel__emp-card-meta">
        <div className="ask-panel__emp-card-meta-row">
          <IconV2 name="location-dot-regular" size={16} color="neutral-medium" />
          <span>{data.location} - {data.localTime}</span>
        </div>
        <div className="ask-panel__emp-card-meta-row">
          <IconV2 name="envelope-regular" size={16} color="neutral-medium" />
          <span>{data.email}</span>
        </div>
        <div className="ask-panel__emp-card-meta-row">
          <IconV2 name="mobile-regular" size={16} color="neutral-medium" />
          <span>{data.phone}</span>
        </div>
      </div>
    </div>
  );
}

export function AskPanel({ isOpen, onClose, isExpanded, onExpandChange }: AskPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { activeReportId, setActiveReportId, attachedReport, setAttachedReport, applyShape } = useReport();
  const isOnOfferReport = activeReportId === 'offer-acceptance' || attachedReport === 'offer-acceptance';

  const hasStarted = messages.length > 0 || isTyping;

  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Re-attach scroll listener when panel opens or mode changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 4;
      setShowGradient(el.scrollHeight > el.clientHeight && !atBottom);
    };
    el.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => el.removeEventListener('scroll', handler);
  }, [isOpen, isExpanded, hasStarted]);

  // Recheck gradient when content changes
  useEffect(() => {
    const t = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 4;
      setShowGradient(el.scrollHeight > el.clientHeight && !atBottom);
    }, 60);
    return () => clearTimeout(t);
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { id: nextId(), type: 'user', text: trimmed, timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = getMockResponse(trimmed, isOnOfferReport);
      if (response.shape) {
        applyShape(response.shape);
      }
      setMessages(prev => [...prev, {
        id: nextId(),
        type: 'ai',
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions,
        actionSuggestions: response.actionSuggestions,
        employeeCard: response.employeeCard,
        employeeCards: response.employeeCards,
      }]);
    }, 900);
  };

  const handleActionSuggestion = (action: SuggestionAction) => {
    if (action.attachReport) {
      setAttachedReport(action.attachReport);
      setActiveReportId(action.attachReport);
      // Seed an AI acknowledgement so it's clear what just happened
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          type: 'ai',
          text:
            "I've opened the report alongside our conversation. Reshape it with chat — try \"filter to last two quarters\", \"show market gap\", or \"sort by gap\".",
          timestamp: new Date(),
        },
      ]);
      return;
    }
    if (action.navigate) {
      navigate(action.navigate);
      return;
    }
    sendMessage(action.send ?? action.label);
  };

  if (!isOpen) return null;

  const renderMessageNodes = () => {
    const nodes: React.ReactNode[] = [];
    let lastDate: Date | null = null;

    messages.forEach((msg, i) => {
      if (!lastDate || !isSameDay(lastDate, msg.timestamp)) {
        nodes.push(
          <div key={`ds-${i}`} className="ask-panel__date-sep">
            <span className="ask-panel__date-sep-text">{formatDateSep(msg.timestamp)}</span>
          </div>
        );
        lastDate = msg.timestamp;
      }

      if (msg.type === 'user') {
        nodes.push(
          <div key={msg.id} className="ask-panel__msg-user">
            <div className="ask-panel__msg-user-bubble">{msg.text}</div>
            <div className="ask-panel__msg-time">{formatTime(msg.timestamp)}</div>
          </div>
        );
      } else {
        nodes.push(
          <div key={msg.id} className="ask-panel__msg-ai">
            <div className="ask-panel__ai-header">
              <div className="ask-panel__ai-icon" aria-hidden="true" />
              <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                BambooHR Assistant
              </BodyText>
            </div>
            <div className="ask-panel__ai-body">
              <MarkdownContent text={msg.text} />
              {msg.employeeCard && (
                <div className="ask-panel__cards">
                  <EmployeeResultCard data={msg.employeeCard} />
                </div>
              )}
              {msg.employeeCards && msg.employeeCards.length > 0 && (
                <div className="ask-panel__cards">
                  {msg.employeeCards.map((card, ci) => (
                    <EmployeeResultCard key={ci} data={card} />
                  ))}
                </div>
              )}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="ask-panel__msg-suggestions">
                  {msg.suggestions.map((s, si) => (
                    <Button key={si} color="secondary" variant="outlined" size="small" onClick={() => sendMessage(s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              )}
              {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                <div className="ask-panel__msg-suggestions">
                  {msg.actionSuggestions.map((action, ai) => (
                    <Button
                      key={ai}
                      color={action.navigate ? 'ai' : 'secondary'}
                      variant="outlined"
                      size="small"
                      startIcon={
                        action.navigate ? (
                          <IconV2 name="arrow-up-right-from-square-regular" size={12} />
                        ) : undefined
                      }
                      onClick={() => handleActionSuggestion(action)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
              <div className="ask-panel__msg-feedback">
                <button className="ask-panel__feedback-btn" aria-label="Helpful">
                  <IconV2 name="thumbs-up-regular" size={16} color="neutral-medium" />
                </button>
                <button className="ask-panel__feedback-btn" aria-label="Not helpful">
                  <IconV2 name="thumbs-down-regular" size={16} color="neutral-medium" />
                </button>
              </div>
            </div>
          </div>
        );
      }
    });

    if (isTyping) {
      nodes.push(
        <div key="typing" className="ask-panel__msg-ai">
          <div className="ask-panel__ai-header">
            <div className="ask-panel__ai-icon" aria-hidden="true" />
            <BodyText size="extra-small" weight="semibold" color="neutral-medium">
              BambooHR Assistant
            </BodyText>
          </div>
          <div className="ask-panel__ai-body">
            <div className="ask-panel__typing">
              <span /><span /><span />
            </div>
          </div>
        </div>
      );
    }

    return nodes;
  };

  const activeSuggestions = isOnOfferReport ? REPORT_SUGGESTIONS : SUGGESTIONS;
  const introCopy = isOnOfferReport
    ? 'You\'re on the Offer Acceptance report. Reshape it through chat — filter, add columns, sort.'
    : 'How can I help you today?';
  const introHeading = isOnOfferReport ? 'I\'m connected to this report' : 'Hi, Maya!';

  const introContent = (
    <div className="ask-panel__intro">
      <div className="ask-panel__intro-content">
        <div className="ask-panel__intro-greeting">
          <Headline size="extra-large" component="h1">{introHeading}</Headline>
        </div>
        <BodyText size="medium" color="neutral-weak">{introCopy}</BodyText>
        <div className="ask-panel__intro-actions">
          {activeSuggestions.map((s) => (
            <Button key={s} color={isOnOfferReport ? 'ai' : 'secondary'} variant="outlined" size="small" onClick={() => sendMessage(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const messagesContent = (
    <div className="ask-panel__messages">
      {renderMessageNodes()}
      <div ref={endRef} />
    </div>
  );

  const inputRow = (
    <>
      <div className="ask-panel__footer-field">
        <TextField
          label="Ask a question"
          placeholder={isOnOfferReport ? 'Reshape this report — try "sort by gap"' : 'Ask a question...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(inputValue); } }}
        />
      </div>
      <button
        className="ask-panel__send-btn-bare"
        onClick={() => sendMessage(inputValue)}
        aria-label="Send message"
        disabled={!inputValue.trim() || isTyping}
      >
        <IconV2
          name="paper-plane-solid"
          size={16}
          color={inputValue.trim() && !isTyping ? 'primary-strong' : 'neutral-medium'}
        />
      </button>
    </>
  );

  if (isExpanded) {
    return (
      <div className="ask-panel-fullscreen">
        <div className="ask-panel-fullscreen__header">
          <div className="ask-panel-fullscreen__title">
            <div className="ask-panel__ai-icon ask-panel__ai-icon--lg" aria-hidden="true" />
            <BodyText size="large" weight="semibold">Ask BambooHR</BodyText>
          </div>
          <div className="ask-panel__header-actions">
            <IconButton
              icon="down-left-and-up-right-to-center-solid"
              aria-label="Collapse"
              size="small"
              variant="outlined"
              onClick={() => onExpandChange(false)}
            />
            <IconButton
              icon="xmark-solid"
              aria-label="Close"
              size="small"
              variant="outlined"
              onClick={() => { onExpandChange(false); onClose(); }}
            />
          </div>
        </div>

        <div className="ask-panel-fullscreen__messages-wrap">
          <div className="ask-panel-fullscreen__content" ref={scrollRef}>
            <div className="ask-panel-fullscreen__inner">
              {!hasStarted ? introContent : messagesContent}
            </div>
          </div>
          {showGradient && <div className="ask-panel__scroll-gradient ask-panel__scroll-gradient--fs" />}
        </div>

        <div className="ask-panel-fullscreen__footer">
          <div className="ask-panel-fullscreen__input-row">
            {inputRow}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ask-panel">
      <div className="ask-panel__main">
        <div className="ask-panel__header">
          <BodyText size="large" weight="medium">Ask BambooHR</BodyText>
          <div className="ask-panel__header-actions">
            <IconButton
              icon="up-right-and-down-left-from-center-solid"
              aria-label="Expand"
              size="small"
              variant="outlined"
              onClick={() => onExpandChange(true)}
            />
            <IconButton
              icon="xmark-solid"
              aria-label="Close"
              size="small"
              variant="outlined"
              onClick={onClose}
            />
          </div>
        </div>

        <div className="ask-panel__messages-wrap">
          <div className="ask-panel__content" ref={scrollRef}>
            {!hasStarted ? introContent : messagesContent}
          </div>
          {showGradient && <div className="ask-panel__scroll-gradient" />}
        </div>

        <div className="ask-panel__footer">
          <div className="ask-panel__footer-input-row">
            {inputRow}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskPanel;
