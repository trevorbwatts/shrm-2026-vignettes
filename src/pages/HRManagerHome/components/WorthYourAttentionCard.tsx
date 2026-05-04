import type { ComponentProps } from 'react';
import { useState } from 'react';
import {
  Gridlet,
  BodyText,
  Button,
  IconV2,
  BadgeV2,
  TextButton,
} from '@bamboohr/fabric';
import { overnightSummary } from '../data/automationsData';
import type { AutomationException } from '../data/automationsData';
import { castAvatar, fullName } from '../data/homeCast';
import { recognitionInsight } from '../data/recognitionData';
import { ExceptionReviewSheet } from './ExceptionReviewSheet';
import { RecognitionQueueModal } from './RecognitionQueueModal';
import './WorthYourAttentionCard.css';

interface WorthYourAttentionCardProps {
  onActionComplete?: (message: string) => void;
  onAskBambooHR?: (query: string) => void;
}

type ChecklistItemKind = 'exception' | 'recognition' | 'pto' | 'signature' | 'survey';

type BadgeIconName = ComponentProps<typeof BadgeV2>['icon'];

interface ChecklistItem {
  id: string;
  kind: ChecklistItemKind;
  badgeIcon?: BadgeIconName;
  badgeAvatar?: { src: string; alt: string };
  badgeTitle: string;
  badgeSubtitle: string;
  message: string;
  estimate: string;
  actionLabel: string;
  exception?: AutomationException;
}

export function WorthYourAttentionCard({ onActionComplete, onAskBambooHR }: WorthYourAttentionCardProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());
  const [activeException, setActiveException] = useState<AutomationException | null>(null);
  const [isRecognitionOpen, setIsRecognitionOpen] = useState(false);

  const exceptionItems: ChecklistItem[] = overnightSummary.exceptions.map((exception) => {
    const name = fullName(exception.employeeId);
    const firstName = name.split(' ')[0];
    return {
      id: `exception-${exception.id}`,
      kind: 'exception',
      badgeAvatar: { src: castAvatar(exception.employeeId), alt: name },
      badgeTitle: name,
      badgeSubtitle: `${exception.issue} · ${exception.daysOverdue} days overdue`,
      message: `${firstName} has opened all three reminders plus a Slack DM but still hasn't submitted his direct deposit info. He may have a question or just need a person to check in — I drafted a friendly note ready to send.`,
      estimate: '~2 min',
      actionLabel: 'Send a personal note',
      exception,
    };
  });

  const items: ChecklistItem[] = [
    ...exceptionItems,
    {
      id: 'recognition-cs',
      kind: 'recognition',
      badgeIcon: 'sparkles-solid',
      badgeTitle: `${recognitionInsight.department} recognition`,
      badgeSubtitle: `${recognitionInsight.totalEmployees} people · 90+ days quiet`,
      message: 'Things have gone quiet over there. I drafted notes from milestones, project work, and 1:1 mentions. Want to send them?',
      estimate: '~5 min',
      actionLabel: 'Open Queue',
    },
    {
      id: 'pto-approvals',
      kind: 'pto',
      badgeIcon: 'calendar-check-solid',
      badgeTitle: 'Engineering time off',
      badgeSubtitle: '3 requests · all under 3 days',
      message: 'No coverage conflicts on any of them. Want to approve them in one go?',
      estimate: '~1 min',
      actionLabel: 'Approve All',
    },
    {
      id: 'offer-signature',
      kind: 'signature',
      badgeIcon: 'file-signature-solid',
      badgeTitle: 'Maya Patel offer letter',
      badgeSubtitle: 'Sr. Product Designer · starts May 19',
      message: "Just needs your signature and we're good to send it back.",
      estimate: '~1 min',
      actionLabel: 'Review & Sign',
    },
    {
      id: 'survey-flag',
      kind: 'survey',
      badgeIcon: 'comment-exclamation-solid',
      badgeTitle: 'Operations exit survey',
      badgeSubtitle: 'Q2 · sentiment dropped sharply',
      message: 'One response in particular stood out to me — worth a careful read before your next 1:1 with that team.',
      estimate: '~3 min',
      actionLabel: 'Open',
    },
  ];

  const remainingItems = items.filter((item) => !completedIds.has(item.id));

  // Show non-skipped items first, then skipped ones rotate back in
  const orderedRemaining = [
    ...remainingItems.filter((item) => !skippedIds.has(item.id)),
    ...remainingItems.filter((item) => skippedIds.has(item.id)),
  ];
  const currentItem = orderedRemaining[0];

  // "Item X of Y" advances when an item is acted on (completed or skipped),
  // so Maybe Later moves the counter forward too.
  const seenCount = completedIds.size + skippedIds.size;
  const currentItemNumber = currentItem
    ? Math.min(seenCount + 1, items.length)
    : items.length;

  const completeItem = (id: string, message: string) => {
    setCompletedIds((prev) => new Set(prev).add(id));
    setSkippedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    onActionComplete?.(message);
  };

  const skipItem = (id: string) => {
    setSkippedIds((prev) => new Set(prev).add(id));
  };

  const handleAction = (item: ChecklistItem) => {
    switch (item.kind) {
      case 'exception':
        if (item.exception) setActiveException(item.exception);
        break;
      case 'recognition':
        setIsRecognitionOpen(true);
        break;
      case 'pto':
        completeItem(item.id, '3 time-off requests approved');
        break;
      case 'signature':
        completeItem(item.id, 'Offer letter signed for Maya Patel');
        break;
      case 'survey':
        completeItem(item.id, 'Survey response opened');
        break;
    }
  };

  const handleExceptionResolve = (exceptionId: string, confirmation: string) => {
    completeItem(`exception-${exceptionId}`, confirmation);
    setActiveException(null);
  };

  const handleMarkResolved = (item: ChecklistItem) => {
    if (!item.exception) return;
    const name = fullName(item.exception.employeeId);
    completeItem(item.id, `Marked ${name}'s record as resolved`);
  };

  const handleTakeDifferentAction = (item: ChecklistItem) => {
    if (!item.exception) return;
    const name = fullName(item.exception.employeeId);
    const issue = item.exception.issue.toLowerCase();
    const days = item.exception.daysOverdue;
    const query = `Help me figure out what to do about ${name}'s ${issue}. It's been ${days} days overdue.`;
    setCompletedIds((prev) => new Set(prev).add(item.id));
    onAskBambooHR?.(query);
  };

  const handleRecognitionSend = (count: number) => {
    completeItem(
      'recognition-cs',
      `Recognition sent to ${count} ${count === 1 ? 'person' : 'people'}`,
    );
    setIsRecognitionOpen(false);
  };

  return (
    <>
      <Gridlet
        header={
          <Gridlet.Header
            title="Quick Looks"
            icon={<IconV2 name="sparkles-solid" color="success-strong" size={16} />}
            right={
              <BodyText size="small" color="neutral-medium">
                {currentItem
                  ? `Item ${currentItemNumber} of ${items.length}`
                  : `${items.length} of ${items.length} done`}
              </BodyText>
            }
          />
        }
      >
        <Gridlet.Body>
          <div className="wya-content">
            <div className="wya-body">
              {currentItem ? (
                <div key={currentItem.id} className="wya-feature">
                  <BadgeV2
                    size="medium"
                    icon={
                      currentItem.badgeAvatar
                        ? (
                            <BadgeV2.Avatar
                              src={currentItem.badgeAvatar.src}
                              alt={currentItem.badgeAvatar.alt}
                            />
                          )
                        : (currentItem.badgeIcon as BadgeIconName)
                    }
                    title={currentItem.badgeTitle}
                    subtitle={currentItem.badgeSubtitle}
                  />

                  <BodyText size="medium" color="neutral-strong">
                    {currentItem.message}
                  </BodyText>

                  <div className="wya-feature-meta">
                    <IconV2 name="clock-regular" size={12} color="neutral-medium" />
                    <BodyText size="extra-small" color="neutral-medium">
                      {currentItem.estimate}
                    </BodyText>
                  </div>
                </div>
              ) : (
                <div className="wya-empty">
                  <IconV2 name="circle-check-solid" size={32} color="success-strong" />
                  <BodyText size="small" color="neutral-strong" weight="semibold">
                    All caught up — nice.
                  </BodyText>
                  <BodyText size="extra-small" color="neutral-weak">
                    I'll keep an eye on things and bring more when something needs you.
                  </BodyText>
                </div>
              )}
            </div>

            {currentItem && (
              <div className="wya-footer">
                <Button
                  size="medium"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleAction(currentItem)}
                >
                  {currentItem.actionLabel}
                </Button>
                {currentItem.kind === 'exception' ? (
                  <>
                    <TextButton
                      size="small"
                      type="muted"
                      onClick={() => handleMarkResolved(currentItem)}
                    >
                      Mark resolved
                    </TextButton>
                    <TextButton
                      size="small"
                      onClick={() => handleTakeDifferentAction(currentItem)}
                    >
                      Take a different action
                    </TextButton>
                  </>
                ) : (
                  <TextButton
                    size="small"
                    type="muted"
                    onClick={() => skipItem(currentItem.id)}
                  >
                    Maybe later
                  </TextButton>
                )}
              </div>
            )}
          </div>
        </Gridlet.Body>
      </Gridlet>

      {activeException && (
        <ExceptionReviewSheet
          exception={activeException}
          isOpen={!!activeException}
          onClose={() => setActiveException(null)}
          onResolve={handleExceptionResolve}
        />
      )}

      <RecognitionQueueModal
        isOpen={isRecognitionOpen}
        onClose={() => setIsRecognitionOpen(false)}
        onSend={handleRecognitionSend}
      />
    </>
  );
}
