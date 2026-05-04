import type { ComponentProps } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gridlet,
  BodyText,
  Button,
  IconV2,
  Pill,
  PillType,
  BadgeV2,
} from '@bamboohr/fabric';
import { overnightSummary } from '../data/automationsData';
import type { AutomationException } from '../data/automationsData';
import { castAvatar, fullName } from '../data/homeCast';
import { recognitionInsight } from '../data/recognitionData';
import { ExceptionReviewSheet } from './ExceptionReviewSheet';
import { RecognitionQueueModal } from './RecognitionQueueModal';
import './OnYourPlateCard.css';

type ItemKind =
  | 'cycle'
  | 'enrollment'
  | 'payroll'
  | 'exception'
  | 'recognition'
  | 'pto'
  | 'signature'
  | 'survey';

type BadgeIconName = ComponentProps<typeof BadgeV2>['icon'];

interface PlateItem {
  id: string;
  kind: ItemKind;
  badgeIcon?: BadgeIconName;
  badgeAvatar?: { src: string; alt: string };
  title: string;
  subtitle: string;
  status: string;
  statusType: PillType;
  actionLabel: string;
  href?: string;
  exception?: AutomationException;
}

interface OnYourPlateCardProps {
  onActionComplete?: (message: string) => void;
}

export function OnYourPlateCard({ onActionComplete }: OnYourPlateCardProps) {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [activeException, setActiveException] = useState<AutomationException | null>(null);
  const [isRecognitionOpen, setIsRecognitionOpen] = useState(false);

  const exceptionItems: PlateItem[] = overnightSummary.exceptions.map((exception) => {
    const name = fullName(exception.employeeId);
    return {
      id: `exception-${exception.id}`,
      kind: 'exception',
      badgeAvatar: { src: castAvatar(exception.employeeId), alt: name },
      title: `${name} · ${exception.issue}`,
      subtitle: 'Reminders opened but no response — drafted a note.',
      status: `${exception.daysOverdue} days overdue`,
      statusType: PillType.Warning,
      actionLabel: 'Send Personal Note',
      exception,
    };
  });

  const items: PlateItem[] = [
    ...exceptionItems,
    {
      id: 'recognition-cs',
      kind: 'recognition',
      badgeIcon: 'sparkles-solid',
      title: `${recognitionInsight.department} recognition`,
      subtitle: '90+ days quiet · drafted notes ready to send.',
      status: `${recognitionInsight.totalEmployees} quiet`,
      statusType: PillType.Info,
      actionLabel: 'Open Queue',
    },
    {
      id: 'pto-approvals',
      kind: 'pto',
      badgeIcon: 'calendar-check-solid',
      title: 'Engineering time off',
      subtitle: 'All under 3 days, no coverage conflicts.',
      status: '3 requests',
      statusType: PillType.Info,
      actionLabel: 'Approve All',
    },
    {
      id: 'offer-signature',
      kind: 'signature',
      badgeIcon: 'file-signature-solid',
      title: 'Maya Patel offer letter',
      subtitle: 'Sr. Product Designer · starts May 19.',
      status: 'Needs signature',
      statusType: PillType.Info,
      actionLabel: 'Review & Sign',
    },
    {
      id: 'survey-flag',
      kind: 'survey',
      badgeIcon: 'comment-exclamation-solid',
      title: 'Operations exit survey',
      subtitle: 'Q2 results · one response stood out.',
      status: 'Sentiment drop',
      statusType: PillType.Warning,
      actionLabel: 'Open Survey',
    },
    {
      id: 'q2-cycle',
      kind: 'cycle',
      badgeIcon: 'clipboard-list-solid',
      title: 'Q2 2026 Performance Review Cycle',
      subtitle: '7 items flagged · ~40 min · Locks May 9',
      status: 'Calibration ready',
      statusType: PillType.Info,
      actionLabel: 'Start Calibration',
      href: '/performance-cycle',
    },
    {
      id: '2026-open-enrollment',
      kind: 'enrollment',
      badgeIcon: 'heart-pulse-solid',
      title: '2026 Open Enrollment',
      subtitle: '23 not started · 4 exceptions · Closes Oct 27',
      status: 'Active · 80%',
      statusType: PillType.Success,
      actionLabel: 'Open Dashboard',
      href: '/open-enrollment',
    },
    {
      id: 'payroll-close-apr',
      kind: 'payroll',
      badgeIcon: 'circle-dollar-solid',
      title: 'Payroll Close · Apr 14 – Apr 25',
      subtitle: '229 auto-approved · 4 exceptions · Deadline Thu 4 PM',
      status: 'Approval ready',
      statusType: PillType.Warning,
      actionLabel: 'Open Approval',
      href: '/payroll-close',
    },
  ];

  const remainingItems = items.filter((item) => !completedIds.has(item.id));

  const completeItem = (id: string, message: string) => {
    setCompletedIds((prev) => new Set(prev).add(id));
    onActionComplete?.(message);
  };

  const handleAction = (item: PlateItem) => {
    switch (item.kind) {
      case 'cycle':
      case 'enrollment':
      case 'payroll':
        if (item.href) navigate(item.href);
        break;
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
            title="On Your Plate"
            icon={<IconV2 name="circle-half-stroke-solid" color="primary-strong" size={16} />}
            right={
              <BodyText size="small" color="neutral-medium">
                {remainingItems.length} of {items.length}
              </BodyText>
            }
          />
        }
      >
        <Gridlet.Body>
          <div className="oyp-content">
            {remainingItems.length > 0 ? (
              <ul className="oyp-list">
                {remainingItems.map((item) => (
                  <li key={item.id} className="oyp-item">
                    <div className="oyp-item-main">
                      <BadgeV2
                        size="medium"
                        icon={
                          item.badgeAvatar
                            ? (
                                <BadgeV2.Avatar
                                  src={item.badgeAvatar.src}
                                  alt={item.badgeAvatar.alt}
                                />
                              )
                            : (item.badgeIcon as BadgeIconName)
                        }
                        title={item.title}
                        subtitle={item.subtitle}
                      />
                      <Pill muted type={item.statusType}>{item.status}</Pill>
                    </div>

                    <div className="oyp-item-action">
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleAction(item)}
                      >
                        {item.actionLabel}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="oyp-empty">
                <IconV2 name="circle-check-solid" size={32} color="success-strong" />
                <BodyText size="small" color="neutral-strong" weight="semibold">
                  All caught up — nice.
                </BodyText>
                <BodyText size="extra-small" color="neutral-weak">
                  I'll bring more when something needs you.
                </BodyText>
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
