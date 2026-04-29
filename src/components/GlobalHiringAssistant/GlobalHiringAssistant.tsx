import { useState, useRef, useEffect } from 'react';
import { IconV2, BodyText, Button, IconButton } from '@bamboohr/fabric';
import './GlobalHiringAssistant.css';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
}

interface GlobalHiringAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRIES: Country[] = [
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'AG', name: 'Antigua & Barbuda', flag: '🇦🇬' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
];

interface CountryDetails {
  intro: string;
  switched: string;
  quickPicks: string[];
  responses: Record<string, string>;
  placeholderHint: string;
}

const COUNTRY_GUIDES: Record<string, CountryDetails> = {
  CA: {
    intro: 'Tell me which country you are exploring and I can guide requirements, benefits basics, and onboarding timeline before you start a form.',
    switched: 'Switched to Canada. Ask me about required fields, PTO/work-hours, or onboarding timeline.',
    quickPicks: ['Canada required fields', 'Canada PTO and work hours', 'Canada role description rules'],
    responses: {
      'canada required fields': '**Canada — required fields**\n\nFor a Canadian hire, plan to capture: SIN (Social Insurance Number), province of work, full legal name, address, banking info for direct deposit, TD1 federal & provincial forms, and emergency contact. Provincial taxes vary — confirm the work province before generating offer letters.',
      'canada pto and work hours': '**Canada — PTO and work hours**\n\nStandard work week is 40 hours. Statutory minimum vacation is 2 weeks (10 days) after one year of service, increasing to 3 weeks after 5 years in most provinces. Federal holidays vary by province (typically 9–13 days). Overtime kicks in after 40 hrs/week (or 8 hrs/day in some provinces) at 1.5×.',
      'canada role description rules': '**Canada — role description rules**\n\nJob postings in Canada must avoid discriminatory language tied to age, gender, religion, or marital status. In Quebec, postings must be available in French. Salary range disclosure is required in BC, PEI, Ontario (effective 2026), and is best-practice everywhere. Avoid "native speaker" phrasing — use "fluent in".',
    },
    placeholderHint: 'Need help with Canada? I can guide required fields, PTO, work hours, and more.',
  },
  GB: {
    intro: 'Tell me which country you are exploring and I can guide requirements, benefits basics, and onboarding timeline before you start a form.',
    switched: 'Switched to the United Kingdom. Ask me about required fields, statutory leave, or right-to-work checks.',
    quickPicks: ['UK required fields', 'UK statutory leave', 'UK right-to-work checks'],
    responses: {
      'uk required fields': '**United Kingdom — required fields**\n\nCapture: National Insurance number, P45 from previous employer (or starter checklist), full legal name, address, bank details, and right-to-work documents. Pension auto-enrolment is required for employees aged 22+ earning over £10,000/year.',
      'uk statutory leave': '**United Kingdom — statutory leave**\n\nFull-time employees get 28 days paid leave per year (5.6 weeks), which can include the 8 bank holidays. Statutory Sick Pay is £116.75/week for up to 28 weeks. Maternity leave is up to 52 weeks (with statutory pay for 39).',
      'uk right-to-work checks': '**United Kingdom — right-to-work checks**\n\nYou must verify right-to-work before the first day. Use the Home Office online checking service for share codes, or manually check original documents. Keep a dated copy on file. Failure to check can result in a £20,000 civil penalty per worker.',
    },
    placeholderHint: 'Need help with the UK? I can guide right-to-work, statutory leave, and more.',
  },
};

const DEFAULT_GUIDE: CountryDetails = {
  intro: 'Tell me which country you are exploring and I can guide requirements, benefits basics, and onboarding timeline before you start a form.',
  switched: 'Switched. Ask me about required fields, PTO/work-hours, or onboarding timeline.',
  quickPicks: ['Required fields', 'PTO and work hours', 'Onboarding timeline'],
  responses: {},
  placeholderHint: 'Need help? I can guide required fields, leave entitlements, and onboarding.',
};

let _uid = 0;
const nextId = () => String(++_uid);

export function GlobalHiringAssistant({ isOpen, onClose }: GlobalHiringAssistantProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), type: 'ai', text: DEFAULT_GUIDE.intro },
  ]);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const guide = selectedCountry
    ? COUNTRY_GUIDES[selectedCountry.code] ?? {
        ...DEFAULT_GUIDE,
        switched: `Switched to ${selectedCountry.name}. Ask me about required fields, PTO/work-hours, or onboarding timeline.`,
        quickPicks: [
          `${selectedCountry.name} required fields`,
          `${selectedCountry.name} PTO and work hours`,
          `${selectedCountry.name} onboarding timeline`,
        ],
        placeholderHint: `Need help with ${selectedCountry.name}? I can guide required fields, leave, and onboarding.`,
      }
    : DEFAULT_GUIDE;

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isDropdownOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchQuery('');
    const newGuide = COUNTRY_GUIDES[country.code] ?? DEFAULT_GUIDE;
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        type: 'ai',
        text: `Switched to ${country.name}. Ask me about required fields, PTO/work-hours, or onboarding timeline.`,
      },
    ]);
    void newGuide;
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: nextId(), type: 'user', text: trimmed }]);
    setInputValue('');
    setTimeout(() => {
      const key = trimmed.toLowerCase();
      const response =
        guide.responses[key] ||
        (selectedCountry
          ? `For ${selectedCountry.name}, I'd start by reviewing required fields, statutory leave, and tax/withholding rules. Try one of the quick picks above for the specifics, or open the full country guide.`
          : 'Pick a country first and I can give you requirement-specific guidance.');
      setMessages((prev) => [...prev, { id: nextId(), type: 'ai', text: response }]);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="gha-panel">
      <div className="gha-panel__header">
        <div className="gha-panel__header-icon" aria-hidden="true">
          <IconV2 name="wand-magic-sparkles-solid" size={20} color="info-strong" />
        </div>
        <div className="gha-panel__header-text">
          <BodyText size="large" weight="semibold">Global Hiring Assistant</BodyText>
          <BodyText size="small" color="neutral-medium">
            Country requirements and next-step guidance
          </BodyText>
        </div>
        <IconButton
          icon="xmark-solid"
          aria-label="Close"
          size="small"
          variant="outlined"
          onClick={onClose}
        />
      </div>

      <div className="gha-panel__body">
        {/* Country selector */}
        <div className="gha-panel__country" ref={dropdownRef}>
          <button
            type="button"
            className={`gha-panel__country-trigger ${isDropdownOpen ? 'is-open' : ''}`}
            onClick={() => setIsDropdownOpen((v) => !v)}
          >
            <span className="gha-panel__country-trigger-label">
              {selectedCountry ? (
                <>
                  <span className="gha-panel__flag">{selectedCountry.flag}</span>
                  {selectedCountry.name}
                </>
              ) : (
                '-Select Country-'
              )}
            </span>
            <IconV2
              name={isDropdownOpen ? 'chevron-up-solid' : 'chevron-down-solid'}
              size={16}
              color="neutral-medium"
            />
          </button>

          {isDropdownOpen && (
            <div className="gha-panel__country-menu">
              <div className="gha-panel__country-search">
                <span className="gha-panel__country-search-icon" aria-hidden="true">
                  <IconV2 name="magnifying-glass-regular" size={16} color="neutral-medium" />
                </span>
                <input
                  type="text"
                  placeholder="Search country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="gha-panel__country-list">
                {filteredCountries.length === 0 ? (
                  <div className="gha-panel__country-empty">
                    <BodyText size="small" color="neutral-medium">No matches</BodyText>
                  </div>
                ) : (
                  filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className="gha-panel__country-item"
                      onClick={() => handleCountrySelect(c)}
                    >
                      <span className="gha-panel__flag">{c.flag}</span>
                      {c.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons (post-selection) */}
        {selectedCountry && (
          <>
            <div className="gha-panel__actions">
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                startIcon={<IconV2 name="globe-regular" size={16} />}
              >
                Open Country Guide
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                startIcon={<IconV2 name="receipt-regular" size={16} />}
              >
                Full Cost Breakdown
              </Button>
            </div>
            <Button
              color="primary"
              variant="outlined"
              size="medium"
              startIcon={<IconV2 name="circle-plus-regular" size={16} />}
              fullWidth
            >
              Start Hire Through Remote
            </Button>

            <div className="gha-panel__quick-picks">
              {guide.quickPicks.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="gha-panel__chip"
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Messages */}
        <div className="gha-panel__messages">
          {!selectedCountry ? (
            <div className="gha-panel__hint">
              <BodyText size="medium" color="neutral-medium">
                Select a country to get requirement-specific guidance.
              </BodyText>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`gha-panel__msg ${m.type === 'user' ? 'gha-panel__msg--user' : 'gha-panel__msg--ai'}`}
              >
                <BodyText size="medium">{m.text}</BodyText>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      {selectedCountry && (
        <div className="gha-panel__footer">
          <div className="gha-panel__input">
            <input
              type="text"
              placeholder={guide.placeholderHint}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
            />
            <button
              type="button"
              className="gha-panel__send"
              onClick={() => sendMessage(inputValue)}
              aria-label="Send"
              disabled={!inputValue.trim()}
            >
              <IconV2 name="paper-plane-solid" size={16} color="neutral-inverted" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalHiringAssistant;
