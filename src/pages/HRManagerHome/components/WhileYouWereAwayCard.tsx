import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gridlet,
  BodyText,
  TextButton,
  IconV2,
} from '@bamboohr/fabric';
import {
  initialAutomationLogEntries,
  generateLiveLogEntry,
  type AutomationLogEntry,
} from '../data/automationsData';
import './WhileYouWereAwayCard.css';

const NEW_ENTRY_DELAY_MIN = 7000;
const NEW_ENTRY_DELAY_MAX = 30000;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const categoryTileClass: Record<string, string> = {
  'Employee Records': 'auto-log-tile--info',
  Payroll: 'auto-log-tile--success',
  Recognition: 'auto-log-tile--discovery',
  Compliance: 'auto-log-tile--warning',
  Documents: 'auto-log-tile--neutral',
  'New Hires': 'auto-log-tile--primary',
};

const categoryIconColor: Record<string, 'info-strong' | 'success-strong' | 'discovery-strong' | 'warning-strong' | 'neutral-strong' | 'primary-strong'> = {
  'Employee Records': 'info-strong',
  Payroll: 'success-strong',
  Recognition: 'discovery-strong',
  Compliance: 'warning-strong',
  Documents: 'neutral-strong',
  'New Hires': 'primary-strong',
};

export function WhileYouWereAwayCard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<AutomationLogEntry[]>(
    () => initialAutomationLogEntries,
  );
  const [newEntryId, setNewEntryId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const trackTimeout = (id: number) => {
      timeoutsRef.current.push(id);
    };

    const scheduleNext = () => {
      const delay = randomBetween(NEW_ENTRY_DELAY_MIN, NEW_ENTRY_DELAY_MAX);
      const id = window.setTimeout(() => {
        const entry = generateLiveLogEntry();
        setEntries((prev) => [entry, ...prev]);
        setNewEntryId(entry.id);
        scheduleNext();
      }, delay);
      trackTimeout(id);
    };

    scheduleNext();

    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <Gridlet
      header={
        <Gridlet.Header
          title="Automations"
          icon={<IconV2 name="bolt-regular" color="primary-strong" size={16} />}
        />
      }
    >
      <Gridlet.Body>
        <div className="auto-content">
          <div className="auto-log">
            {entries.map((entry) => {
              const isNew = newEntryId === entry.id;
              const tileClass = categoryTileClass[entry.category] ?? 'auto-log-tile--discovery';
              const iconColor = categoryIconColor[entry.category] ?? 'discovery-strong';
              return (
                <div
                  key={entry.id}
                  className={`auto-log-row${isNew ? ' auto-log-row--new' : ''}`}
                >
                  <div className={`auto-log-tile ${tileClass}`}>
                    <IconV2
                      name={entry.icon}
                      size={20}
                      color={iconColor}
                    />
                  </div>
                  <div className="auto-log-text">
                    <BodyText size="small" color="neutral-strong">
                      {entry.parts.map((part, idx) =>
                        part.highlight ? (
                          <span key={idx} className="auto-log-highlight">
                            {part.text}
                          </span>
                        ) : (
                          <span key={idx}>{part.text}</span>
                        ),
                      )}
                    </BodyText>
                    <BodyText size="extra-small" color="neutral-weak">
                      {entry.category} · {entry.timestamp}
                    </BodyText>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="auto-footer">
            <TextButton size="small" onClick={() => navigate('/automations')}>
              View all automations
            </TextButton>
            <button
              type="button"
              className="auto-footer-mute"
              aria-label={muted ? 'Show automation updates' : 'Mute automation updates'}
              aria-pressed={muted}
              title={muted ? 'Show updates' : 'Mute updates'}
              onClick={() => setMuted((m) => !m)}
            >
              <IconV2
                name={muted ? 'eye-regular' : 'eye-slash-regular'}
                size={12}
                color="neutral-medium"
              />
            </button>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
