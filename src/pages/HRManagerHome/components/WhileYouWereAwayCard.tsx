import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gridlet,
  BodyText,
  Avatar,
  TextButton,
  IconV2,
} from '@bamboohr/fabric';
import {
  initialAutomationActivities,
  generateLiveActivity,
  type AutomationActivity,
  type AutomationActivityStatus,
} from '../data/automationsData';
import './WhileYouWereAwayCard.css';

const COMPLETION_DELAY_MIN = 2200;
const COMPLETION_DELAY_MAX = 4200;
const NEW_ACTIVITY_DELAY_MIN = 7000;
const NEW_ACTIVITY_DELAY_MAX = 14000;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function statusIcon(status: AutomationActivityStatus) {
  switch (status) {
    case 'in-progress':
      return (
        <span className="auto-activity-icon-wrap auto-activity-icon-wrap--spin">
          <IconV2 name="circle-notch-regular" size={14} color="info-strong" />
        </span>
      );
    case 'paused':
      return (
        <span className="auto-activity-icon-wrap">
          <IconV2 name="circle-pause-regular" size={14} color="info-strong" />
        </span>
      );
    case 'completed':
      return (
        <span className="auto-activity-icon-wrap">
          <IconV2 name="circle-check-regular" size={14} color="success-strong" />
        </span>
      );
    case 'undone':
      return (
        <span className="auto-activity-icon-wrap">
          <IconV2 name="rotate-left-regular" size={14} color="neutral-medium" />
        </span>
      );
    case 'cancelled':
      return (
        <span className="auto-activity-icon-wrap">
          <IconV2 name="circle-xmark-regular" size={14} color="neutral-medium" />
        </span>
      );
  }
}

function statusLabel(activity: AutomationActivity): string {
  switch (activity.status) {
    case 'in-progress':
      return 'Working now…';
    case 'paused':
      return 'Paused';
    case 'undone':
      return 'Action undone';
    case 'cancelled':
      return 'Cancelled';
    default:
      return activity.timestamp;
  }
}

function detailHeading(status: AutomationActivityStatus): string {
  return status === 'in-progress' || status === 'paused'
    ? 'Steps so far'
    : 'What the system did';
}

export function WhileYouWereAwayCard() {
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState(false);
  const [activities, setActivities] = useState<AutomationActivity[]>(
    () => initialAutomationActivities,
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newRowId, setNewRowId] = useState<string | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const trackTimeout = (id: number) => {
      timeoutsRef.current.push(id);
    };

    const scheduleNext = () => {
      const delay = randomBetween(NEW_ACTIVITY_DELAY_MIN, NEW_ACTIVITY_DELAY_MAX);
      const id = window.setTimeout(() => {
        const activity = generateLiveActivity();
        setActivities((prev) => [activity, ...prev]);
        setNewRowId(activity.id);

        const completion = window.setTimeout(() => {
          setActivities((prev) =>
            prev.map((a) =>
              a.id === activity.id && a.status === 'in-progress'
                ? { ...a, status: 'completed', timestamp: 'Just now' }
                : a,
            ),
          );
        }, randomBetween(COMPLETION_DELAY_MIN, COMPLETION_DELAY_MAX));
        trackTimeout(completion);

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

  if (isDismissed) {
    return null;
  }

  const handleToggleExpand = (id: string) => {
    const isCollapsing = expandedId === id;
    setExpandedId(isCollapsing ? null : id);
    if (!isCollapsing) {
      // Expanding an in-progress activity pauses it.
      // The pending completion timeout is guarded by status === 'in-progress',
      // so flipping to 'paused' makes it a no-op when it fires.
      setActivities((prev) =>
        prev.map((a) =>
          a.id === id && a.status === 'in-progress' ? { ...a, status: 'paused' } : a,
        ),
      );
    }
  };

  const handleResume = (id: string) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'in-progress', timestamp: 'Working now…' } : a,
      ),
    );
    const completion = window.setTimeout(() => {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === id && a.status === 'in-progress'
            ? { ...a, status: 'completed', timestamp: 'Just now' }
            : a,
        ),
      );
    }, randomBetween(COMPLETION_DELAY_MIN, COMPLETION_DELAY_MAX));
    timeoutsRef.current.push(completion);
  };

  const handleUndo = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'undone' } : a)),
    );
  };

  const handleReapply = (id: string) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'completed', timestamp: 'Just now' } : a,
      ),
    );
  };

  const handleCancel = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)),
    );
  };

  const handleRetry = (id: string) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'in-progress', timestamp: 'Working now…' } : a,
      ),
    );
    const completion = window.setTimeout(() => {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === id && a.status === 'in-progress'
            ? { ...a, status: 'completed', timestamp: 'Just now' }
            : a,
        ),
      );
    }, randomBetween(COMPLETION_DELAY_MIN, COMPLETION_DELAY_MAX));
    timeoutsRef.current.push(completion);
  };

  return (
    <Gridlet
      header={
        <Gridlet.Header
          title="Automations"
          icon={<IconV2 name="bolt-regular" color="primary-strong" size={16} />}
          right={
            <button
              type="button"
              className="wywa-dismiss-button"
              aria-label="Dismiss"
              onClick={() => setIsDismissed(true)}
            >
              <IconV2 name="xmark-regular" size={16} color="neutral-medium" />
            </button>
          }
        />
      }
    >
      <Gridlet.Body>
        <div className="wywa-content">
          <div className="auto-activity-list">
            {activities.map((activity) => {
              const isExpanded = expandedId === activity.id;
              const isNew = newRowId === activity.id;
              return (
                <div
                  key={activity.id}
                  className={`auto-activity-row auto-activity-row--${activity.status}${
                    isNew ? ' auto-activity-row--new' : ''
                  }${isExpanded ? ' auto-activity-row--expanded' : ''}`}
                >
                  <div className="auto-activity-main">
                    {statusIcon(activity.status)}
                    <Avatar
                      src={activity.employeeAvatar}
                      alt={activity.employeeName}
                      size={24}
                    />
                    <div className="auto-activity-text">
                      <BodyText size="small" color="neutral-strong">
                        <span className="auto-activity-name">{activity.employeeName}</span>{' '}
                        · {activity.detail}
                      </BodyText>
                      <BodyText size="extra-small" color="neutral-weak">
                        {activity.automationName} · {statusLabel(activity)}
                      </BodyText>
                    </div>
                    <div className="auto-activity-actions">
                      <button
                        type="button"
                        className="auto-activity-expand"
                        aria-label={
                          isExpanded
                            ? 'Hide details'
                            : activity.status === 'in-progress'
                              ? 'Pause and show details'
                              : 'Show details'
                        }
                        aria-expanded={isExpanded}
                        onClick={() => handleToggleExpand(activity.id)}
                      >
                        <IconV2
                          name={
                            isExpanded
                              ? 'chevron-up-regular'
                              : 'chevron-down-regular'
                          }
                          size={12}
                          color="neutral-medium"
                        />
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="auto-activity-detail">
                      <BodyText
                        size="extra-small"
                        weight="semibold"
                        color="neutral-medium"
                      >
                        {detailHeading(activity.status)}
                      </BodyText>
                      <ol className="auto-activity-steps">
                        {activity.steps.map((step, idx) => (
                          <li key={idx}>
                            <BodyText size="small" color="neutral-strong">
                              {step}
                            </BodyText>
                          </li>
                        ))}
                      </ol>
                      <div className="auto-activity-detail-actions">
                        {activity.status === 'paused' && (
                          <>
                            <TextButton
                              size="small"
                              onClick={() => handleResume(activity.id)}
                            >
                              Resume
                            </TextButton>
                            <TextButton
                              size="small"
                              onClick={() => handleCancel(activity.id)}
                            >
                              Cancel
                            </TextButton>
                          </>
                        )}
                        {activity.status === 'completed' && (
                          <TextButton
                            size="small"
                            onClick={() => handleUndo(activity.id)}
                          >
                            Undo
                          </TextButton>
                        )}
                        {activity.status === 'undone' && (
                          <TextButton
                            size="small"
                            onClick={() => handleReapply(activity.id)}
                          >
                            Reapply
                          </TextButton>
                        )}
                        {activity.status === 'cancelled' && (
                          <TextButton
                            size="small"
                            onClick={() => handleRetry(activity.id)}
                          >
                            Retry
                          </TextButton>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="wywa-footer">
            <TextButton size="small" onClick={() => navigate('/automations')}>
              View all automations
            </TextButton>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
